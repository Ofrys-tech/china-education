# Changelog

Все заметные изменения проекта. Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), версии — semver.

## [0.1.0] — 2026-11-07

### Added

- Astro 7 + TypeScript strict + Biome + Tailwind 4; статическая сборка для GitHub Pages.
- Дизайн-система на CSS-токенах (paper/ink/seal-red/jade), Prata + Golos Text, self-hosted.
- Лендинг: hero с досье, marquee, «почему Китай», 6 направлений, 6 вузов, 5 шагов, стипендии, услуги, FAQ, форма, CTA.
- Внутренние страницы: каталог и 7 детальных программ, вузы, процесс с документами/календарём, FAQ по категориям, заявка, о практике, политика, 404, styleguide.
- Контент-коллекции Zod: programs, universities, faq.
- Форма заявки: валидация, honeypot, time trap, consent, UTM, Formspree/webhook адаптер, mailto/Telegram fallback, success/error states, a11y.
- SEO: canonical, OG/Twitter, JSON-LD (Organization, WebSite, Course, FAQPage, HowTo, AboutPage/ContactPage), sitemap, robots с base path.
- Скрипты: OG-генератор, HTML-проверки, проверка внешних ссылок, манифест/альфа 4K-ассетов, WebP-превью.
- Тесты: 18 unit (Vitest), 4 e2e (Playwright + axe), HTML-проверки.
- CI/CD: быстрый verify, деплой Pages с live-smoke, отдельный e2e по расписанию/метке, dependabot.
- Документация: архитектура, деплой, заявки, контент, дизайн, изображения, тесты, AGENTS.md.
- Хуки: pre-commit (Biome), pre-push (lint + типы + unit).

### Changed

- Пользовательские тексты переведены на английский и вынесены в типизированный i18n-каталог `src/i18n/en/**`; страницы больше не содержат хардкода копирайта.
- Валидация формы возвращает коды ошибок; тексты ошибок берутся из `src/i18n/en/forms.ts`.
- `check:html` запрещает кириллицу в собранном HTML (защита английского макета).
- Деплой читает lead/contact/analytics значения из GitHub repository variables; форма включается без правок кода.

### Notes

- Дизайн — рабочая накидка для обсуждения; токены и компоненты готовы к редизайну.
- Приём заявок требует `PUBLIC_LEAD_ENDPOINT`; без него форма не отправляет данные.
- Стоимость/дедлайны/требования — ориентиры, требуют проверки перед публичным запуском.
- Публичные контакты скрыты до заполнения реальных данных.
