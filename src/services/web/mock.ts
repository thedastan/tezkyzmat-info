import type {
	IPaginated,
	IWebPart,
	IWebPartCard,
	IWebSitemap,
	IWebStore,
} from "@/models/types/web.types";
import { slugify } from "@/lib/slug";

/**
 * Мок-данные до появления публичных эндпоинтов.
 * Включаются переменной WEB_API_MOCK=true (см. .env.example).
 */

/** Локальные заглушки из public/mock — работают без сети */
const IMG = (seed: string) => `/mock/${seed}.jpg`;

export const MOCK_STORE: IWebStore = {
	id: 42,
	slug: "avtomir-kudaibergen",
	store_name: "Автомир Кудайберген",
	company_name: "ОсОО «Автомир»",
	description:
		"Запчасти на японские и корейские авто: Toyota, Lexus, Honda, Hyundai, Kia. Б/у и новые, в наличии на Кудайбергене. Работаем с 2015 года.",
	logo: IMG("logo"),
	images: [
		{ id: 1, file: IMG("store-1") },
		{ id: 2, file: IMG("store-2") },
	],
	categories: [
		{ id: 1, name: "Двигатель" },
		{ id: 2, name: "Кузов" },
		{ id: 3, name: "Подвеска" },
		{ id: 4, name: "Оптика" },
	],
	brands: [
		{ id: 1, name: "Toyota" },
		{ id: 2, name: "Lexus" },
		{ id: 3, name: "Honda" },
		{ id: 4, name: "Hyundai" },
	],
	addresses: [
		{
			id: 1,
			street: "Ряд 12, контейнер 47",
			region: "Чуйская область",
			district: null,
			city: "Бишкек",
			market: "Авторынок Кудайберген",
			map_url: "https://go.2gis.com/HfMJe",
		},
	],
	parts_count: 318,
	rating: 4.8,
	reviews_count: 127,
	is_active: true,
	created_at: "2025-03-01T09:00:00Z",
	updated_at: "2026-08-30T12:00:00Z",
};

const partBase = (
	id: number,
	name: string,
	price: number | null,
	extra: Partial<IWebPart> = {}
): IWebPart => ({
	id,
	slug: slugify(name),
	name,
	item_kind: "part",
	price,
	price_hidden: price === null,
	old_price: null,
	currency: "KGS",
	summary:
		"Оригинал, снято с авто без пробега по КР. Проверено, без трещин и подтёков. Гарантия на установку 14 дней.",
	is_active: true,
	category: { id: 1, name: "Двигатель" },
	brand: { id: 1, name: "Toyota" },
	brand_model: { id: 11, name: "Camry 50 (XV50)" },
	year_raw: "2012–2017",
	part_condition: { id: 2, name: "Б/у" },
	manufacturer_country: { id: 1, name: "Япония", flag: null },
	oem: null,
	wheel_diameter: null,
	tyre_season: null,
	wheel_pcd: null,
	images: [
		{ id: id * 10 + 1, file: IMG(`part-${id}-1`) },
		{ id: id * 10 + 2, file: IMG(`part-${id}-2`) },
		{ id: id * 10 + 3, file: IMG(`part-${id}-3`) },
	],
	store: {
		id: MOCK_STORE.id,
		slug: MOCK_STORE.slug,
		store_name: MOCK_STORE.store_name,
		logo: MOCK_STORE.logo,
		city: "Бишкек",
		market: "Кудайберген",
		parts_count: MOCK_STORE.parts_count,
	},
	created_at: "2026-08-20T10:00:00Z",
	updated_at: "2026-08-29T10:00:00Z",
	...extra,
});

export const MOCK_PARTS: IWebPart[] = [
	partBase(1001, "Радиатор охлаждения Toyota Camry 50", 8500, {
		oem: "16400-0V180",
		old_price: 9500,
	}),
	partBase(1002, "Фара левая LED Toyota Camry 55", 24000, {
		category: { id: 4, name: "Оптика" },
		brand_model: { id: 12, name: "Camry 55 (XV55)" },
		year_raw: "2015–2017",
		part_condition: { id: 1, name: "Новая" },
		manufacturer_country: { id: 2, name: "Тайвань", flag: null },
	}),
	partBase(1003, "Двигатель 2AR-FE 2.5 в сборе", null, {
		summary: "Контрактный, пробег 68 000 км по Японии. Есть видео работы.",
		year_raw: "2012–2017",
	}),
	partBase(1004, "Амортизатор передний правый Lexus RX350", 6200, {
		category: { id: 3, name: "Подвеска" },
		brand: { id: 2, name: "Lexus" },
		brand_model: { id: 21, name: "RX 350 (AL10)" },
		year_raw: "2009–2015",
	}),
	partBase(1005, "Шина Bridgestone Turanza 215/55 R17", 5800, {
		item_kind: "tyre",
		category: { id: 5, name: "Шины" },
		brand: null,
		brand_model: null,
		year_raw: null,
		part_condition: { id: 1, name: "Новая" },
		manufacturer_country: { id: 1, name: "Япония", flag: null },
		wheel_diameter: 17,
		tyre_season: "Лето",
		wheel_pcd: null,
		summary: "Комплект 4 шт. Производство 2025 г.",
	}),
	partBase(1006, "Диск литой R18 5x114.3 Toyota", 7000, {
		item_kind: "wheel",
		category: { id: 6, name: "Диски" },
		brand_model: null,
		year_raw: null,
		wheel_diameter: 18,
		wheel_pcd: "5x114.3",
		summary: "Оригинал, без вмятин, 4 шт.",
	}),
	partBase(1007, "Бампер передний Toyota Camry 50 (снят)", 4500, {
		category: { id: 2, name: "Кузов" },
		is_active: false,
	}),
	partBase(1008, "Генератор Honda CR-V RM 2.4", 9800, {
		brand: { id: 3, name: "Honda" },
		brand_model: { id: 31, name: "CR-V (RM)" },
		year_raw: "2012–2016",
	}),
];

export const toCard = (p: IWebPart): IWebPartCard => ({
	id: p.id,
	slug: p.slug,
	name: p.name,
	price: p.price,
	price_hidden: p.price_hidden,
	currency: p.currency,
	image: p.images[0]?.file ?? null,
	part_condition: p.part_condition?.name ?? null,
	brand: p.brand?.name ?? null,
	brand_model: p.brand_model?.name ?? null,
});

export const mockGetPart = (id: number): IWebPart | null =>
	MOCK_PARTS.find((p) => p.id === id) ?? null;

export const mockGetSimilar = (id: number): IWebPartCard[] =>
	MOCK_PARTS.filter((p) => p.id !== id && p.is_active)
		.slice(0, 6)
		.map(toCard);

export const mockGetStore = (slug: string): IWebStore | null =>
	slug === MOCK_STORE.slug ? MOCK_STORE : null;

export const mockGetStoreParts = (
	slug: string,
	page: number,
	limit: number
): IPaginated<IWebPartCard> | null => {
	if (slug !== MOCK_STORE.slug) return null;
	const active = MOCK_PARTS.filter((p) => p.is_active);
	const start = (page - 1) * limit;
	return {
		items: active.slice(start, start + limit).map(toCard),
		page,
		limit,
		total: active.length,
	};
};

export const mockGetSitemap = (): IWebSitemap => ({
	stores: [{ slug: MOCK_STORE.slug, updated_at: MOCK_STORE.updated_at }],
	parts: MOCK_PARTS.filter((p) => p.is_active).map((p) => ({
		slug: `${p.slug}-${p.id}`,
		updated_at: p.updated_at,
	})),
});
