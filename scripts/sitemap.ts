import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const links = [
		{ url: "/", changefreq: "daily", priority: 1.0 },
		{ url: "/ru", changefreq: "daily", priority: 1.0 },
		{ url: "/en", changefreq: "daily", priority: 1.0 },
		{ url: "/kg", changefreq: "daily", priority: 1.0 },

		{ url: "/client", changefreq: "daily", priority: 1.0 },
		{ url: "/ru/client", changefreq: "daily", priority: 1.0 },
		{ url: "/en/client", changefreq: "daily", priority: 1.0 },
		{ url: "/kg/client", changefreq: "daily", priority: 1.0 },
	];

	const stream = new SitemapStream({
		hostname: "https://tezkyzmat-web.vercel.app/",
	});
	res.writeHead(200, { "Content-Type": "application/xml" });

	streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
		res.end(data.toString())
	);
};
