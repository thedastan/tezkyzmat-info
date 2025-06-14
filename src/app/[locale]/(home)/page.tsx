import Applications from "@/components/home/applications/Applications";
import BusinessProblems from "@/components/home/business-problems/BusinessProblems";
import Group from "@/components/home/group/Group";
import Hero from "@/components/home/hero/Hero";
import Instruction from "@/components/home/instruction/Instruction";
import Reviews from "@/components/home/reviews/Reviews";
import Service from "@/components/home/service/Service";
import Tariffs from "@/components/home/tariffs/Tariffs";
import WeTeam from "@/components/home/we-team/WeTeam";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "TezKyzmat — Информационный сайт для продавцов автозапчастей",
	description:
		"Узнайте, как продавцам автозапчастей использовать TezKyzmat для расширения аудитории и удобного взаимодействия с клиентами.",
	url: "https://tezkyzmat-web.vercel.app/",
	image: "https://tezkyzmat-web.vercel.app/seo-img.png",
});

const Home = () => {
	return (
		<>
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
