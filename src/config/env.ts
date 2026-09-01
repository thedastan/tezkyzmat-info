/**
 * Единая, валидируемая точка доступа к переменным окружения.
 *
 * Значения читаются один раз при загрузке модуля. Публичные переменные
 * (`NEXT_PUBLIC_*`) доступны и на клиенте, и на сервере.
 */

const DEFAULT_API_BASE_URL = "https://api.tezkyzmat.com.kg/api/";

function readApiBaseUrl(): string {
	const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
	const url = value && value.length > 0 ? value : DEFAULT_API_BASE_URL;

	// Гарантируем завершающий слэш, чтобы относительные пути в сервисах
	// склеивались предсказуемо.
	return url.endsWith("/") ? url : `${url}/`;
}

export const env = {
	apiBaseUrl: readApiBaseUrl(),
	isProduction: process.env.NODE_ENV === "production",
	isClient: typeof window !== "undefined",
} as const;

export type Env = typeof env;
