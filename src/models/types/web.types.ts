/**
 * Типы публичных веб-страниц (магазин / товар / авто на разбор).
 * Источник истины — бэкенд (Айрас). Эндпоинты:
 *   GET /api/public/v1/web/parts/{id}/                   → IWebPart
 *   GET /api/public/v1/web/parts/{id}/similar/           → IWebPartCard[]
 *   GET /api/public/v1/web/stores/{slug}/                → IWebStore  (принимает и id)
 *   GET /api/public/v1/web/stores/{slug}/parts/?page=&limit= → IPaginated<IWebPartCard>
 *   GET /api/public/v1/web/dismantle-cars/{id}/          → IWebDismantleCar
 *   GET /api/public/v1/web/dismantle-cars/{id}/similar/  → IWebDismantleCarCard[]
 * Все ответы обёрнуты в {"detail": …}. Телефонов/whatsapp нет нигде.
 * Из чисел — только shares_count. price_hidden:true ⇒ price:null.
 */

export interface IImage {
	id: number;
	file: string;
}

// Виды товара из ItemKindChoices бэкенда (все шесть).
export type ItemKind =
	| "part" // запчасть
	| "disc" // диск
	| "tyre" // шина
	| "wheel" // колесо в сборе
	| "accessory" // аксессуар
	| "oil_chemistry"; // масла и химия

/** Характеристика товара (произвольная пара) — бэкенд отдаёт готовые подписи. */
export interface ISpec {
	label: string;
	value: string;
}

/** Продавец внутри товара/авто — без контактов. */
export interface IWebSellerShort {
	id: number;
	slug: string;
	name: string;
	logo: string | null;
	city: string | null;
	market: string | null;
}

export interface IWebPart {
	id: number;
	slug: string;
	name: string;
	price: number | null;
	price_hidden: boolean;
	currency: string;
	image: string | null;
	brand: string | null;
	brand_model: string | null;
	year: string | null;
	condition: string | null;
	is_active: boolean;
	summary: string | null;
	description: string | null;
	item_kind: ItemKind;
	images: IImage[];
	specs: ISpec[] | null;
	oem_number: string | null;
	manufacturer: string | null;
	body_code: string | null;
	engine_code: string | null;
	axis: string | null;
	side: string | null;
	color: string | null;
	year_from: number | null;
	year_to: number | null;
	wheel_diameter: number | null;
	wheel_pcd: string | null;
	tyre_season: string | null;
	updated_at: string;
	seller: IWebSellerShort;
	shares_count: number;
}

/** Карточка товара (similar + список магазина) — первые 11 полей IWebPart. */
export interface IWebPartCard {
	id: number;
	slug: string;
	name: string;
	price: number | null;
	price_hidden: boolean;
	currency: string;
	image: string | null;
	brand: string | null;
	brand_model: string | null;
	year: string | null;
	condition: string | null;
}

export interface IWebAddress {
	region: string | null;
	district: string | null;
	city: string | null;
	market: string | null;
	street: string | null;
	url_2gis: string | null;
}

export interface IWebStore {
	id: number;
	slug: string;
	name: string;
	logo: string | null;
	city: string | null;
	market: string | null;
	parts_count: number;
	description: string | null;
	instagram_url: string | null;
	tiktok_url: string | null;
	website: string | null;
	addresses: IWebAddress[];
	brands: string[];
	categories: string[];
	work_days_of_week: number[];
	work_time_from: string | null;
	work_time_to: string | null;
	images: IImage[];
	shares_count: number;
	updated_at: string;
	/** Снятый магазин может прийти с is_active:false; отсутствие поля = активен. */
	is_active?: boolean;
}

/**
 * Авто на разбор. Цены нет. Строки `*_title` приходят готовыми
 * («В пути», «Идеальное», «Правый руль», «В Бишкеке», «180 000 км»).
 */
export interface IWebDismantleCar {
	id: number;
	slug: string;
	brand: string | null;
	brand_model: string | null;
	year: string | null;
	image: string | null;
	origin: string | null;
	origin_title: string | null;
	status: string | null;
	status_title: string | null;
	car_type: string | null;
	is_active: boolean;
	volume: number | null;
	mileage: number | null;
	mileage_title: string | null;
	condition: string | null;
	condition_title: string | null;
	steering: string | null;
	steering_title: string | null;
	location_title: string | null;
	manufacturer_country: string | null;
	arrival_date: string | null;
	description: string | null;
	images: IImage[];
	seller: IWebSellerShort;
	shares_count: number;
	created_at: string;
	updated_at: string;
}

/** Карточка авто (similar) — подмножество IWebDismantleCar. */
export interface IWebDismantleCarCard {
	id: number;
	slug: string;
	brand: string | null;
	brand_model: string | null;
	year: string | null;
	image: string | null;
	status_title: string | null;
}

export interface IPaginated<T> {
	items: T[];
	page: number;
	limit: number;
	total: number;
}

export interface ISitemapEntry {
	id: number;
	slug: string;
	updated_at: string;
	/**
	 * Слаг магазина-владельца (для канонического URL `{магазин}-{товар}-{id}`).
	 * Пока бэкенд не отдаёт — sitemap строит `{товар}-{id}`, а страница 301-редиректит
	 * на канонический вид. Как только поле появится — sitemap сразу отдаёт финальный URL.
	 */
	seller_slug?: string | null;
}

/**
 * Данные sitemap: `GET /web/sitemap/?type=stores|parts|dismantle&page=1`
 * (без type — все три). Страница 50 000 записей; `pages` — сколько частей.
 * XML собирает Next (бэкенд не знает домена и шаблонов ссылок).
 */
export interface IWebSitemap {
	stores: ISitemapEntry[];
	parts: ISitemapEntry[];
	dismantle: ISitemapEntry[];
	pages: { stores: number; parts: number; dismantle: number };
	page: number;
	page_size: number;
}
