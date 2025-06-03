import Applications from "@/components/home/applications/Applications";
import BusinessProblems from "@/components/home/business-problems/BusinessProblems";
import Group from "@/components/home/group/Group";
import Hero from "@/components/home/hero/Hero";
import Instruction from "@/components/home/instruction/Instruction";
import Reviews from "@/components/home/reviews/Reviews";
import Service from "@/components/home/service/Service";
import Tariffs from "@/components/home/tariffs/Tariffs";
import WeTeam from "@/components/home/we-team/WeTeam";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
	title: "TezKyzmat — Информационный сайт для продавцов автозапчастей",
	description:
		"Узнайте, как продавцам автозапчастей использовать TezKyzmat для расширения аудитории и удобного взаимодействия с клиентами.",
	keywords:
		"TezKyzmat, продавцы автозапчастей, платформа автозапчастей, как продавать автозапчасти, TezKyzmat для продавцов, доставка автозапчастей, автозапчасти Кыргызстан",
	robots: "index, follow",
	authors: [{ name: "TezKyzmat Info" }],
	openGraph: {
		title: "TezKyzmat — Информация для продавцов автозапчастей",
		description:
			"Информационный сайт, который рассказывает продавцам автозапчастей, как работать с платформой TezKyzmat для роста продаж и удобного обслуживания клиентов.",
		url: "https://tezkyzmat-web.vercel.app/",
		type: "article",
	},
};

const Home = () => {
	return (
		<>
			<Head>
				<link rel="canonical" href="https://tezkyzmat-web.vercel.app/" />
				<meta name="author" content="TezKyzmat" />
				<meta
					name="description"
					content="Информационный сайт для продавцов автозапчастей. Узнайте, как расширить продажи через платформу TezKyzmat."
				/>
				<meta
					property="og:title"
					content="TezKyzmat — Информация для продавцов"
				/>
				<meta
					property="og:description"
					content="Узнайте, как продавцы автозапчастей могут использовать TezKyzmat для расширения аудитории и удобного взаимодействия с клиентами."
				/>
				<meta
					property="og:image"
					content="https://tezkyzmat.kg/og-sellers.jpg"
				/>
				<meta property="og:url" content="https://tezkyzmat-web.vercel.app/" />
				<meta property="og:type" content="article" />
			</Head>

			<Hero />
			<Service />
			<BusinessProblems />
			<Instruction />
			<Applications />
			<Reviews />
			<Group />
			<WeTeam />
			<Tariffs />
		</>
	);
};

export default Home;
