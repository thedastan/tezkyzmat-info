import { useQuery } from "@tanstack/react-query";

import { clinicService } from "@/services/services";

export function useManufacturerCountries() {
	const { data, isLoading } = useQuery({
		queryKey: ["manufacturer_countries"],
		queryFn: () => clinicService.getManufacturerCountries(),
	});

	return { data, isLoading };
}

export function useBrands() {
	const { data, isLoading } = useQuery({
		queryKey: ["brands"],
		queryFn: () => clinicService.getBrands(),
	});

	return { data, isLoading };
}

export function useFuelTypes() {
	const { data, isLoading } = useQuery({
		queryKey: ["fuel_types"],
		queryFn: () => clinicService.getFuelTypes(),
	});

	return { data, isLoading };
}

export function useBrandModels(brandId?: number) {
	const { data, isLoading } = useQuery({
		queryKey: ["brand_models", brandId],
		enabled: !!brandId,
		queryFn: () => clinicService.getBrandModels(brandId!),
	});

	return { data, isLoading };
}

///
