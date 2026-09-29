import "server-only";

import type {
	IPaginated,
	IWebDismantleCar,
	IWebDismantleCarCard,
	IWebPart,
	IWebPartCard,
	IWebSitemap,
	IWebStore,
} from "@/models/types/web.types";
import { env } from "@/config/env";

/**
 * Серверный клиент публичных веб-эндпоинтов.
 * Только для Server Components / generateMetadata / sitemap.
 * Данные — всегда с бэкенда (без моков/хардкода).
 * Кэш: ISR 5 минут (REVALIDATE), бэкенд должен отдавать Cache-Control: public, max-age=300.
 */

export const REVALIDATE = 300;
export const STORE_PARTS_LIMIT = 12;

const BASE = `${env.apiBaseUrl}public/v1/web`;

type Envelope<T> = { detail?: T; data?: T } | T;

const unwrap = <T>(json: Envelope<T>): T => {
	if (json && typeof json === "object") {
		if ("detail" in json && (json as { detail?: T }).detail !== undefined)
			return (json as { detail: T }).detail;
		if ("data" in json && (json as { data?: T }).data !== undefined)
			return (json as { data: T }).data;
	}
	return json as T;
};

async function get<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(`${BASE}${path}`, {
			next: { revalidate: REVALIDATE },
			headers: { Accept: "application/json" },
		});
		if (res.status === 404 || res.status === 410) return null;
		if (!res.ok) {
			console.error(`[web-api] ${res.status} ${path}`);
			return null;
		}
		return unwrap<T>(await res.json());
	} catch (e) {
		console.error(`[web-api] fetch failed ${path}`, e);
		return null;
	}
}

/** `radiator-camry-50-1001` → 1001; `1001` → 1001; иначе null */
export const parsePartId = (slugWithId: string): number | null => {
	const m = slugWithId.match(/(\d+)$/);
	if (!m) return null;
	const id = Number(m[1]);
	return Number.isFinite(id) && id > 0 ? id : null;
};

export const partPath = (p: Pick<IWebPart, "slug" | "id">) =>
	`/p/${p.slug}-${p.id}`;
export const storePath = (s: Pick<IWebStore, "slug">) => `/s/${s.slug}`;
export const dismantlePath = (c: Pick<IWebDismantleCar, "slug" | "id">) =>
	`/d/${c.slug}-${c.id}`;

export async function getPart(id: number): Promise<IWebPart | null> {
	return get<IWebPart>(`/parts/${id}/`);
}

export async function getSimilarParts(id: number): Promise<IWebPartCard[]> {
	const data = await get<IWebPartCard[] | IPaginated<IWebPartCard>>(
		`/parts/${id}/similar/`
	);
	if (!data) return [];
	return Array.isArray(data) ? data : data.items;
}

export async function getStore(slug: string): Promise<IWebStore | null> {
	return get<IWebStore>(`/stores/${encodeURIComponent(slug)}/`);
}

export async function getStoreParts(
	slug: string,
	page = 1,
	limit = STORE_PARTS_LIMIT
): Promise<IPaginated<IWebPartCard> | null> {
	return get<IPaginated<IWebPartCard>>(
		`/stores/${encodeURIComponent(slug)}/parts/?page=${page}&limit=${limit}`
	);
}

export async function getDismantleCar(
	id: number
): Promise<IWebDismantleCar | null> {
	return get<IWebDismantleCar>(`/dismantle-cars/${id}/`);
}

export async function getSimilarDismantleCars(
	id: number
): Promise<IWebDismantleCarCard[]> {
	const data = await get<IWebDismantleCarCard[] | IPaginated<IWebDismantleCarCard>>(
		`/dismantle-cars/${id}/similar/`
	);
	if (!data) return [];
	return Array.isArray(data) ? data : data.items;
}

export async function getSitemap(opts?: {
	type?: "stores" | "parts" | "dismantle";
	page?: number;
}): Promise<IWebSitemap> {
	const params = new URLSearchParams();
	if (opts?.type) params.set("type", opts.type);
	if (opts?.page) params.set("page", String(opts.page));
	const qs = params.toString();
	return (
		(await get<IWebSitemap>(`/sitemap/${qs ? `?${qs}` : ""}`)) ?? {
			stores: [],
			parts: [],
			dismantle: [],
			pages: { stores: 0, parts: 0, dismantle: 0 },
			page: 1,
			page_size: 50000,
		}
	);
}
