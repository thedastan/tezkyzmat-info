// import { create } from "zustand";
// import ru from "../../messages/ru.json";
// import kg from "../../messages/kg.json";
// import en from "../../messages/en.json";

// interface LanguageStore {
// 	language: "ru" | "kg" | "en";
// 	setLanguage: (language: "ru" | "kg" | "en") => void;
// 	t: (key: string) => string;
// }




// export const useLanguageStore = create<LanguageStore>((set, get) => ({
// 	language: "ru",
// 	setLanguage: (language: "ru" | "kg" | "en") => set({ language }),
// 	t: (key: string): string => {
// 		const currentLanguage = get().language;
// 		const translations: Record<string, any> =
// 			currentLanguage === "ru" ? ru : currentLanguage === "kg" ? kg : en;

// 		// Попробуем найти перевод, вернем строку по умолчанию, если не найдено
// 		const translation = key
// 			.split(".")
// 			.reduce(
// 				(obj, keyPart) =>
// 					obj && obj[keyPart] !== undefined ? obj[keyPart] : undefined,
// 				translations
// 			);

// 		return typeof translation === "string" ? translation : key; // Гарантируем, что возвращается строка
// 	},
// }));


import { create } from "zustand";
import ru from "../../messages/ru.json";
import kg from "../../messages/kg.json";
import en from "../../messages/en.json";

interface LanguageStore {
  language: "ru" | "kg" | "en";
  setLanguage: (language: "ru" | "kg" | "en") => void;
  t: (key: string) => string;
}

type TranslationValue = string | string[] | Translations;

type Translations = {
  [key: string]: TranslationValue;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: "ru",
  setLanguage: (language: "ru" | "kg" | "en") => set({ language }),
  t: (key: string): string => {
    const currentLanguage = get().language;
    const translations: Translations =
      currentLanguage === "ru" ? ru : currentLanguage === "kg" ? kg : en;

    const translation = key
      .split(".")
      .reduce<TranslationValue | undefined>(
        (obj, keyPart) =>
          obj && typeof obj === "object" && keyPart in obj
            ? (obj as Translations)[keyPart]
            : undefined,
        translations
      );

    if (Array.isArray(translation)) {
      return translation.join(", ");
    }

    return typeof translation === "string" ? translation : key;
  },
}));
