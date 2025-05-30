import { useLanguageStore } from "@/stores/useLanguageStore";
import React, { useState, useRef, useEffect } from "react";

const languageLabels: Record<"ru" | "kg" | "en", string> = {
	ru: "РУС",
	kg: "КГ",
	en: "ENG",
};

interface ILanguage {
	setIsOpen: (isOpen: boolean) => void;
}

export default function LanguageSelect({ setIsOpen }: ILanguage) {
	const { language, setLanguage } = useLanguageStore();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Закрыть меню при клике вне компонента
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const options: ("ru" | "kg" | "en")[] = ["ru", "kg", "en"];

	const handleSelect = (lang: "ru" | "kg" | "en") => {
		setLanguage(lang);
		setOpen(false);
	};

	return (
		<div
			ref={containerRef}
			className="relative w-18 text-14 select-none font-sans">
			{/* Заголовок селекта */}
			<div
				onClick={() => setOpen(!open)}
				className=" md:text-white text-black text-14 rounded-md md:px-3 px-0 md:py-2 py-0 cursor-pointer flex justify-between items-center bg-transparent">
				<span className="uppercase text-[16px] md:text-[14px]">
					{languageLabels[language]}
				</span>
				<svg
					className={`w-4 h-4 ml-2 transition-transform duration-200 ${
						open ? "rotate-180" : ""
					}`}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2">
					<path d="M6 9l6 6 6-6" />
				</svg>
			</div>

			{/* Выпадающий список */}
			{open && (
				<ul className="absolute top-full w-32 left-0 right-0 mt-1 rounded-md bg-[#505050] shadow-md max-h-36 overflow-y-auto z-50">
					{options.map((lang) => (
						<li key={lang} onClick={() => setIsOpen(false)}>
							<button
								onClick={() => handleSelect(lang)}
								className={`w-full text-left px-3 py-2 focus:outline-none ${
									lang === language
										? "bg-[#FADD13] text-black"
										: "md:hover:bg-[#696969] text-white"
								}`}>
								{languageLabels[lang]}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
