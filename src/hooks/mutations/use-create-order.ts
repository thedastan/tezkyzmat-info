import { useMutation } from "@tanstack/react-query";

import type { CreateFromUaeOrderPayload } from "@/models/types/order";
import { ordersService } from "@/services/orders.service";

/** Создание заявки на запчасти из ОАЭ через бэкенд. */
export function useCreateFromUaeOrder() {
	return useMutation({
		mutationFn: (payload: CreateFromUaeOrderPayload) =>
			ordersService.createFromUae(payload),
	});
}
