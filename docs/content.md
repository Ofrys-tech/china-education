# Контент

Контент отделён от шаблонов и валидируется Zod на сборке. Ошибка в схеме = упавший build, а не битая страница.

**Весь копирайт сайта — английский.** UI-строки живут в `src/i18n/en/**`; JSON — только контент программ, вузов и FAQ. Не дублируйте UI-текст в JSON и не хардкодьте его в шаблонах.

## Где что лежит

| Коллекция      | Папка                       | Файл = `id`                             | Использование                        |
| -------------- | --------------------------- | --------------------------------------- | ------------------------------------ |
| `programs`     | `src/content/programs/`     | `bachelor.json` → `/programs/bachelor/` | главная (5), каталог (все)           |
| `universities` | `src/content/universities/` | `tsinghua.json`                         | главная (featured), `/universities/` |
| `faq`          | `src/content/faq/`          | `cost.json`                             | главная (`home: true`), `/faq/`      |

Схемы: `src/content.config.ts`.

## Программа

```json
{
  "title": "Bachelor's Degree",
  "degree": "bachelor",
  "summary": "1–2 предложения для карточки и meta description.",
  "duration": "4 years · 8 semesters",
  "languages": ["zh", "en"],
  "tuition": "Indicative: ¥16,000–30,000 / year",
  "overview": ["Абзац 1", "Абзац 2"],
  "fitFor": ["Кому подходит"],
  "outcomes": ["Что получит студент"],
  "timeline": [{ "step": "9–12 months before", "text": "Что делаем" }],
  "faq": [{ "question": "Вопрос?", "answer": "Ответ." }],
  "featured": true,
  "order": 3
}
```

- `degree`: `language | foundation | bachelor | master | phd`.
- `languages`: `zh | en`.
- `order` уникален, определяет сортировку.
- `featured` подсвечивает карточку.
- `tuition` — всегда ориентир с оговоркой, не оферта.
- `summary` попадает в meta description и OG; 120–180 символов.

Новая программа: JSON → `npm test` → `npm run verify`. Страница и ссылки появятся автоматически.

## Вуз

```json
{
  "name": "Zhejiang University",
  "nameZh": "浙江大学",
  "city": "Hangzhou",
  "province": "Zhejiang",
  "type": "public",
  "founded": 1897,
  "strengths": ["Engineering", "Computer science"],
  "levels": ["language", "bachelor", "master", "phd"],
  "language": "English / Chinese",
  "scholarship": true,
  "note": "1–2 предложения о профиле и competition, без рекламы и гарантий.",
  "officialUrl": "https://www.zju.edu.cn/english/",
  "featured": true,
  "order": 5
}
```

- `officialUrl` обязателен, HTTPS, уникален; тест проверяет протокол и уникальность.
- `levels`: `language | foundation | bachelor | master | phd | vocational` — питает фильтры каталога.
- `city`/`province` питают поиск; для муниципалитетов они совпадают.
- `note` не должен звучать как реклама, партнёрство или гарантия зачисления.
- Не добавляйте вуз, если не готовы проверить официальную ссылку и требования.
- Логотипы вузов не используются; монограмма в карточке — инициалы, не официальный знак.

## FAQ

```json
{
  "question": "How much does it cost to study in China?",
  "answer": "Развёрнутый ответ на 2–4 предложения.",
  "category": "money",
  "order": 2,
  "home": true
}
```

`category`: `admission | money | language | life | documents`. Вопрос должен заканчиваться `?`, ответ — быть содержательным (unit-тест проверяет длину).

## Результаты зачислений

Анонимизированные карточки живут в `src/i18n/en/experience.ts` (`results.cards`), а не в публичных документах. Не публикуйте оригиналы с именами, паспортами, номерами заявок, QR-кодами, адресами, датами рождения и подписями. Указывайте только вуз, программу, уровень, язык, период, тип финансирования и подтверждённый результат.

## Отзывы и сообщество

Демонстрационные истории должны быть явно помечены `demoLabel`. Не выдавайте вымышленных студентов за реальных клиентов. Реальные отзывы — только с письменного разрешения и после проверки личности.
