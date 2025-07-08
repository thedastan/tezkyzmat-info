import Applications from "@/components/client/applications/Applications";
import BusinessProblems from "@/components/client/business-problems/BusinessProblems";
import Cards from "@/components/client/cards/Cards";
import Hero from "@/components/client/hero/Hero";
import Instruction from "@/components/client/instruction/Instruction";
import Order from "@/components/client/order/Order";
import Service from "@/components/client/service/Service";
import Shop from "@/components/client/shop/Shop";
import Group from "@/components/home/group/Group";
import WeTeam from "@/components/home/we-team/WeTeam";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "Что такое TezKyzmat — Удобный сервис для поиска автозапчастей",
	description:
		"Узнайте, как работает TezKyzmat — сервис, который помогает клиентам находить автозапчасти быстро и удобно. Платформа соединяет клиентов с продавцами.",
	url: "https://tezkyzmat-web.vercel.app/client",
	image: "https://tezkyzmat-web.vercel.app/seo-img.png",
});

const ClientPage = () => {
	return (
		<>
			<Hero />
			<Service />
			<BusinessProblems />
			<Instruction />
			<Applications />
			{/* <Reviews /> */}

			{/* // */}

			<Order />
			<Shop />
			<Cards />

			{/* // */}

			<Group />
			<WeTeam />
		</>
	);
};

export default ClientPage;
