/**
 * Константы публичных веб-страниц (магазин / товар).
 */

/** Канонический хост. Один на весь сайт — без www (см. next.config redirects). */
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://tezkyzmat.kg";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/seo-img.png`;

/**
 * Клиентское приложение «Tez Kyzmat» (для покупателей) — именно его открываем по ссылке.
 * ⚠️ Проверить: в constants.ts ссылки CLIENT/BUSINESS выглядят перепутанными
 * (IOS_LINK_CLIENT ведёт на «TK Business»). Здесь — по названиям в сторах.
 */
export const CLIENT_APP = {
	name: "Tez Kyzmat",
	ios: {
		appStoreId: "6748315485",
		url: "https://apps.apple.com/kg/app/tez-kyzmat/id6748315485",
		/** TEAMID.bundleId — заполнить для apple-app-site-association */
		appId: process.env.NEXT_PUBLIC_IOS_APP_ID || "TEAMID.kg.tezkyzmat.clientapp",
	},
	android: {
		packageName: "kg.tezkyzmat.clientapp",
		url: "https://play.google.com/store/apps/details?id=kg.tezkyzmat.clientapp",
		/** SHA-256 release-ключа — заполнить для assetlinks.json */
		sha256: (process.env.NEXT_PUBLIC_ANDROID_SHA256 || "").split(",").filter(Boolean),
	},
	/** Кастомная схема — только как fallback внутри intent://, в ссылках не используется */
	scheme: "tezkyzmat",
} as const;

export const CURRENCY_LABEL: Record<string, string> = {
	KGS: "сом",
	USD: "$",
};

export const formatPrice = (value: number, currency = "KGS") => {
	const n = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value);
	const label = CURRENCY_LABEL[currency] ?? currency;
	return currency === "USD" ? `${label}${n}` : `${n} ${label}`;
};
