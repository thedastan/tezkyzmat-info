import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/constants/web.constants";
import { getSitemap } from "@/services/web/web.service";
import { languageAlternates } from "@/lib/web-seo";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

const STATIC_PATHS = ["", "/business", "/privacy-policy", "/public-offer", "/refund-policy"];

const entry = (
	path: string,
	lastModified: Date,
	changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
	priority: number
): MetadataRoute.Sitemap =>
	routing.locales.map((locale) => ({
		url: `${SITE_URL}/${locale}${path}`,
		lastModified,
		changeFrequency,
		priority,
		alternates: { languages: languageAlternates(path || "/") },
	}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();
	const data = await getSitemap();

	// URL строит Next: у товара/авто ключ — id, slug для SEO. Каноничный вид —
	// `{магазин}-{товар}-{id}` (seller_slug, если бэкенд его отдаёт; иначе
	// `{товар}-{id}` + 301 со страницы). У магазина — slug. Первая страница
	// каждого типа; полный охват (>50k) — через sitemap index, отдельная задача.
	const store = (sellerSlug?: string | null) => (sellerSlug ? `${sellerSlug}-` : "");
	return [
		...STATIC_PATHS.flatMap((p) => entry(p, now, "weekly", p === "" ? 1 : 0.6)),
		...data.stores.flatMap((s) => entry(`/s/${s.slug}`, new Date(s.updated_at), "daily", 0.8)),
		...data.parts.flatMap((p) =>
			entry(`/p/${store(p.seller_slug)}${p.slug}-${p.id}`, new Date(p.updated_at), "weekly", 0.7)
		),
		...data.dismantle.flatMap((c) =>
			entry(`/d/${store(c.seller_slug)}${c.slug}-${c.id}`, new Date(c.updated_at), "weekly", 0.7)
		),
	];
}
