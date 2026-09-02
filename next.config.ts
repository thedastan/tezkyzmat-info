import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// Канонизация хоста (www ↔ без www) настраивается на стороне Vercel (Domains),
	// чтобы избежать петли редиректов с редиректом домена в дашборде.
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
