import { PUBLIC_API } from "@/api/interceptors";

import {
	IBrandModelRoot,
	IBrandsRoot,
	IFuelTypesRoot,
	IManufacturerCountriesRoot,
} from "../models/types/types";

class ClinicServices {
	private BASE_URL = "public/v1/classifiers/";
	private BASE_URL_PRIVATE = "private/v1/orders/";

	async getManufacturerCountries() {
		const response = await PUBLIC_API.get<IManufacturerCountriesRoot>(
			this.BASE_URL + "manufacturer_countries/"
		);

		return response.data;
	}

	async getBrands() {
		const response = await PUBLIC_API.get<IBrandsRoot>(
			this.BASE_URL + "brands/"
		);

		return response.data;
	}

	async getFuelTypes() {
		const response = await PUBLIC_API.get<IFuelTypesRoot>(
			this.BASE_URL + "fuel_types/"
		);

		return response.data;
	}

	///

	async getBrandModels(brandId: number) {
		const response = await PUBLIC_API.get<IBrandModelRoot>(
			this.BASE_URL + `brand_models/${brandId}/`
		);
		return response.data;
	}

	 
}

export const clinicService = new ClinicServices();
