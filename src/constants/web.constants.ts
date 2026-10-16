/**
 * Константы публичных веб-страниц (магазин / товар).
 */

/** Канонический хост. Один на весь сайт — с www (apex → www редиректит Vercel). */
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
	"https://www.tezkyzmat.kg";

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
		/** TeamID.bundleId для apple-app-site-association (значение публичное). */
		appId: process.env.NEXT_PUBLIC_IOS_APP_ID || "X39VNL226A.kg.tezkyzmat.clientapp",
	},
	android: {
		packageName: "kg.tezkyzmat.clientapp",
		url: "https://play.google.com/store/apps/details?id=kg.tezkyzmat.clientapp",
		/**
		 * SHA-256 сертификатов подписи для assetlinks.json: upload-ключ
		 * (локальные/прямые установки). После публикации в Play добавить
		 * сертификат Play App Signing (Play Console → App signing) через
		 * NEXT_PUBLIC_ANDROID_SHA256 или сюда.
		 */
		sha256: (
			process.env.NEXT_PUBLIC_ANDROID_SHA256 ||
			"A5:AE:D0:67:86:17:5B:D0:16:77:03:38:7F:59:06:57:74:48:B2:B8:26:9D:07:B6:CA:AF:E8:24:48:A9:F9:EE"
		)
			.split(",")
			.filter(Boolean),
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
