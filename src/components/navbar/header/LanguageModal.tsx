 
"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef  } from "react";
import { IoIosArrowDown } from "react-icons/io";


type LanguageSelectProps = {
	textColor?: string; // например, "text-white" или "text-black"
};


const LanguageSelect = ({ textColor = "text-white" }: LanguageSelectProps) => {
	const pathname = usePathname();
	const { push: navigate } = useRouter();
	const params = useParams();
	const { locale } = params;
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const options = [
		{ value: "ru", label: "РУС" },
		{ value: "kg", label: "КГ" },
		{ value: "en", label: "ENG" },
	];

	const LanguageChange = (newLocale: string) => {
		const newPathname = pathname.replace(`/${params.locale}`, `/${newLocale}`);
		navigate(newPathname);
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};
 
 

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button
				className={`flex items-center gap-2 w-[70px]    bg-transparent   ${textColor}   text-[14px]   transition-all`}
				onClick={() => setIsOpen(!isOpen)}>
				{options.find((opt) => opt.value === locale)?.label}
				<span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
				<IoIosArrowDown />
				</span>
			</button>

			{isOpen && (
				<div className="absolute left-0 mt-2 w-24 bg-[#4d4d4d]  text-white border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
					{options.map((option) => (
						<div
							key={option.value}
							className="px-4 py-2 text-sm hover:bg-[#FADD13] hover:text-black cursor-pointer transition-all flex items-center gap-2"
							onClick={() => {
								LanguageChange(option.value);
								setIsOpen(false);
							}}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSelect;
