# Тесты

Принцип: **быстрая петля для мелких правок, тяжёлые проверки — только там, где они ловят реальные риски.** Никаких снапшотов текста, «тестов на копирайт» и тысячи кейсов ради галочки.

## Полосы

| Команда                | Время          | Что проверяет                          | Когда запускать         |
| ---------------------- | -------------- | -------------------------------------- | ----------------------- |
| `npm run lint`         | ~0.02 с        | Biome: формат, импорты, ошибки         | каждый коммит           |
| `npm run check`        | ~2 с           | Astro/TS типы                          | каждый коммит           |
| `npm test`             | ~0.2 с         | zod-схема, payload, контент-инварианты | каждый коммит           |
| `npm run check:assets` | <0.1 с         | манифест + alpha PNG                   | после картинок          |
| `npm run build`        | ~0.5 с         | статическая сборка                     | перед push              |
| `npm run check:html`   | ~0.3 с         | meta, h1, ссылки, id, placeholder      | после build             |
| `npm run verify`       | **~10 с**      | всё выше вместе                        | перед push/PR           |
| `npm run test:e2e`     | ~4 с + браузер | меню, форма, навигация, axe            | behavior/a11y/навигация |
| `npm run check:links`  | сеть           | внешние ссылки                         | перед запуском/вручную  |

`verify` не должен расти до минут. Если новая проверка медленная — отдельная команда/CI-job.

## Что покрыто

### Unit (`tests/unit`)

- `leads.test.ts` — валидация имени, e-mail, телефона, Telegram, consent, лимитов, enum-ошибок.
- `payload.test.ts` — sanitize control-characters/CRLF, подстановка UTM, `_subject`, Formspree/webhook endpoint.
- `content.test.ts` — ≥7 программ, уникальные `order`, обязательные поля, HTTPS-ссылки вузов, ≥8 FAQ, `home`-флаг, отсутствие placeholder-маркеров.

Unit-тесты не рендерят Astro и не требуют браузера.

### HTML (`scripts/check-html.mjs`)

Пост-сборка: один `<h1>`, title/description/canonical, `lang`, дубли `id`, битые внутренние ссылки и ассеты, `<img alt>`, placeholder-текст, наличие sitemap, отсутствие кириллицы в HTML. Работает с base path.

### E2E (`tests/e2e/smoke.spec.ts`)

- лендинг: h1, 6 программ, 6 вузов, 5 FAQ, переход в каталог;
- мобильное меню: открытие, `aria-expanded`, блокировка скролла, закрытие после перехода;
- форма: пустая отправка → ошибки; заполнение → POST на перехваченный `https://lead.test`; payload (`name`, `contact`, `degree`, `consent`, `idempotencyKey`); success-состояние;
- axe: `/` и `/apply/`, только serious/critical, теги WCAG 2.0 A/AA.

E2E собирает сайт с `PUBLIC_LEAD_ENDPOINT=https://lead.test/submit`; реальная сеть не нужна. Сервер — `python3 -m http.server` на порту 4325.

### Внешние ссылки

`check:links` делает HEAD/GET с таймаутом, выводит источник. Не входит в CI: сайты вузов отвечают 403/таймаутами. Запускайте перед релизом.

## Что не тестируем

- точные тексты и вёрстку (визуальные снапшоты хрупки и не ловят смысл);
- цвета/отступы (вместо этого — axe/контраст и ручной просмотр);
- «каждый li отрендерился» (проверяется сборкой и HTML-чеком);
- внешние API вузов/Formspree (не наши контракты).

## Когда e2e обязателен

- меняли `Header`, `site.ts`, mobile menu;
- меняли `LeadForm`, `lead-form.ts`, `schema.ts`, `payload.ts`;
- меняли URL/навигацию/base path;
- меняли доступность/фокус/aria;
- меняли CSP/шрифты/критический CSS, если это влияет на интерактив.

Для правки текста, цвета, отступов или контента e2e не нужен.

## Base path

Отдельно проверяйте Pages-сборку:

```bash
BASE_PATH=/china-education/ SITE_URL=https://ofrys-tech.github.io npm run build
BASE_PATH=/china-education/ npm run check:html
```

Код-ревью: ни одна внутренняя ссылка не должна начинаться с `/` в обход `withBase`.

## CI

- `ci.yml` — `npm ci` + `npm run verify` на PR и push в не-main ветки (~1 мин с установкой).
- `deploy.yml` — на main: проверки, Pages-сборка, деплой, live-smoke.
- `e2e.yml` — manual / weekly / PR с label `e2e`; Playwright + axe; artifact при падении.

## Хуки

- pre-commit: `lint-staged` → Biome на staged-файлах.
- pre-push: `lint && check && test` (~3 с).

Обход: `SKIP_SIMPLE_GIT_HOOKS=1 git push`.

## Добавить тест

- Логика без DOM → `tests/unit/*.test.ts` (Vitest, alias `@`).
- Поведение в браузере → `tests/e2e/smoke.spec.ts`; используйте роль/лейбл, не CSS-класс, где возможно.
- Контент-инвариант → `content.test.ts`.
- Пост-сборка → `scripts/check-html.mjs`.

Тест должен ловить потребительский баг: неверную валидацию, потерянный payload, битую ссылку, недоступное меню, регресс base path. Не тестируйте реализацию ради покрытия.
