"use client";
import { PAGE } from "@/config/pages/public-page.config";
import { useLanguageStore } from "@/stores/useLanguageStore";

export const useNavbar = () => {
	const { t } = useLanguageStore();

	return [
		{
			href: PAGE.FORWHOM,
			name: t("Navbar.forWhom"),
		},
		{
			href: PAGE.SOLUTION,
			name: t("Navbar.solution"),
		},
		{
			href: PAGE.ADVANTAGES,
			name: t("Navbar.advantages"),
		},
		{
			href: PAGE.REVIEV,
			name: t("Navbar.reviews"),
		},
		{
			href: PAGE.ABOUT,
			name: t("Navbar.about"),
		},
	];
};
