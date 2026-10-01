import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSitemap } from "@/services/web/web.service";
import { absUrl, languageAlternates } from "@/lib/web-seo";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

const STATIC_PATHS = ["", "/business", "/privacy-policy", "/public-offer", "/refund-policy"];

type Kind = "stores" | "parts" | "dismantle";
const KINDS: Kind[] = ["stores", "parts", "dismantle"];
const SEGMENT: Record<Kind, string> = { stores: "s", parts: "p", dismantle: "d" };

/**
 * План sitemap-файлов: индекс 0 — статические страницы, далее по одному файлу на
 * (тип, страница бэка). page_size бэка = 50 000 — это и есть лимит Google
 * (≤50 000 URL на файл), поэтому одна страница бэка = один sitemap-файл. На
 * сущность — ОДИН <url> с hreflang-альтернативами (ru/en/kg внутри одного <url>),
 * а не три отдельных записи (втрое компактнее). Всё авто: количество файлов
 * берётся из `pages` бэка, новые товары/магазины/авто попадают сами (ISR 5 мин).
 */
type PlanItem = { kind: "static" } | { kind: Kind; page: number };

// Страница заведомо за пределами данных: бэк отвечает ~80 байт с полем `pages`
// (кол-во страниц типа) и пустым списком — так узнаём число файлов, не вытягивая
// 5.7 МБ первой страницы товаров (её Next всё равно не кэширует, >2МБ).
const COUNT_PROBE_PAGE = 1_000_000;

async function buildPlan(): Promise<PlanItem[]> {
	const plan: PlanItem[] = [{ kind: "static" }];
	for (const k of KINDS) {
		const meta = await getSitemap({ type: k, page: COUNT_PROBE_PAGE });
		const pages = meta.pages?.[k] ?? 0;
		for (let p = 1; p <= pages; p++) plan.push({ kind: k, page: p });
	}
	return plan;
}

// Next строит индекс /sitemap.xml и файлы /sitemap/{id}.xml по этому списку.
export async function generateSitemaps(): Promise<Array<{ id: number }>> {
	const plan = await buildPlan();
	return plan.map((_, id) => ({ id }));
}

// Магазин — по точному слагу; товар/авто — {магазин-}{товар}-{id}. seller_slug
// появится, когда бэкенд начнёт слать его в sitemap (иначе {товар}-{id} + 301 со
// страницы на канонический вид).
const entityPath = (
	seg: string,
	slug: string,
	id: number,
	sellerSlug?: string | null
): string => {
	if (seg === "s") return `/s/${slug}`;
	const store = sellerSlug ? `${sellerSlug}-` : "";
	return `/${seg}/${store}${slug}-${id}`;
};

export default async function sitemap({
	id,
}: {
	id: number;
}): Promise<MetadataRoute.Sitemap> {
	const plan = await buildPlan();
	const item = plan[id];
	if (!item) return [];

	if (item.kind === "static") {
		const now = new Date();
		return STATIC_PATHS.map((path) => ({
			url: absUrl(routing.defaultLocale, path || "/"),
			lastModified: now,
			changeFrequency: path === "" ? "daily" : "monthly",
			priority: path === "" ? 1 : 0.6,
			alternates: { languages: languageAlternates(path || "/") },
		}));
	}

	const data = await getSitemap({ type: item.kind, page: item.page });
	const rows = data[item.kind] ?? [];
	const seg = SEGMENT[item.kind];
	return rows.map((e) => {
		const path = entityPath(seg, e.slug, e.id, e.seller_slug);
		return {
			url: absUrl(routing.defaultLocale, path),
			lastModified: new Date(e.updated_at),
			changeFrequency: "weekly",
			priority: 0.7,
			alternates: { languages: languageAlternates(path) },
		};
	});
}
