"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { useLanguageStore } from "@/stores/useLanguageStore";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

const Tariffs = () => {
	const { t } = useLanguageStore();

	const card = [
		{
			title: t("Tariffs.title_card1"),
			price: "0",
			description: [
				{ desc: t("Tariffs.desc1_card1") },
				{ desc: t("Tariffs.desc1_card1") },
			],
		},
		{
			title: "VIP",
			price: "999",
			description: [
				{ desc: t("Tariffs.desc1_card2") },
				{ desc: t("Tariffs.desc2_card2") },
				{ desc: t("Tariffs.desc3_card2") },
			],
		},
	];

	const cardPremium = [
		{
			title: "PREMIUM",
			price: "2500",
			description: [
				{ desc: t("Tariffs.desc1_card3") },
				{ desc: t("Tariffs.desc2_card3") },
				{ desc: t("Tariffs.desc3_card3") },
				{ desc: t("Tariffs.desc4_card3") },
			],
		},
	];

	return (
		<section className="bg-[#1C1C1C] py-10 rounded-tl-[40px] rounded-tr-[40px]">
			<div className="container">
				<div className="w-full flex flex-col justify-center items-center">
					<Title className="text-center text-white">{t("Tariffs.title")}</Title>
					<Description className="text-center max-w-[490px] w-full mt-4 text-white">
						{t("Tariffs.desc")}
					</Description>
				</div>

				<div className="flex flex-col md:flex-row justify-center md:items-end items-center gap-6 mt-20">
					{card.slice(0, 1).map((el, index) => (
						<TariffCard key={index} data={el} />
					))}

					{cardPremium.map((el, index) => (
						<TariffCard key={"premium-" + index} data={el} premium />
					))}

					{card.slice(1).map((el, index) => (
						<TariffCard key={"card-" + index} data={el} />
					))}
				</div>
			</div>
		</section>
	);
};

interface TariffItem {
	title: string;
	price: string;
	description: { desc: string }[];
}

const TariffCard = ({
	data,
	premium,
}: {
	data: TariffItem;
	premium?: boolean;
}) => {
	const { t } = useLanguageStore();
	return (
		<div
			className={`relative flex flex-col justify-between items-center max-w-[400px] overflow-hidden md:max-w-[320px] w-full p-6 rounded-[10px] ${
				premium ? "bg-[#FFE951] h-[541px]" : "bg-[#2D2D2D] h-[491px]"
			}`}>
			<div className="absolute md:top-[-18vw] top-[-10vw] left-4 transform -translate-x-1/2 md:w-[70%] w-[100%] h-[30vw] blur-[80px] bg-[radial-gradient(circle,_rgba(175,171,145,0.5)_0%,_rgba(175,171,145,0.1)_60%,_rgba(175,171,145,0)_100%)] z-0 pointer-events-none" />

			<div className="text-center w-full">
				<Description
					className={`${
						premium ? "text-black font-bold" : "text-white font-bold"
					}`}>
					{data.title}
				</Description>

				<h1
					className={`${
						premium ? "text-black" : "text-white"
					} text-[36px] font-bold mt-6`}>
					{data.price}{" "}
					<span
						className={`border-b-2 ${
							premium ? "border-black" : "border-white"
						}`}>
						{t("Tariffs.price")}
					</span>{" "}
					<span
						className={`${premium ? "text-black" : "text-white"} text-[14px]`}>
						{t("Tariffs.month")}
					</span>
				</h1>

				<div className="flex flex-col gap-4 text-start mt-6">
				{data.description.map((item: { desc: string }, i: number) => (
						<div key={i} className="flex items-center gap-3">
							<h1
								className={`${
									premium ? "bg-[#0000001F]" : "bg-[#FADD13]"
								} flex rounded-[50px] p-1`}>
								<FaCheck
									className={`${premium ? "text-black" : "text-black"}`}
								/>
							</h1>
							<Description
								className={`${premium ? "text-black" : "text-white"}`}>
								{item.desc}
							</Description>
						</div>
					))}
				</div>
			</div>

			<button
				className={`${
					premium
						? "bg-black text-white"
						: "bg-transparent border border-white text-white"
				} rounded-[50px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]`}>
				{t("Tariffs.btn")}{" "}
				<span className="text-[32px]">
					<MdArrowRightAlt />
				</span>
			</button>
		</div>
	);
};

export default Tariffs;
