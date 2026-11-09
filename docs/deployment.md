# Деплой на GitHub Pages

## Как устроено

`.github/workflows/deploy.yml` запускается на push в `main` и вручную. Он:

1. ставит Node 22 и зависимости (`npm ci`);
2. запускает lint, `astro check`, unit-тесты, проверку ассетов;
3. собирает сайт с `BASE_PATH=/<repo>/` и `SITE_URL=https://<owner>.github.io`;
4. проверяет HTML (`check:html`);
5. загружает `dist/` как Pages artifact;
6. деплоит через `actions/deploy-pages`;
7. делает live-smoke: `curl` страницы и поиск `ADLAS`.

`BASE_PATH` вычисляется из имени репозитория. Для репозитория `<owner>.github.io` автоматически используется `/`.

## Первый деплой

```bash
# 1. Создать публичный репозиторий и запушить main
gh repo create china-education --public --source=. --remote=origin --push

# 2. Включить Pages через Actions
gh api --method POST repos/<owner>/china-education/pages \
  -f build_type=workflow

# 3. Проверить workflow
gh run list --workflow=deploy.yml
```

Если Pages уже включён, `POST` вернёт 409 — используйте:

```bash
gh api --method PUT repos/<owner>/china-education/pages -f build_type=workflow
```

В Settings → Pages должен быть выбран **Source: GitHub Actions**. Домен по умолчанию:
`https://<owner>.github.io/<repo>/`.

## Переменные окружения

Публичные переменные встраиваются в HTML/JS **на этапе сборки**. Меняете значение → нужен новый деплой.

| Переменная                | Где                                    | Значение                                        |
| ------------------------- | -------------------------------------- | ----------------------------------------------- |
| `SITE_URL`                | workflow env                           | `https://<owner>.github.io`                     |
| `BASE_PATH`               | workflow env                           | `/<repo>/` или `/` для user site                |
| `PUBLIC_LEAD_ENDPOINT`    | workflow env / GitHub Secrets не нужны | Formspree short code или URL webhook            |
| `PUBLIC_LEAD_PROVIDER`    | там же                                 | `formspree` или `webhook`                       |
| `PUBLIC_ANALYTICS_SRC`    | там же                                 | URL скрипта Plausible/Umami (пусто = выключено) |
| `PUBLIC_ANALYTICS_DOMAIN` | там же                                 | domain для аналитики                            |

`deploy.yml` читает эти значения из **repository variables** (Settings → Secrets and variables → Actions → Variables), поэтому код править не нужно:

```bash
gh variable set PUBLIC_LEAD_PROVIDER --body formspree --repo Ofrys-tech/china-education
gh variable set PUBLIC_LEAD_ENDPOINT --body mqkr1234 --repo Ofrys-tech/china-education
# опционально:
```

После изменения переменных: **Actions → Deploy to GitHub Pages → Re-run all jobs** (public env встраивается на сборке).

Секреты сюда не нужны: endpoint по определению публичный. Приватные токены в статический сайт не попадают.

## Кастомный домен

1. Купите домен и добавьте DNS:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - или `CNAME` на `<owner>.github.io` для `www`.
2. В Settings → Pages → Custom domain укажите домен, включите HTTPS.
3. Добавьте `public/CNAME` с доменом (одна строка).
4. Обновите env в `deploy.yml`:

   ```yaml
   SITE_URL: https://your-domain.com
   BASE_PATH: /
   ```
5. Пересоберите и проверьте canonical/OG (`view-source`).

## Rollback

- Быстро: `git revert <sha>` и push в `main` — workflow пересоберёт сайт.
- Через Actions: перезапустить предыдущий успешный `deploy.yml` (Re-run all jobs) — artifact пересоберётся из того же коммита.

## Траблшутинг

| Симптом                | Причина                                    | Фикс                                                              |
| ---------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| 404 на всех страницах  | неверный `BASE_PATH`                       | проверить env workflow; `check:html`                              |
| CSS/JS 404, голый HTML | ассеты запрошены от `/`, а сайт в `/repo/` | все ссылки через `withBase`                                       |
| canonical без `/repo/` | `SITE_URL` содержит base                   | `SITE_URL` — только origin                                        |
| Форма не отправляет    | нет `PUBLIC_LEAD_ENDPOINT`                 | [leads.md](leads.md)                                              |
| CORS error в форме     | провайдер не разрешает origin              | настроить домен у провайдера                                      |
| Страница не обновилась | CDN/кэш                                    | hard reload; проверить новый run                                  |
| Live-smoke упал        | Pages ещё не прогрелся                     | workflow ретраит 12×5 сек; посмотреть логи                        |
| `deploy-pages` 403     | нет прав                                   | Settings → Actions → General → Workflow permissions; Pages source |
| Не работает 404        | Pages отдаёт свой                          | `404.html` в корне artifact; проверить `dist/404.html`            |

## Локальная проверка Pages-сборки

```bash
BASE_PATH=/china-education/ SITE_URL=https://ofrys-tech.github.io npm run build
BASE_PATH=/china-education/ npm run check:html
# Раздать dist под префиксом:
mkdir -p /tmp/pages && ln -sfn "$PWD/dist" /tmp/pages/china-education
python3 -m http.server 8080 --directory /tmp/pages
# http://127.0.0.1:8080/china-education/
```

Или `BASE_PATH=/china-education/ npm run preview -- --port 4323` (Astro preview учитывает base).
