import axios, { type CreateAxiosDefaults } from "axios";

import { env } from "@/config/env";
import { errorCatch } from "./error";

const config: CreateAxiosDefaults = {
	baseURL: env.apiBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
};

/**
 * Публичный HTTP-клиент (без авторизации).
 *
 * Ответы возвращаются как есть; ошибки нормализуются в `Error` с понятным
 * сообщением, поэтому потребителям (react-query, компоненты) не нужно знать
 * о внутреннем формате ответа axios/бэкенда.
 */
export const http = axios.create(config);

http.interceptors.response.use(
	(response) => response,
	(error: unknown) => Promise.reject(new Error(errorCatch(error)))
);
