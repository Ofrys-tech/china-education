# Архитектура

## Коротко

Статический сайт на Astro. Нет сервера, базы и UI-фреймворка. Контент валидируется на сборке, интерактивность — три маленьких TypeScript-модуля (меню/reveal, форма, аналитика). Деплой — GitHub Pages через Actions.

```
Браузер
  ├─ HTML/CSS (Astro build)
  ├─ menu/reveal (site.ts)
  ├─ lead form (lead-form.ts) ──POST──> внешний приёмник (Formspree/webhook)
  └─ optional analytics (Plausible/Umami)
```

## Почему так

| Решение                          | Причина                                                       | Цена                               |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------------- |
| Astro static                     | быстрый первый экран, SEO, zero-JS по умолчанию, GitHub Pages | нет server-side логики             |
| Content Collections + Zod        | контент отделён от шаблонов, ошибки ловятся на build          | нужно соблюдать схему              |
| CSS-токены + компонентные классы | редизайн без переписывания страниц                            | дисциплина: не хардкодить значения |
| Tailwind только для reset/утилит | не тащим огромный utility-слой в разметку                     | часть стилей — авторский CSS       |
| Провайдер форм                   | GitHub Pages не принимает POST                                | нужен внешний endpoint             |
| Playwright отдельно от verify    | быстрые правки не ждут браузера                               | e2e может отставать от main        |

## Карта

```text
src/
  config/site.ts            brand / nav / contacts / intake / legal / analytics
  content.config.ts         Zod-схемы: programs, universities, faq
  content/
    programs/*.json         7 маршрутов
    universities/*.json     7 примеров вузов
    faq/*.json              8 вопросов, home-флаг
  layouts/BaseLayout.astro  <head>, JSON-LD, header/footer, глобальные скрипты
  components/
    BaseHead.astro          canonical, OG, Twitter, favicon
    Header/Footer/Logo      навигация и бренд
    LeadForm.astro          разметка формы + подключение скрипта
    ProgramCard/UniversityRow/FaqList/SectionHead/CtaBand/Icon
  pages/                    маршруты (см. README)
  lib/
    url.ts                  withBase / absoluteUrl — критично для Pages
    leads/schema.ts          zod-валидация
    leads/payload.ts         payload + sanitize + endpoint
    content.ts               словари лейблов
    analytics.ts             no-op без провайдера
  scripts/
    site.ts                 mobile menu, IntersectionObserver, CTA events
    lead-form.ts            валидация, submit, states, UTM
  styles/
    tokens.css              цвета/типографика/тени/радиусы
    global.css              база и компоненты
  assets/generated/         PNG + manifest.json (4K)
public/                     favicon, OG, manifest, .nojekyll
tests/unit|e2e
scripts/                    check-html, check-assets, check-links, OG, preview
docs/
```

## Поток сборки

1. `astro build` читает `src/content.config.ts`, валидирует JSON, генерирует типы.
2. `getStaticPaths()` в `src/pages/programs/[id].astro` создаёт страницы из коллекции.
3. `BaseLayout` подключает self-hosted шрифты и `global.css`; Tailwind собирает утилиты.
4. `@astrojs/sitemap` создаёт `sitemap-index.xml`; `robots.txt` — endpoint с учётом base.
5. GitHub Actions загружает `dist/` как Pages artifact.

## URL и base path

GitHub Pages project site: `https://<owner>.github.io/<repo>/`. Поэтому:

- `SITE_URL=https://<owner>.github.io`
- `BASE_PATH=/<repo>/`
- все внутренние ссылки — `withBase(path)`
- canonical, OG, JSON-LD — `absoluteUrl(path)`
- `absoluteUrl` идемпотентен: если `Astro.url.pathname` уже содержит base, второй раз не добавляет.

Проверка:

```bash
BASE_PATH=/china-education/ SITE_URL=https://ofrys-tech.github.io npm run build
BASE_PATH=/china-education/ npm run check:html
```

`check:html` резолвит ссылки с учётом base и падает на битых.

## Форма заявок

- Разметка: `LeadForm.astro` (full/compact), с progressive enhancement.
- Валидация: `leadSchema` (zod) на клиенте; honeypot + time trap; consent.
- Payload: плоский JSON с читаемым `summary` и `_subject` для Formspree.
- Транспорт: `PUBLIC_LEAD_ENDPOINT`; Formspree short code разворачивается в URL.
- Без endpoint: mailto (если есть email), Telegram (если есть), иначе служебное сообщение.
- UTM хранятся в `sessionStorage`; персональные данные туда не пишутся.
- Статический сайт **не** может гарантировать серверную валидацию/anti-spam — это ответственность провайдера.

Подробно: [leads.md](leads.md).

## Дизайн-система

- `tokens.css` — единственный источник цветов/шрифтов/радиусов.
- `global.css` — база, layout, компоненты (btn, card, form, faq, footer…).
- Страницы собирают секции из компонентов; разметка не содержит сырых hex.
- `/styleguide/` — живой справочник, noindex.
- Тёмные секции: `--color-red-light` для акцентов, `rgba(cream,.62+)` для мелкого текста (контраст).
- Reveal-анимация: `html.js .reveal` + IntersectionObserver; без JS контент виден.

Подробно: [design.md](design.md).

## Производительность

Бюджет первого экрана: **0 framework-JS**, CSS+self-hosted шрифты, никаких изображений выше первого экрана (hero на CSS/SVG). Клиентский JS:

- `site.ts` — меню, reveal, делегированный трекинг;
- `lead-form.ts` — только на `/` и `/apply/`;
- `analytics.ts` — no-op, если провайдер не задан.

4K-изображения не кладутся в `public/`; импортируются из `src/assets` и оптимизируются Astro. Внешние CDN не используются.

Если добавляете зависимость, проверьте:

1. она не попадает в клиентский бандл без нужды;
2. вес gzip и влияние на LCP;
3. можно ли обойтись 20 строками своего кода.

## Расширение

| Задача              | Куда                                                                |
| ------------------- | ------------------------------------------------------------------- |
| Новая программа     | JSON в `src/content/programs` (схема сама проверит)                 |
| Новый вуз           | JSON в `src/content/universities`                                   |
| Новый FAQ           | JSON в `src/content/faq`, `home: true` для главной                  |
| Новая страница      | `src/pages/*.astro` + `withBase`                                    |
| Новый блок лендинга | компонент + токены, не копипаста                                    |
| Второй язык         | добавить `src/i18n/` и поля в контент; сейчас сознательно один язык |
| Блог/кейсы          | новая content collection + markdown loader                          |
| Свой backend заявок | заменить endpoint на свой webhook; контракт в leads.md              |

## Ограничения

- Нет авторизации, личного кабинета и статусов заявок.
- Нет server-side рендера и API routes (только статические endpoints вроде robots).
- Нет автоматической проверки фактов о вузах/стоимости — это ручной процесс перед запуском.
- Форма зависит от внешнего провайдера и его CORS/anti-spam политики.
