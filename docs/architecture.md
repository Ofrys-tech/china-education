# Архитектура

## Коротко

Статический сайт ADLAS STUDY на Astro. Нет сервера, базы и UI-фреймворка. Контент валидируется на сборке, интерактивность — небольшие TypeScript-модули (меню/reveal/шапка, поиск по вузам, форма, аналитика). Деплой — GitHub Pages через Actions.

```
Браузер
  ├─ HTML/CSS (Astro build)
  ├─ menu/reveal/float (site.ts)
  ├─ university filters (university-search.ts)
  ├─ inquiry form (lead-form.ts) ──POST──> внешний приёмник (Formspree/webhook)
  └─ optional analytics (Plausible/Umami)
```

## Ключевые решения

| Решение                          | Причина                                                       | Цена                               |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------------- |
| Astro static                     | быстрый первый экран, SEO, zero-JS по умолчанию, GitHub Pages | нет server-side логики             |
| Content Collections + Zod        | контент отделён от шаблонов, ошибки ловятся на build          | нужно соблюдать схему              |
| CSS-токены + brand layer         | редизайн без переписывания страниц                            | дисциплина: не хардкодить значения |
| Tailwind только для reset/утилит | не тащим utility-слой в разметку                              | часть стилей — авторский CSS       |
| Внешний провайдер форм           | GitHub Pages не принимает POST                                | нужен endpoint                     |
| Playwright отдельно от verify    | быстрые правки не ждут браузера                               | e2e может отставать от main        |

## Карта

```text
src/
  config/site.ts            бренд, официальные контакты, навигация, intake
  i18n/en/                  ВСЕ UI-тексты: common, home, destinations, programs,
                            universities, scholarships, accommodation, experience,
                            process, about, contact, apply, privacy, labels, forms
  content.config.ts         Zod-схемы: programs, universities, faq
  content/
    programs/*.json         5 маршрутов: language, foundation, bachelor, master, phd
    universities/*.json     17 вузов с официальными ссылками
    faq/*.json              11 вопросов, home-флаг
  layouts/BaseLayout.astro  <head>, JSON-LD, header/footer, глобальные скрипты
  components/
    BaseHead.astro          canonical, OG, Twitter, favicon
    Header/Footer/Logo      навигация и бренд; Emblem — SVG-монограмма
    PageHero.astro          тёмный hero внутренних страниц
    LeadForm.astro          форма + подключение скрипта
    UniversityCard          карточка каталога с data-атрибутами фильтра
    SuccessCard             анонимизированная карточка зачисления
    ProgramCard/FaqList/SectionHead/CtaBand/Icon/WhatsAppFloat
  pages/                    маршруты (см. README)
  lib/
    url.ts                  withBase / absoluteUrl — критично для Pages
    leads/schema.ts          zod-валидация
    leads/payload.ts         payload + sanitize + endpoint
    analytics.ts             no-op без провайдера
  scripts/
    site.ts                 меню, reveal, скролл шапки, видимость WhatsApp, трекинг
    university-search.ts    поиск/фильтры без перезагрузки
    lead-form.ts            валидация, submit, states, UTM
  styles/
    tokens.css              цвета/типографика/радиусы
    global.css              база и исторические компоненты
    adlas.css               бренд-слой ADLAS поверх базы
  assets/generated/         сгенерированные эмблемы + manifest.json
public/                     favicon, OG, manifest, .nojekyll
tests/unit|e2e
scripts/                    check-html, check-assets, check-links, OG, preview
docs/
```

## Поток сборки

1. `astro build` читает `src/content.config.ts`, валидирует JSON, генерирует типы.
2. `getStaticPaths()` в `src/pages/programs/[id].astro` создаёт страницы из коллекции.
3. `BaseLayout` подключает self-hosted шрифты, `global.css` и `adlas.css`.
4. `@astrojs/sitemap` создаёт `sitemap-index.xml`; `robots.txt` — endpoint с учётом base.
5. GitHub Actions загружает `dist/` как Pages artifact.

## URL и base path

GitHub Pages project site: `https://<owner>.github.io/<repo>/`. Поэтому:

