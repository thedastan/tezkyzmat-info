/** Тело запроса на создание заявки на запчасти из ОАЭ. */
export interface CreateFromUaeOrderPayload {
	phone: string;
	brand_id: number;
	brand_model_id: number;
	year_id: number;
	manufacturer_country_id: number;
	fuel_type_id: number;
	volume_id: number;
	vin: string;
	comment: string;
	images: number[];
}
