import { CLIENT_APP } from "@/constants/web.constants";
import { routing } from "@/i18n/routing";

/**
 * Universal Links (iOS). Файл без расширения, Content-Type application/json.
 * Проверка: https://app-site-association.cdn-apple.com/a/v1/tezkyzmat.kg
 * Нужно: NEXT_PUBLIC_IOS_APP_ID=TEAMID.bundleId + Associated Domains в приложении:
 *   applinks:tezkyzmat.kg
 */
export const dynamic = "force-static";

export function GET() {
	const paths = routing.locales.flatMap((l) => [`/${l}/p/*`, `/${l}/s/*`]);
	const body = {
		applinks: {
			apps: [],
			details: [
				{
					appID: CLIENT_APP.ios.appId,
					paths: [...paths, "/p/*", "/s/*"],
					components: [
						...routing.locales.flatMap((l) => [
							{ "/": `/${l}/p/*`, comment: "Part page" },
							{ "/": `/${l}/s/*`, comment: "Store page" },
						]),
					],
				},
			],
		},
		webcredentials: { apps: [CLIENT_APP.ios.appId] },
	};
	return new Response(JSON.stringify(body), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
