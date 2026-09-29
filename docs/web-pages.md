# Публичные страницы магазина, товара и авто на разбор

Маршруты: `/{locale}/s/{slug}` — магазин, `/{locale}/p/{slug}-{id}` — товар,
`/{locale}/d/{slug}-{id}` — авто на разбор (id в конце обязателен, slug — для
SEO; чужой slug → 301 на канонический).

## Запуск

Данные идут только с бэкенда (моков нет). Нужны живые публичные эндпоинты
`/api/public/v1/web/*` (см. раздел «Бэкенду»).

```bash
npm run dev
# http://localhost:3000/ru/s/{slug}
# http://localhost:3000/ru/p/{slug}-{id}
# http://localhost:3000/ru/d/{slug}-{id}
```

## Что где

| Файл | Зачем |
|---|---|
| `src/services/web/web.service.ts` | fetch к `/api/public/v1/web/*`, ISR 5 мин |
| `src/models/types/web.types.ts` | **контракт для бэкенда** — какие поля ждём |
| `src/app/[locale]/p/[slug]/` | страница товара + `opengraph-image.tsx` (превью для мессенджеров) |
| `src/app/[locale]/s/[slug]/` | страница магазина, пагинация `?page=` |
| `src/app/[locale]/d/[slug]/` | страница авто на разбор + похожие |
| `src/components/web/` | кнопка «Открыть в приложении», галерея, карточки |
| `src/lib/web-seo.ts` | metadata: canonical, hreflang, OG, Smart App Banner |
| `src/lib/slug.ts` | транслит для slug — тот же алгоритм нужен на бэкенде |
| `src/app/sitemap.ts`, `robots.ts` | динамический sitemap (статика + магазины + товары) |
| `src/app/.well-known/` | `apple-app-site-association`, `assetlinks.json` (из env) |
| `next.config.ts` | 301 `www.tezkyzmat.kg` → `tezkyzmat.kg` |

## Бэкенду (Айрас)

Нужны эндпоинты без auth, формат ответа — как в `web.types.ts` (можно в обёртке `{detail: ...}`):

- `GET /api/public/v1/web/parts/{id}/` → `IWebPart` (404 если нет; неактивный — отдавать с `is_active: false`)
- `GET /api/public/v1/web/parts/{id}/similar/` → `IWebPartCard[]`
- `GET /api/public/v1/web/stores/{slug}/` → `IWebStore` (принимать и slug, и числовой id — приложение делится ссылкой по id, пока не отдаёте slug)
- `GET /api/public/v1/web/stores/{slug}/parts/?page=&limit=` → `{items, page, limit, total}`
- `GET /api/public/v1/web/dismantle-cars/{id}/` → `IWebDismantleCar` (без цены; строки `*_title` — готовые)
- `GET /api/public/v1/web/dismantle-cars/{id}/similar/` → `IWebDismantleCarCard[]` (по марке+модели)
- `GET /api/public/v1/web/sitemap/` → `{stores: [{slug, updated_at}], parts: [{slug: "name-slug-123", updated_at}], dismantle: [{slug: "toyota-camry-2001", updated_at}]}`

Без контактов продавца и внутренних счётчиков. `price_hidden: true` → `price: null`. Картинки — абсолютные URL. `Cache-Control: public, max-age=300`, rate limit по IP.

## Приложению (Flutter)

- Кнопка «Поделиться» отдаёт `https://tezkyzmat.kg/{locale}/{p|s|d}/{id}?src=app_share` (только https, без `tezkyzmat://`).
- ⚠️ Локаль: приложение использует `ky` (кыргызский), а веб — `kg`. В ссылке приложение маппит `ky → kg`, иначе `/ky/...` не сматчится.
- iOS: Associated Domains `applinks:tezkyzmat.kg`; Android: intent-filter `autoVerify` на `https://tezkyzmat.kg` пути `/*/p/*`, `/*/s/*`, `/*/d/*`.
- Заполнить в Vercel env: `NEXT_PUBLIC_IOS_APP_ID` (TEAMID.bundleId), `NEXT_PUBLIC_ANDROID_SHA256`.
- Проверить, что `CLIENT_APP` в `src/constants/web.constants.ts` указывает на клиентское приложение (в `constants.ts` ссылки CLIENT/BUSINESS выглядят перепутанными).

## Аналитика

Фронт шлёт события в бэкенд (`sendBeacon`) и дублирует в Yandex Metrika (цели `web_view`, `web_open_app_click`). См. `src/lib/web-analytics.ts`.

**Бэкенду — 6-й эндпоинт** `POST /api/public/v1/web/events/` (без auth, 204, rate limit):

```json
{ "type": "web_view | web_open_app_click", "entity": "part | store", "entity_id": 1001,
  "src": "app_share | null", "ref": "<userId поделившегося> | null",
  "platform": "ios | android | other", "locale": "ru", "path": "/ru/p/…",
  "referrer": "https://… | null", "visitor_id": "<uuid из localStorage>", "ts": "ISO" }
```

Плюс событие из приложения при нажатии «Поделиться»: `POST .../parts/{id}/share/`, `.../stores/{id}/share/`, `.../dismantle-cars/{id}/share/`. ⚠️ Сейчас они на `private` — гость поделиться может, но событие не зафиксируется (401). Сделать share-эндпоинты публичными; авторизованному — привязывать user_id.

Что агрегировать (нужно продавцам в приложении и нам в дашборде):
- по товару и по магазину: `shares_count` (сколько раз делились), `web_views` (уникальные по `visitor_id`), `open_app_clicks`;
- по пользователю: сколько раз делился, сколько просмотров его ссылки принесли (`ref`);
- воронка: share → view → open_app_click → install (по `src=app_share`).

Отдавать продавцу в существующем `GET /private/v1/parts/summary/` и в детали магазина.
