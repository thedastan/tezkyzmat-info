import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ru", "en", "kg"],

  // Used when no locale matches
  defaultLocale: "ru",
});
