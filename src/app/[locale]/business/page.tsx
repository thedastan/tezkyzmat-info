import Applications from "@/components/client/applications/Applications";
import BusinessProblems from "@/components/client/business-problems/BusinessProblems";
import Group from "@/components/client/group/Group";
import Hero from "@/components/client/hero/Hero";
import Instruction from "@/components/client/instruction/Instruction";
import Service from "@/components/client/service/Service";
import WeTeam from "@/components/client/we-team/WeTeam";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "TK Business — Заявки для вашего автобизнеса",
	description:
		"Узнайте, как продавцам автозапчастей использовать TK Business для расширения аудитории и удобного взаимодействия с клиентами.",
	url: "https://tezkyzmat.kg/ru/business",
	image: "https://tezkyzmat.kg/seo-img.png",
});

const BusinessPage = () => {
	return (
		<>
			<Hero />
			<Service />
			<BusinessProblems />
			<Instruction />
			<Applications />
			{/* <Reviews /> */}
			<Group />
			<WeTeam />
			{/* <Tariffs /> */}
		</>
	);
};

export default BusinessPage;
