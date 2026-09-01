import { QueryClient } from "@tanstack/react-query";

/**
 * Фабрика QueryClient с общими дефолтами.
 * Справочники меняются редко, поэтому кэшируем их надолго.
 */
export function makeQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 5 * 60 * 1000, // 5 минут
				gcTime: 10 * 60 * 1000, // 10 минут
				retry: 1,
			},
		},
	});
}
