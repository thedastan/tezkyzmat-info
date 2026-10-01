import "server-only";
import { getSitemap } from "@/services/web/web.service";

/**
 * Общий план sitemap-файлов для индекса (/sitemap.xml) и чанков
 * (/sitemap/{id}.xml). Индекс 0 — статика, далее по одному файлу на (тип,
 * страницу бэка). page_size бэка = 50 000 = лимит Google (≤50k URL/файл).
 */
export type Kind = "stores" | "parts" | "dismantle";
export const KINDS: Kind[] = ["stores", "parts", "dismantle"];
export const SEGMENT: Record<Kind, string> = {
	stores: "s",
	parts: "p",
	dismantle: "d",
};

export type PlanItem = { kind: "static" } | { kind: Kind; page: number };

// Страница заведомо за пределами данных: бэк отвечает ~80 байт с полем `pages`
// (кол-во страниц типа) и пустым списком — так узнаём число файлов, не вытягивая
// 5.7 МБ первой страницы товаров (её Next всё равно не кэширует, >2МБ).
const COUNT_PROBE_PAGE = 1_000_000;

export async function buildPlan(): Promise<PlanItem[]> {
	const plan: PlanItem[] = [{ kind: "static" }];
	for (const k of KINDS) {
		const meta = await getSitemap({ type: k, page: COUNT_PROBE_PAGE });
		const pages = meta.pages?.[k] ?? 0;
		for (let p = 1; p <= pages; p++) plan.push({ kind: k, page: p });
	}
	return plan;
}

// Магазин — по точному слагу; товар/авто — {магазин-}{товар}-{id}. seller_slug
// появится, когда бэкенд начнёт слать его в sitemap (иначе {товар}-{id} + 301).
export const entityPath = (
	seg: string,
	slug: string,
	id: number,
	sellerSlug?: string | null
): string => {
	if (seg === "s") return `/s/${slug}`;
	const store = sellerSlug ? `${sellerSlug}-` : "";
	return `/${seg}/${store}${slug}-${id}`;
};
