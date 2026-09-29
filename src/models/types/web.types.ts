/**
 * Типы публичных веб-страниц (магазин / товар / авто на разбор).
 * Контракт для новых эндпоинтов бэкенда:
 *   GET /api/public/v1/web/parts/{id}/
 *   GET /api/public/v1/web/parts/{id}/similar/
 *   GET /api/public/v1/web/stores/{slug}/
 *   GET /api/public/v1/web/stores/{slug}/parts/?page=&limit=
 *   GET /api/public/v1/web/dismantle-cars/{id}/
 *   GET /api/public/v1/web/dismantle-cars/{id}/similar/
 * Поля повторяют PartDetailOutSchema / StoreOutSchema / DismantleCarOutSchema
 * из private API, без контактов продавца и внутренних счётчиков.
 */

export interface IClassifier {
	id: number;
	name: string;
}

export interface IImage {
	id: number;
	file: string;
}

export type ItemKind = "part" | "tyre" | "wheel";

export interface IWebStoreShort {
	id: number;
	slug: string;
	store_name: string;
	logo: string | null;
	city: string | null;
	market: string | null;
	parts_count: number;
}

export interface IWebPart {
	id: number;
	slug: string;
	name: string;
	item_kind: ItemKind;
	price: number | null;
	price_hidden: boolean;
	old_price: number | null;
	currency: string;
	summary: string | null;
	is_active: boolean;
	category: IClassifier | null;
	brand: IClassifier | null;
	brand_model: IClassifier | null;
	year_raw: string | null;
	part_condition: IClassifier | null;
	manufacturer_country: (IClassifier & { flag?: string | null }) | null;
	oem: string | null;
	wheel_diameter: number | null;
	tyre_season: string | null;
	wheel_pcd: string | null;
	images: IImage[];
	store: IWebStoreShort;
	created_at: string;
	updated_at: string;
}

export interface IWebPartCard {
	id: number;
	slug: string;
	name: string;
	price: number | null;
	price_hidden: boolean;
	currency: string;
	image: string | null;
	part_condition: string | null;
	brand: string | null;
	brand_model: string | null;
}

export interface IWebAddress {
	id: number;
	street: string | null;
	region: string | null;
	district: string | null;
	city: string | null;
	market: string | null;
	map_url: string | null;
}

export interface IWebStore {
	id: number;
	slug: string;
	store_name: string;
	company_name: string | null;
	description: string | null;
	logo: string | null;
	images: IImage[];
	categories: IClassifier[];
	brands: IClassifier[];
	addresses: IWebAddress[];
	parts_count: number;
	rating: number | null;
	reviews_count: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

/**
 * Авто на разбор (`/dismantle-cars/`). Цены нет — покупатель связывается с
 * продавцом. Строковые поля `*_title` бэкенд отдаёт уже готовыми (пробег
 * «120 000 км», состояние «Среднее», руль «Правый руль») — веб показывает как есть.
 */
export interface IWebDismantleCar {
	id: number;
	slug: string;
	brand: string | null;
	brand_model: string | null;
	year_raw: string | null;
	/** Объём двигателя, литры */
	volume: number | null;
	country: string | null;
	location_title: string | null;
	mileage_title: string | null;
	condition_title: string | null;
	steering_title: string | null;
	status: string | null;
	status_title: string | null;
	arrival_date: string | null;
	description: string | null;
	images: IImage[];
	store: IWebStoreShort | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface IWebDismantleCarCard {
	id: number;
	slug: string;
	brand: string | null;
	brand_model: string | null;
	year_raw: string | null;
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
	slug: string;
	updated_at: string;
}

export interface IWebSitemap {
	stores: ISitemapEntry[];
	parts: ISitemapEntry[];
	/** Авто на разбор — опционально, пока бэкенд их не отдаёт в sitemap */
	dismantle?: ISitemapEntry[];
}
