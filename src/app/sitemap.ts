import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSitemap } from "@/services/web/web.service";
import { absUrl, languageAlternates } from "@/lib/web-seo";
import { buildPlan, entityPath, SEGMENT } from "@/lib/sitemap-plan";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

const STATIC_PATHS = ["", "/business", "/privacy-policy", "/public-offer", "/refund-policy"];

// Next строит файлы /sitemap/{id}.xml по этому списку; индекс /sitemap.xml —
// отдельным route-handler (Next 16 его сам не создаёт). Один <url> на сущность с
// hreflang-альтернативами (ru/en/kg внутри), а не три отдельных записи.
export async function generateSitemaps(): Promise<Array<{ id: number }>> {
	const plan = await buildPlan();
	return plan.map((_, id) => ({ id }));
}

export default async function sitemap({
	id,
}: {
	// Next 16 передаёт id как Promise<string> (имя файла без .xml), а не число.
	id: number | string | Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
	const idx = Number(await id);
	const plan = await buildPlan();
	const item = plan[idx];
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
