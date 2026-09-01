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

	return [
		...STATIC_PATHS.flatMap((p) => entry(p, now, "weekly", p === "" ? 1 : 0.6)),
		...data.stores.flatMap((s) => entry(`/s/${s.slug}`, new Date(s.updated_at), "daily", 0.8)),
		...data.parts.flatMap((p) => entry(`/p/${p.slug}`, new Date(p.updated_at), "weekly", 0.7)),
	];
}
