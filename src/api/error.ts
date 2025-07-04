import { AxiosError } from "axios";

interface ErrorResponse {
	message: string | string[];
}

export const errorCatch = (error: AxiosError<ErrorResponse>): string => {
	const message = error?.response?.data?.message;

	if (!message) return error.message;

	return Array.isArray(message) ? message[0] : message;
};
