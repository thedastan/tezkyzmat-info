export interface IManufacturerCountriesRoot {
	detail: IManufacturerCountries[];
}

export interface IManufacturerCountries {
	id: number;
	flag: string;
	name: string;
	created_at: string;
}

///

export interface IBrandsRoot {
	detail: IBrands[];
}

export interface IBrands {
	id: number;
	name: string;
	icon?: string;
	created_at: string;
}

///

export interface IFuelTypesRoot {
  detail: IFuelTypes[]
}

export interface IFuelTypes {
  id: number
  name: string
  created_at: string
}

///

export interface IBrandModelRoot {
  detail: IBrandModelDetail[]
}

export interface IBrandModelDetail {
  id: number
  name: string
  brand: IBrandModelBrand
  years: IBrandModelYear[]
  volumes: IBrandModelVolume[]
  created_at: string
}

export interface IBrandModelBrand {
  id: number
  name: string
  icon: string
  created_at: string
}

export interface IBrandModelYear {
  id: number
  year: number
  created_at: string
}

export interface IBrandModelVolume {
  id: number
  volume: number
  created_at: string
}


///

export interface IGetFromUae {
  phone: string
  brand_id: number
  brand_model_id: number
  year_id: number
  manufacturer_country_id: number
  fuel_type_id: number
  volume_id: number
  vin: string
  comment: string
  images: number[]
}

