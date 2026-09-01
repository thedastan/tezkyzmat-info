"use client";

import { useEffect } from "react";
import { trackWebEvent } from "@/lib/web-analytics";

interface Props {
	entity: "part" | "store";
	entityId: number;
	locale: string;
}

/** Фиксирует просмотр страницы (кто зашёл по вебу, откуда — src/ref). Рендерит ничего. */
export default function TrackView({ entity, entityId, locale }: Props) {
	useEffect(() => {
		trackWebEvent("web_view", entity, entityId, locale);
	}, [entity, entityId, locale]);
	return null;
}
