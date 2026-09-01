/** Транслит + slug. Тот же алгоритм должен быть на бэкенде (поле slug). */
const MAP: Record<string, string> = {
	а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
	к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
	х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
	ө: "o", ү: "u", ң: "n",
};

export const slugify = (input: string, max = 80): string =>
	input
		.toLowerCase()
		.split("")
		.map((ch) => (ch in MAP ? MAP[ch] : ch))
		.join("")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, max)
		.replace(/-+$/g, "") || "item";
