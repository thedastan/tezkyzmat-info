import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { getSitemap } from "@/services/web/web.service";
import { absUrl } from "@/lib/web-seo";
import { buildPlan, entityPath, SEGMENT } from "@/lib/sitemap-plan";

// Динамический чанк sitemap `/sitemap/{id}.xml`: XML собирается по запросу и
// кешируется на CDN (s-maxage), БЕЗ статического пре-рендера — иначе у товаров
// файл ~28 МБ и падает лимит Vercel ISR (19 МБ, FALLBACK_BODY_TOO_LARGE).
// Так размер не ограничен, а свежесть даёт CDN-кеш (5 мин).

const STATIC_PATHS = [
	"",
	"/business",
	"/privacy-policy",
	"/public-offer",
	"/refund-policy",
];

const xmlResponse = (body: string) =>
	new NextResponse(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
		{
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
			},
		}
	);

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const idx = Number(id.replace(/\.xml$/, ""));
	const plan = await buildPlan();
	const item = plan[idx];
	if (!item) return new NextResponse("Not Found", { status: 404 });

	if (item.kind === "static") {
		const body = STATIC_PATHS.map(
			(p) => `<url><loc>${absUrl(routing.defaultLocale, p || "/")}</loc></url>`
		).join("");
		return xmlResponse(body);
	}

	const data = await getSitemap({ type: item.kind, page: item.page });
	const rows = data[item.kind] ?? [];
	const seg = SEGMENT[item.kind];
	const body = rows
		.map((e) => {
			const loc = absUrl(
				routing.defaultLocale,
				entityPath(seg, e.slug, e.id, e.seller_slug)
			);
			const lastmod = new Date(e.updated_at).toISOString();
			return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
		})
		.join("");
	return xmlResponse(body);
}
