"use client";
import { usePathname } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";
import { useTranslations } from "next-intl";

export const useNavbar = () => {
	const t = useTranslations("Navbar");
	const pathname = usePathname();

	const isBusinessPage = pathname.endsWith(PAGE.BUSINESS);


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
			href: isBusinessPage ? PAGE.CLIENT : PAGE.BUSINESS,
			name: isBusinessPage ? t("business") : t("client"),
		},
	];
};
