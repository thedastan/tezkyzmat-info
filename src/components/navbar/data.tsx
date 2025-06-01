"use client";
import { PAGE } from "@/config/pages/public-page.config";
import { useTranslations } from "next-intl";

export const useNavbar = () => {
	const t = useTranslations("Navbar");

	return [
		{
			href: PAGE.FORWHOM,
			name: t("forWhom"),
		},
		{
			href: PAGE.SOLUTION,
			name: t("solution"),
		},
		{
			href: PAGE.ADVANTAGES,
			name: t("advantages"),
		},
		{
			href: PAGE.REVIEV,
			name: t("reviews"),
		},
		{
			href: PAGE.ABOUT,
			name: t("about"),
		},

		{
			href: PAGE.CLIENT,
			name:t("client"),
		},
	];
};
