# Приём заявок

Сайт статический, поэтому форма отправляет JSON на внешний приёмник. По умолчанию поддерживаются Formspree и произвольный webhook.

## Включение

### Вариант A: Formspree (быстрее всего)

1. Создайте форму на [formspree.io](https://formspree.io) и получите ID вида `mqkr1234` (или полный URL `https://formspree.io/f/mqkr1234`).
2. Задайте окружение при сборке:

   ```bash
   PUBLIC_LEAD_PROVIDER=formspree
   PUBLIC_LEAD_ENDPOINT=mqkr1234
   ```
3. Пересоберите сайт (`npm run build` / push в `main`).
4. Отправьте тестовую заявку и проверьте письмо.

Короткий код автоматически превращается в `https://formspree.io/f/<code>`; полный URL используется как есть.

### Вариант B: свой webhook

```bash
PUBLIC_LEAD_PROVIDER=webhook
PUBLIC_LEAD_ENDPOINT=https://api.example.com/leads
```

Endpoint должен принимать `POST application/json`, отвечать `2xx` и разрешать CORS с домена сайта. Проверка:

```bash
curl -i -X POST https://api.example.com/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ofrys-tech.github.io' \
  -d '{"_type":"chinapath_lead","name":"Test"}'
```

CORS обязателен: браузер отправляет JSON-запрос с `Content-Type: application/json`, это не simple request.

### Вариант C: без приёмника

Если endpoint не задан, форма:

1. при наличии `PUBLIC_CONTACT_EMAIL` открывает `mailto:` с готовым текстом;
2. иначе при наличии `PUBLIC_TELEGRAM_URL` показывает прямую ссылку;
3. иначе показывает служебное сообщение о неподключённом приёмнике.

Это осознанное поведение, а не «тихий успех». Перед публичным запуском подключите endpoint.

## Контракт payload

```json
{
  "_type": "chinapath_lead",
  "_subject": "ChinaPath application · Anna Lee · Master's",
  "name": "Anna Lee",
  "contactMethod": "telegram",
  "contact": "@anna_lee",
  "degree": "master",
  "direction": "business",
  "intake": "2027",
  "message": "Finance, IELTS 7.0",
  "consent": true,
  "summary": "Anna Lee — Telegram: @anna_lee\nProgram: Master's\n...",
  "page": "https://example.com/apply/",
  "source": "apply",
  "referrer": "https://t.me/...",
  "submittedAt": "2026-11-07T12:00:00.000Z",
  "idempotencyKey": "uuid",
  "startedAt": "1730980800000",
  "utm_source": "telegram",
  "utm_medium": "",
  "utm_campaign": "autumn",
  "utm_content": "",
  "utm_term": ""
}
```

- `summary` — человекочитаемая версия для письма/чата.
- `_subject` — тема для Formspree; управляющие символы/переводы строк вырезаны.
- `idempotencyKey` уникален на отправку; можно использовать для дедупликации на своей стороне.
- `startedAt` — timestamp открытия формы (time trap).
- Все строки очищаются от control-characters; `message` сохраняет переводы строк.
- `consent` всегда boolean.

Схема: `src/lib/leads/schema.ts` (валидация возвращает коды ошибок, тексты — в `src/i18n/en/forms.ts`). Payload: `src/lib/leads/payload.ts`.

## Анти-спам

| Механизм           | Что делает                                                   | Ограничение                          |
| ------------------ | ------------------------------------------------------------ | ------------------------------------ |
| Honeypot `website` | заполнен → форма показывает success, но ничего не отправляет | бот может не заполнять               |
| Time trap < 300 ms | слишком быстрая отправка игнорируется                        | редкий autofill-кейс                 |
| Consent checkbox   | обязательное согласие                                        | не защита от спама                   |
| Провайдер          | rate limit, капча, модерация                                 | настраивается у Formspree/своего API |

Серверной валидации на статическом сайте нет. Если нужна настоящая защита и своя база — поднимайте Cloudflare Worker/API и меняйте endpoint; контракт payload уже плоский и готов к этому.

## Доступность и UX

- Ошибки полей: `aria-invalid`, `aria-describedby`, текст по-русски.
- Общий статус: `aria-live="polite"`, состояния `info/error/success`.
- После успеха фокус переходит на заголовок success-панели.
- Форма работает без JS только частично: `method="post" action=<endpoint>` при заданном endpoint; без endpoint JS обязателен.
- Черновики персональных данных не сохраняются в localStorage; только UTM в sessionStorage.

## Тесты

```bash
npm test                 # схема, payload, sanitize
npm run test:e2e         # валидация + успешная отправка на замоканный https://lead.test
```

E2E-сборка задаёт `PUBLIC_LEAD_ENDPOINT=https://lead.test/submit`, Playwright перехватывает запрос и проверяет payload. Реальный провайдер в тестах не вызывается.

## Приватность

Политика на `/privacy/` описывает текущий поток. Если добавляете CRM, рассылку или трекеры — обновите политику и получите согласие. Не логируйте персональные данные в консоль и не отправляйте их в аналитику.
