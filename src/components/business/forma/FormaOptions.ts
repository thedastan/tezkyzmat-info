import {
	useManufacturerCountries,
	useFuelTypes,
	useBrands,
	useBrandModels,
} from "@/hooks/data-hooks";
import { useParams } from "next/navigation";

interface IOptionItem {
	id: number;
	name: string;
}

export function useFormOptions(selectedBrandId?: number) {
	const { data: countryData } = useManufacturerCountries();
	const { data: fuelData } = useFuelTypes();
	const { data: brandsData } = useBrands();
	const { data: modelsData, isLoading: modelsLoading } = useBrandModels(selectedBrandId);
	const { locale } = useParams();

	// Объём двигателя
	const volumes = [
		"0.8", "1.0", "1.2", "1.4", "1.5", "1.6", "1.8",
		"2.0", "2.2", "2.4", "2.5", "2.7", "3.0", "3.2",
		"3.5", "4.0", "4.4", "5.0", "5.5", "6.0",
	];

	const unit = locale === "kg" || locale === "ru" ? "л" : "l";
	const volumeOptions = volumes.map((value) => ({
		label: `${value} ${unit}`,
		value,
	}));

	const manufacturerCountries =
		countryData?.detail?.map((item: IOptionItem) => ({
			label: item.name,
			value: item.name,
		})) || [];

	const fueltype =
		fuelData?.detail?.map((item: IOptionItem) => ({
			label: item.name,
			value: item.name,
		})) || [];

	const brandOptions =
		brandsData?.detail?.map((b) => ({
			label: b.name,
			value: b.id.toString(),
		})) || [];

	const modelOptions =
		modelsData?.detail?.map((m) => ({
			label: m.name,
			value: m.id.toString(),
		})) || [];

	return {
		manufacturerCountries,
		fueltype,
		brandOptions,
		modelOptions,
		volumeOptions,
		modelsLoading,
	};
}
