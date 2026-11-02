import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * Поверх локализации: метки источника перехода (`?src=app_share&ref=…`)
 * кладём в короткую cookie. Страницы товара/авто делают 301 на канонический
 * URL (устаревший slug при верном id) и query при этом теряется — просмотр по
 * ссылке из приложения засчитывался как «прямой», и переходы из шеринга в
 * аналитике упали в ноль. `TrackView` на целевой странице читает cookie,
 * когда в адресе меток уже нет (см. web-analytics.ts), и сразу её гасит.
 * Через searchParams на странице так нельзя — это выключило бы ISR-кэш.
 */
export default function middleware(req: NextRequest) {
	const res = intl(req);
	const src = req.nextUrl.searchParams.get("src");
	if (src) {
		const ref = req.nextUrl.searchParams.get("ref") ?? "";
		// Значение Next кодирует сам (| → %7C); на клиенте decodeURIComponent.
		res.cookies.set("tk_src", `${src}|${ref}`, {
			maxAge: 120,
			path: "/",
			sameSite: "lax",
		});
	}
	return res;
}

export const config = {
	matcher: ['/', '/(ru|en|kg)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
