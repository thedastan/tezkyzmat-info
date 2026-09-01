import type { ApiList } from "./api";

export interface ManufacturerCountry {
	id: number;
	flag: string;
	name: string;
	created_at: string;
}

export interface Brand {
	id: number;
	name: string;
	icon?: string;
	created_at: string;
}

export interface FuelType {
	id: number;
	name: string;
	created_at: string;
}

export interface BrandModelYear {
	id: number;
	year: number;
	created_at: string;
}

export interface BrandModelVolume {
	id: number;
	volume: number;
	created_at: string;
}

export interface BrandModel {
	id: number;
	name: string;
	brand: Brand;
	years: BrandModelYear[];
	volumes: BrandModelVolume[];
	created_at: string;
}

export type ManufacturerCountriesResponse = ApiList<ManufacturerCountry>;
export type BrandsResponse = ApiList<Brand>;
export type FuelTypesResponse = ApiList<FuelType>;
export type BrandModelsResponse = ApiList<BrandModel>;
