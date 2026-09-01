"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

import { makeQueryClient } from "@/lib/react-query";

/**
 * Держит единственный экземпляр QueryClient на всё время жизни приложения.
 * `useState(makeQueryClient)` создаёт клиент лениво один раз, а не на каждый рендер.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(makeQueryClient);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
