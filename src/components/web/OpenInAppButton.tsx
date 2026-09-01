"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CLIENT_APP, SITE_URL } from "@/constants/web.constants";
import { detectPlatform, trackWebEvent } from "@/lib/web-analytics";

type Platform = "ios" | "android" | "other";

/**
 * Ссылка «Открыть в приложении».
 * - Android: intent:// с тем же https-путём → если приложение есть, откроется оно;
 *   иначе Google Play (browser_fallback_url).
 * - iOS: Universal Link из Safari по клику на тот же URL не срабатывает,
 *   поэтому ведём в App Store; Smart App Banner (meta apple-itunes-app) даёт
 *   нативную кнопку «Открыть» сверху, если приложение установлено.
 * - Desktop: страница-инструкция со ссылками на оба стора.
 */
const buildHref = (platform: Platform, path: string) => {
	const clean = path.replace(/^\//, "");
	const host = SITE_URL.replace(/^https?:\/\//, "");
	if (platform === "android") {
		return (
			`intent://${host}/${clean}#Intent;scheme=https;` +
			`package=${CLIENT_APP.android.packageName};` +
			`S.browser_fallback_url=${encodeURIComponent(CLIENT_APP.android.url)};end`
		);
	}
	if (platform === "ios") return CLIENT_APP.ios.url;
	return CLIENT_APP.ios.url;
};

interface Props {
	/** Путь страницы с локалью, напр. /ru/p/radiator-1001 */
	path: string;
	entity: "part" | "store";
	entityId: number;
	locale: string;
	variant?: "sticky" | "inline";
}

export default function OpenInAppButton({
	path,
	entity,
	entityId,
	locale,
	variant = "sticky",
}: Props) {
	const t = useTranslations("Web");
	const [platform, setPlatform] = useState<Platform>("other");

	useEffect(() => setPlatform(detectPlatform()), []);

	const href = buildHref(platform, path);
	const onClick = () => trackWebEvent("web_open_app_click", entity, entityId, locale);

	const button = (
		<a
			href={href}
			onClick={onClick}
			rel="noopener"
			className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FADD13] px-5 py-3.5 text-[16px] font-semibold text-black transition hover:bg-[#ffe95c] active:scale-[0.99]">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
				<rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
				<circle cx="12" cy="18" r="1" fill="currentColor" />
			</svg>
			{t("openInApp")}
		</a>
	);

	if (variant === "inline") return button;

	// Мобильный: закреплённая панель внизу (странице нужен pb-[90px], см. web-page класс).
	// Десктоп: обычная кнопка в потоке.
	return (
		<>
			<div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
				{button}
			</div>
			<div className="hidden md:block">{button}</div>
		</>
	);
}
