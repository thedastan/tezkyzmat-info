import { AxiosError, isAxiosError } from "axios";

interface ApiErrorResponse {
	message?: string | string[];
	detail?: string;
}

/**
 * Приводит любую ошибку запроса к человекочитаемой строке.
 * Понимает формат ответа бэкенда (`message` / `detail`) и сетевые ошибки axios.
 */
export function errorCatch(error: unknown): string {
	if (isAxiosError<ApiErrorResponse>(error)) {
		const data = error.response?.data;
		const message = data?.message ?? data?.detail;

		if (Array.isArray(message)) return message[0] ?? error.message;
		if (message) return message;

		return error.message;
	}

	if (error instanceof Error) return error.message;

	return "Неизвестная ошибка";
}

export type { AxiosError };
