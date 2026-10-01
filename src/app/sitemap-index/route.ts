import { NextResponse } from "next/server";
import { SITE_URL } from "@/constants/web.constants";
import { buildPlan } from "@/lib/sitemap-plan";

export const revalidate = 300;

/**
 * Индекс sitemap: перечисляет файлы /sitemap/{id}.xml. Next 16 с generateSitemaps
 * отдаёт сами чанки, но индекс не создаёт, а имя `sitemap.xml` зарезервировано
 * метадата-роутом (конфликт при сборке). Поэтому индекс живёт здесь, а
 * `/sitemap.xml` ведёт сюда через rewrite в next.config.
 */
export async function GET() {
	const plan = await buildPlan();
	const now = new Date().toISOString();
	const entries = plan
		.map(
			(_, id) =>
				`<sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc><lastmod>${now}</lastmod></sitemap>`
		)
		.join("");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`;
	return new NextResponse(xml, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=0, must-revalidate",
		},
	});
}
