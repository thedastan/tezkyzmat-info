import { http } from "@/api/axios";
import type { CreateFromUaeOrderPayload } from "@/models/types/order";

const ORDERS_URL = "private/v1/orders";

/** Заявки на запчасти. */
export const ordersService = {
	createFromUae: (payload: CreateFromUaeOrderPayload) =>
		http.post(`${ORDERS_URL}/from_uae/`, payload).then((res) => res.data),
};
