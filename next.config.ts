import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			// Один канонический хост: www → без www (SEO: не делить вес между хостами)
			{
				source: "/:path*",
				has: [{ type: "host", value: "www.tezkyzmat.kg" }],
				destination: "https://tezkyzmat.kg/:path*",
				permanent: true,
			},
		];
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
