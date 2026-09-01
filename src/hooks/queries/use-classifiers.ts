import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { classifiersService } from "@/services/classifiers.service";

export function useManufacturerCountries() {
	return useQuery({
		queryKey: queryKeys.classifiers.manufacturerCountries,
		queryFn: classifiersService.getManufacturerCountries,
	});
}

export function useBrands() {
	return useQuery({
		queryKey: queryKeys.classifiers.brands,
		queryFn: classifiersService.getBrands,
	});
}

export function useFuelTypes() {
	return useQuery({
		queryKey: queryKeys.classifiers.fuelTypes,
		queryFn: classifiersService.getFuelTypes,
	});
}

export function useBrandModels(brandId?: number) {
	return useQuery({
		queryKey: queryKeys.classifiers.brandModels(brandId),
		queryFn: () => classifiersService.getBrandModels(brandId!),
		enabled: brandId != null,
	});
}
