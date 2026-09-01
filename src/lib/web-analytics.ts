/**
 * События веб-страниц → бэкенд (POST /api/public/v1/web/events/) + Yandex Metrika.
 * Бэкенд агрегирует: просмотры по магазину/товару, клики «Открыть в приложении»,
 * источник (src=app_share&ref=userId) — чтобы продавец видел, сколько раз делились его товарами.
 */
import { API_ADDRESS } from "@/api/interceptors";

export type WebEventType = "web_view" | "web_open_app_click";

export interface WebEvent {
	type: WebEventType;
	entity: "part" | "store";
	entity_id: number;
	/** ?src=app_share | instagram | direct … */
	src: string | null;
	/** ?ref=<userId того, кто поделился> */
	ref: string | null;
	platform: "ios" | "android" | "other";
	locale: string;
	path: string;
	referrer: string | null;
}

const ENDPOINT = `${API_ADDRESS}public/v1/web/events/`;
const METRIKA_ID = 103506111;

export const detectPlatform = (): WebEvent["platform"] => {
	if (typeof navigator === "undefined") return "other";
	const ua = navigator.userAgent || "";
	if (/android/i.test(ua)) return "android";
	if (/iPad|iPhone|iPod/.test(ua)) return "ios";
	return "other";
};

const params = () => {
	if (typeof window === "undefined") return { src: null, ref: null };
	const q = new URLSearchParams(window.location.search);
	return { src: q.get("src"), ref: q.get("ref") };
};

/** Анонимный id посетителя (localStorage) — чтобы считать уникальных, без PII */
const visitorId = (): string => {
	try {
		const k = "tk_vid";
		let v = localStorage.getItem(k);
		if (!v) {
			v = crypto.randomUUID();
			localStorage.setItem(k, v);
		}
		return v;
	} catch {
		return "anon";
	}
};

export function trackWebEvent(
	type: WebEventType,
	entity: WebEvent["entity"],
	entityId: number,
	locale: string
) {
	if (typeof window === "undefined") return;
	const { src, ref } = params();
	const event: WebEvent & { visitor_id: string; ts: string } = {
		type,
		entity,
		entity_id: entityId,
		src,
		ref,
		platform: detectPlatform(),
		locale,
		path: window.location.pathname,
		referrer: document.referrer || null,
		visitor_id: visitorId(),
		ts: new Date().toISOString(),
	};

	// Бэкенд: sendBeacon не блокирует уход со страницы (клик по кнопке → стор)
	try {
		const body = JSON.stringify(event);
		if (navigator.sendBeacon) {
			navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
		} else {
			fetch(ENDPOINT, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
		}
	} catch {
		/* noop */
	}

	// Метрика: цель + параметры визита
	try {
		const w = window as unknown as { ym?: (...a: unknown[]) => void };
		w.ym?.(METRIKA_ID, "reachGoal", type, { entity, entity_id: entityId, src, platform: event.platform });
	} catch {
		/* noop */
	}
}
