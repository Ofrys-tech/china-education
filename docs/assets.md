# Генерация изображений

Инструмент: `xd://generate_image` (пул провайдеров A6, OpenAI-совместимый API). Полная схема и возможности — в описании инструмента; здесь — рабочий контракт репозитория.

## Дефолты

| Параметр          | Значение                   |
| ----------------- | -------------------------- |
| model             | `gpt-image-2`              |
| quality           | `high`                     |
| size              | `4096x4096`                |
| format            | `png`                      |
| background        | `transparent` (для иконок) |
| strict_background | `true`                     |
| moderation        | `auto`                     |

4K на пуле строится ~1.5–2 минуты; канал может отдать меньше (некоторые масштабируют до ~1.57 Мп). Инструмент проверяет реальную сторону по байтам, но итог всё равно нужно валидировать манифестом.

## Важно про прозрачность

Прозрачность на **чистой генерации** часто игнорируется пулом: `background=transparent` работает на пути `edits` (когда есть `refs`). Рабочий процесс:

1. **Первый проход** — объект на однотонном фоне (лучше светло-серый/белый или magenta, без теней и текста):

   ```json
   {
     "prompt": "Minimal flat vector icon of a compass, warm ink lines, seal-red accent, centered, isolated on a flat #f2f2f2 background, no text, no shadow, generous margins",
     "model": "gpt-image-2",
     "size": "4096x4096",
     "quality": "high",
     "format": "png",
     "background": "opaque"
   }
   ```
2. **Второй проход** — удаление фона через `refs`:

   ```json
   {
     "prompt": "Remove the background completely. Keep the subject exactly as is, clean edges, transparent background, no shadow, no halo, no text.",
     "refs": ["/absolute/path/to/raw/compass.png"],
     "model": "gpt-image-2",
     "size": "4096x4096",
     "quality": "high",
     "format": "png",
     "background": "transparent",
     "strict_background": true
   }
   ```
3. Проверить фактическую альфу:

   ```bash
   npm run check:assets
   ```

   Проверка падает, если у PNG нет alpha-канала или все пиксели непрозрачны.

Если канал не умеет прозрачность, инструмент переключится на следующий и/или вернёт ошибку. Не «исправляйте» это покраской фона в CSS: для иконок нужна настоящая альфа.

## Куда класть

```text
src/assets/generated/
  icons/compass.png
  illustrations/hero-campus.png
  manifest.json
  previews/            # генерируется, в git не попадает
```

Не кладите 4K PNG в `public/`: они попадут в деплой как есть. Импортируйте из `src/assets` — Astro оптимизирует и отдаст WebP/AVIF по `<Image>`.

## Манифест

Каждая картинка обязательна в `src/assets/generated/manifest.json`:

```json
{
  "version": 1,
  "defaults": {
    "model": "gpt-image-2",
    "quality": "high",
    "size": "4096x4096",
    "format": "png",
    "background": "transparent",
    "strictBackground": true
  },
  "assets": [
    {
      "id": "icon-compass",
      "file": "icons/compass.png",
      "kind": "icon",
      "prompt": "Minimal flat vector compass icon, ink lines, seal-red accent, isolated, no text",
      "model": "gpt-image-2",
      "quality": "high",
      "size": "4096x4096",
      "background": "transparent",
      "alt": "Компас — символ выбора направления",
      "usage": ["home:value-grid", "programs:index"],
      "createdAt": "2026-11-07T12:00:00.000Z",
      "sha256": "optional"
    }
  ]
}
```

`check:assets` проверяет:

- kebab-case `id`, уникальность `id`/`file`;
- допустимые `kind`, `model`, `quality`, `size`, `background`;
- непустые `prompt`, `alt`, `usage`, валидный `createdAt`;
- файл существует, это PNG;
- для `transparent` — есть alpha и есть хотя бы один прозрачный пиксель;
- минимальная ширина: 512 px для icon, 1200 px для остальных;
- предупреждение, если фактический размер меньше половины заявленного;
- `sha256`, если указан;
- предупреждение о PNG в папке, не указанных в манифесте (верхний уровень).

## Превью и визуальный просмотр

```bash
npm run assets:preview   # 1024px WebP в src/assets/generated/previews/
```

Дальше смотрите глазами: откройте preview в браузере/`read` (изображение), проверьте:

- альфа действительно прозрачная (не белая плашка);
- края без ореола и «изгрызенности»;
- объект читается на светлом и тёмном фоне;
- нет случайного текста/логотипов;
- стиль совпадает с соседними иконками (толщина линий, палитра).

Для проверки на разных фонах можно собрать быстрый HTML-стенд, но не коммитьте его как страницу.

## Использование в Astro

```astro
---
import { Image } from "astro:assets";
import compass from "@/assets/generated/icons/compass.png";
---

<Image
  src={compass}
  alt="Компас — символ выбора направления"
  width={96}
  widths={[48, 96, 192]}
  sizes="96px"
  format="webp"
  loading="lazy"
/>
```

Правила:

- `alt` — из манифеста, не «иконка».
- Декоративная картинка — `alt=""` и `aria-hidden`.
- Не ставьте 4K в `background-image` без ресайза.
- Не используйте сгенерированные изображения для логотипов вузов, лиц, официальных документов.

## Промпты

Хорошо работают:

- «flat vector, 1.5px stroke, warm ink #191512, seal red #b23a2e, cream background, no text»;
- изолированный объект по центру, большие поля;
- одинаковая серия: один стиль, один ракурс, одна толщина линий.

Плохо работают:

- длинный русский текст внутри картинки (модель его искажает);
- «photorealistic campus» без референса — риск стокового/нереалистичного вида;
- мелкие детали, которые исчезнут при 96 px;
- логотипы, гербы, реальные люди.

## Стоимость и параллельность

- Один вызов 4K High ~1.5–2 мин и оплачивается как изображение.
- Разные промпты запускайте параллельно отдельными вызовами; один промпт в N вариантах — `n` (1–10) в одном вызове.
- Не генерируйте 20 вариантов «на всякий случай»: сначала утвердите стиль на 1–2 иконках.

## Чек-лист после генерации

```bash
npm run check:assets
npm run assets:preview
npm run verify
```

- [ ] файл в `src/assets/generated/...`
- [ ] запись в manifest с prompt/model/quality/size/background/alt/usage
- [ ] `check:assets` зелёный
- [ ] preview просмотрен глазами
- [ ] компонент использует `<Image>`, не `public/`
- [ ] нет текста/логотипов/лиц, правовых рисков
