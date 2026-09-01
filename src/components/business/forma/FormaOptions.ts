import { useMemo } from "react";

import {
	useBrandModels,
	useBrands,
	useFuelTypes,
	useManufacturerCountries,
} from "@/hooks/queries/use-classifiers";
import useTypedLocale from "@/hooks/useLocale";
import { EnumIntl } from "@/models/types/intl-types";

export interface SelectOption {
	label: string;
	value: string;
}

/** Возможные объёмы двигателя (л). */
const ENGINE_VOLUMES = [
	"0.8", "1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "2.2", "2.4",
	"2.5", "2.7", "3.0", "3.2", "3.5", "4.0", "4.4", "5.0", "5.5", "6.0",
] as const;

/**
 * Готовит опции для селектов формы из справочников бэкенда.
 * Значения марок/моделей — строковые id, стран/топлива — имена (как ожидает форма).
 */
export function useFormOptions(selectedBrandId?: number) {
	const locale = useTypedLocale();
	const { data: countryData } = useManufacturerCountries();
	const { data: fuelData } = useFuelTypes();
	const { data: brandsData } = useBrands();
	const { data: modelsData, isLoading: modelsLoading } =
		useBrandModels(selectedBrandId);

	const volumeUnit = locale === EnumIntl.ENGLISH ? "l" : "л";

	const volumeOptions = useMemo<SelectOption[]>(
		() => ENGINE_VOLUMES.map((value) => ({ label: `${value} ${volumeUnit}`, value })),
		[volumeUnit]
	);

	const manufacturerCountries = useMemo<SelectOption[]>(
		() => (countryData?.detail ?? []).map((c) => ({ label: c.name, value: c.name })),
		[countryData]
	);

	const fueltype = useMemo<SelectOption[]>(
		() => (fuelData?.detail ?? []).map((f) => ({ label: f.name, value: f.name })),
		[fuelData]
	);

	const brandOptions = useMemo<SelectOption[]>(
		() => (brandsData?.detail ?? []).map((b) => ({ label: b.name, value: String(b.id) })),
		[brandsData]
	);

	const modelOptions = useMemo<SelectOption[]>(
		() => (modelsData?.detail ?? []).map((m) => ({ label: m.name, value: String(m.id) })),
		[modelsData]
	);

	return {
		manufacturerCountries,
		fueltype,
		brandOptions,
		modelOptions,
		volumeOptions,
		modelsLoading,
	};
}
