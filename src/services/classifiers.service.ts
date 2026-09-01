import { http } from "@/api/axios";
import type {
	BrandModelsResponse,
	BrandsResponse,
	FuelTypesResponse,
	ManufacturerCountriesResponse,
} from "@/models/types/classifiers";

const CLASSIFIERS_URL = "public/v1/classifiers";

/** Справочники: страны-производители, марки, типы топлива, модели. */
export const classifiersService = {
	getManufacturerCountries: () =>
		http
			.get<ManufacturerCountriesResponse>(
				`${CLASSIFIERS_URL}/manufacturer_countries/`
			)
			.then((res) => res.data),

	getBrands: () =>
		http
			.get<BrandsResponse>(`${CLASSIFIERS_URL}/brands/`)
			.then((res) => res.data),

	getFuelTypes: () =>
		http
			.get<FuelTypesResponse>(`${CLASSIFIERS_URL}/fuel_types/`)
			.then((res) => res.data),

	getBrandModels: (brandId: number) =>
		http
			.get<BrandModelsResponse>(`${CLASSIFIERS_URL}/brand_models/${brandId}/`)
			.then((res) => res.data),
};
