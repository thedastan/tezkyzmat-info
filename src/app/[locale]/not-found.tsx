"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
	const t = useTranslations("NotFound");

	return (
		 
				<div className="bg-[#1C1C1C] text-white">
					<div className="w-full h-[90vh] flex flex-col justify-center items-center text-center px-4">
						<div className=" ">
							<h1 className="text-6xl font-bold text-[#FADD13] mb-4">404</h1>
							<p className="text-xl mb-6">{t("title")}</p>
							<Link
								href="/"
								className="inline-block bg-[#FADD13] hover:bg-[#ffe95c] text-black font-normal py-2 px-4 rounded transition duration-300">
								{t("btn")}
							</Link>
						</div>
					</div>
				</div>
			 
	);
}
