/**
 * Единый источник ключей react-query. Держим их в одном месте,
 * чтобы избежать опечаток и рассинхрона при инвалидации кэша.
 */
export const queryKeys = {
	classifiers: {
		manufacturerCountries: ["classifiers", "manufacturer-countries"] as const,
		brands: ["classifiers", "brands"] as const,
		fuelTypes: ["classifiers", "fuel-types"] as const,
		brandModels: (brandId?: number) =>
			["classifiers", "brand-models", brandId] as const,
	},
} as const;
