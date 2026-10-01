import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// Канонизация хоста (www ↔ без www) настраивается на стороне Vercel (Domains),
	// чтобы избежать петли редиректов с редиректом домена в дашборде.
	//
	// Индекс sitemap: Next 16 при generateSitemaps отдаёт только чанки
	// (/sitemap/{id}.xml), а индекс /sitemap.xml не создаёт (имя занято
	// метадата-роутом). Отдаём индекс из /sitemap-index; beforeFiles — чтобы
	// сработало раньше, чем [locale] перехватит /sitemap.xml и вернёт 404.
	async rewrites() {
		return {
			beforeFiles: [
				{ source: "/sitemap.xml", destination: "/sitemap-index" },
			],
			afterFiles: [],
			fallback: [],
		};
	},
	async headers() {
		return [
			{
				source: "/.well-known/:path*",
				headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