- `SITE_URL=https://<owner>.github.io`
- `BASE_PATH=/<repo>/`
- все внутренние ссылки — `withBase(path)`
- canonical, OG, JSON-LD — `absoluteUrl(path)`

Проверка:

```bash
BASE_PATH=/china-education/ SITE_URL=https://ofrys-tech.github.io npm run build
BASE_PATH=/china-education/ npm run check:html
```

## Тексты и i18n

- Весь пользовательский текст — в `src/i18n/en/**`. `src/i18n/index.ts` реэкспортирует `copy`.
- `labels.ts` — короткие словари значений (degrees, destinations, budgets, contact methods); их импортирует и клиентская форма.
- Контент (программы, вузы, FAQ) — JSON в `src/content/**`.
- `check:html` валидирует отсутствие кириллицы в собранном HTML.
- **Локализация пока не включена.** Для нового языка нужен каталог `src/i18n/<locale>`, locale-роутинг, `dir` для RTL, перевод контента и ревью носителем. Машинный перевод нельзя выдавать за готовую локаль.

## Форма заявок

- Разметка: `LeadForm.astro` (full/compact), progressive enhancement.
- Поля: имя, гражданство, способ связи, контакт, квалификация, программа, направление, страна, бюджет, стипендия, intake, сообщение.
- Валидация: `leadSchema` (zod) на клиенте; honeypot + time trap; consent.
- Payload: плоский JSON с читаемым `summary` и `_subject` для Formspree.
- Транспорт: `PUBLIC_LEAD_ENDPOINT`; Formspree short code разворачивается в URL.
- Без endpoint: mailto с предзаполненным письмом; WhatsApp показывается как прямой fallback.
- UTM хранятся в `sessionStorage`; персональные данные туда не пишутся.
- Статический сайт **не** может гарантировать серверную валидацию/anti-spam — это ответственность провайдера.

Подробно: [leads.md](leads.md).

## Дизайн-система

- `tokens.css` — единственный источник цветов/шрифтов/радиусов.
- `adlas.css` — бренд-слой: золото/чёрный/ivory, крупная типографика, hero, карточки, success-карточки, футер.
- `global.css` — база и исторические компоненты; не удалён, чтобы не ломать служебные страницы.
- `/styleguide/` — живой справочник, noindex.
- Reveal-анимация: `html.js .reveal` + IntersectionObserver + stagger; без JS контент виден.
- Reduced motion уважается.

Подробно: [design.md](design.md).

## Производительность

Бюджет первого экрана: 0 framework-JS, self-hosted шрифты, hero на CSS/SVG. Клиентский JS:

- `site.ts` — меню, reveal, шапка, WhatsApp, трекинг;
- `university-search.ts` — только на `/universities/`;
- `lead-form.ts` — только на страницах с формой;
- `analytics.ts` — no-op без провайдера.

Сгенерированные 2248px PNG импортируются через `astro:assets` и отдаются WebP 4–15 КБ. В `public/` нет 4K-картинок. Внешние CDN не используются.

## Ограничения

- Нет авторизации, личного кабинета, загрузки документов и админ-панели — для этого нужен отдельный backend с БД и ролями.
- Нет server-side рендера и API routes (только статические endpoints вроде robots).
- Нет автоматической проверки фактов о вузах/стоимости — это ручной процесс перед запуском.
- Форма зависит от внешнего провайдера и его CORS/anti-spam политики.
- Английский — единственная опубликованная локаль.

## Расширение

| Задача              | Куда                                                          |
| ------------------- | ------------------------------------------------------------- |
| Новая программа     | JSON в `src/content/programs` (схема сама проверит)           |
| Новый вуз           | JSON в `src/content/universities`                             |
| Новый FAQ           | JSON в `src/content/faq`, `home: true` для главной            |
| Новая страница      | `src/pages/*.astro` + `withBase`                              |
| Новый блок лендинга | компонент + токены, не копипаста                              |
| Новый язык          | `src/i18n/<locale>` + locale-роутинг + RTL + перевод контента |
| Свой backend заявок | заменить endpoint на свой webhook; контракт в leads.md        |
