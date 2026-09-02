import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CLIENT_APP, DEFAULT_OG_IMAGE, SITE_URL } from "@/constants/web.constants";

/** Абсолютный URL страницы с локалью: /p/x-1 → https://www.tezkyzmat.kg/ru/p/x-1 */
export const absUrl = (locale: string, path: string) =>
	`${SITE_URL}/${locale}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "");

/** hreflang для всех локалей + x-default на дефолтную */
export const languageAlternates = (path: string) => {
	const languages: Record<string, string> = {};
	for (const l of routing.locales) languages[l] = absUrl(l, path);
	languages["x-default"] = absUrl(routing.defaultLocale, path);
	return languages;
};

interface WebMeta {
	locale: string;
	path: string;
	title: string;
	description: string;
	image?: string | null;
	noindex?: boolean;
}

export const webMetadata = ({
	locale,
	path,
	title,
	description,
	image,
	noindex,
}: WebMeta): Metadata => {
	const url = absUrl(locale, path);
	const ogImage = image || DEFAULT_OG_IMAGE;
	return {
		title,
		description,
		robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
		alternates: { canonical: url, languages: languageAlternates(path) },
		openGraph: {
			title,
			description,
			url,
			siteName: "Tez Kyzmat",
			type: "website",
			locale: locale === "kg" ? "ky_KG" : locale === "en" ? "en_US" : "ru_RU",
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
		other: {
			// Smart App Banner в Safari: если приложение установлено — кнопка «Открыть» с deep link
			"apple-itunes-app": `app-id=${CLIENT_APP.ios.appStoreId}, app-argument=${url}`,
		},
	};
};

export const jsonLd = (data: Record<string, unknown>) =>
	JSON.stringify(data).replace(/</g, "\\u003c");
