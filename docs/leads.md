# Приём заявок

Сайт статический, поэтому форма отправляет JSON на внешний приёмник. Поддерживаются Formspree и произвольный webhook. Без приёмника форма открывает письмо на официальный email; WhatsApp остаётся прямым каналом.

## Включение

### Вариант A: Formspree

1. Создайте форму на [formspree.io](https://formspree.io) и получите ID вида `mqkr1234` или полный URL.
2. Задайте переменные GitHub Actions:

   ```bash
   PUBLIC_LEAD_PROVIDER=formspree
   PUBLIC_LEAD_ENDPOINT=mqkr1234
   ```

3. Пересоберите сайт (push в `main`).
4. Отправьте тестовую заявку и проверьте письмо.

Короткий код превращается в `https://formspree.io/f/<code>`; полный URL используется как есть.

### Вариант B: свой webhook

```bash
PUBLIC_LEAD_PROVIDER=webhook
PUBLIC_LEAD_ENDPOINT=https://api.example.com/leads
```

Endpoint должен принимать `POST application/json`, отвечать `2xx` и разрешать CORS с домена сайта.

```bash
curl -i -X POST https://api.example.com/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ofrys-tech.github.io' \
  -d '{"_type":"adlas_lead","name":"Test"}'
```

### Вариант C: без приёмника

Если endpoint не задан, форма:

1. открывает `mailto:adlasagency01@gmail.com` с готовым текстом заявки;
2. показывает WhatsApp как прямой fallback;
3. не показывает ложный успех.

Перед публичным запуском подключите endpoint.

## Контракт payload

```json
{
  "_type": "adlas_lead",
  "_subject": "ADLAS inquiry · Anna Lee · Master's degree",
  "name": "Anna Lee",
  "contactMethod": "whatsapp",
  "contact": "+212600000000",
  "nationality": "Moroccan",
  "degree": "master",
  "direction": "business",
  "education": "bachelor",
  "destination": "china",
  "budget": "10000_20000",
  "scholarship": "preferred",
  "intake": "2027",
  "message": "Finance, IELTS 7.0",
  "consent": true,
  "summary": "Anna Lee — WhatsApp: +212600000000\nNationality: Moroccan\n...",
  "page": "https://example.com/apply/",
  "source": "apply",
  "referrer": "",
  "submittedAt": "2026-11-09T12:00:00.000Z",
  "idempotencyKey": "uuid",
  "startedAt": "1762689600000",
  "utm_source": "whatsapp",
  "utm_medium": "",
  "utm_campaign": "autumn",
  "utm_content": "",
  "utm_term": ""
}
```

- `summary` — человекочитаемая версия для письма/чата.
- `_subject` — тема для Formspree; control-characters и переводы строк вырезаны.
- `idempotencyKey` уникален на отправку; можно использовать для дедупликации.
- `startedAt` — timestamp открытия формы (time trap).
- Все строки очищаются от control-characters; `message` сохраняет переводы строк.
- `consent` всегда boolean.
- Компактная форма на главной отправляет `destination=china`, `scholarship=undecided`, `intake=2027`; полная форма содержит все поля.

Схема: `src/lib/leads/schema.ts` (коды ошибок, тексты — в `src/i18n/en/forms.ts`). Payload: `src/lib/leads/payload.ts`.

## Анти-спам

| Механизм           | Что делает                                    | Ограничение                |
| ------------------ | --------------------------------------------- | -------------------------- |
| Honeypot `website` | заполнен → success, но ничего не отправляется | бот может не заполнять     |
| Time trap < 300 ms | слишком быстрая отправка игнорируется         | редкий autofill-кейс       |
| Consent checkbox   | обязательное согласие                         | не защита от спама         |
| Провайдер          | rate limit, капча, модерация                  | настраивается у провайдера |

Серверной валидации на статическом сайте нет. Для собственной базы, загрузки документов и статусов заявок нужен backend (Cloudflare Worker/API, БД, авторизация, приватное хранилище).

## Доступность и UX

- Ошибки полей: `aria-invalid`, `aria-describedby`, понятный текст.
- Общий статус: `aria-live="polite"`, состояния `info/error/success`.
- После успеха фокус переходит на заголовок success-панели.
- Floating WhatsApp скрывается, когда форма видна, чтобы не закрывать поля.
- Черновики персональных данных не сохраняются в localStorage; только UTM в sessionStorage.

## Тесты

```bash
npm test                 # схема, payload, sanitize, контент
npm run test:e2e         # меню, каталог, форма, axe
```

E2E-сборка задаёт `PUBLIC_LEAD_ENDPOINT=https://lead.test/submit`, Playwright перехватывает запрос и проверяет payload. Реальный провайдер в тестах не вызывается.

## Приватность

Политика на `/privacy/` описывает текущий поток. Если добавляете CRM, рассылку, загрузку документов или трекеры — обновите политику и получите согласие. Не логируйте персональные данные в консоль и не отправляйте их в аналитику.
