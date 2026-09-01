/** Маршруты и якоря публичного сайта. */
export const PAGE = {
	HOME: "/",

	// Якоря секций на лендинге
	FORWHOM: "#forwhom",
	SOLUTION: "#solution",
	ADVANTAGES: "#advantages",
	REVIEV: "#reviews",
	ABOUT: "#about",

	// Страницы
	CLIENT: "/",
	BUSINESS: "/business",
	PRIVACY: "/privacy-policy",
	PUBLIC: "/public-offer",
	RETURN: "/refund-policy",
} as const;

export type PageKey = keyof typeof PAGE;
