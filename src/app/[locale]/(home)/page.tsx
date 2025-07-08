// import Applications from "@/components/business/applications/Applications";
// import BusinessProblems from "@/components/business/business-problems/BusinessProblems";
import Cards from "@/components/business/cards/Cards";
// import Hero from "@/components/business/hero/Hero";
// import Instruction from "@/components/business/instruction/Instruction";
import Order from "@/components/business/order/Order";
// import Service from "@/components/business/service/Service";
import Shop from "@/components/business/shop/Shop";
import Group from "@/components/client/group/Group";
import WeTeam from "@/components/client/we-team/WeTeam";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "Что такое TezKyzmat — Удобный сервис для поиска автозапчастей",
	description:
		"Узнайте, как работает TezKyzmat — сервис, который помогает клиентам находить автозапчасти быстро и удобно. Платформа соединяет клиентов с продавцами.",
	url: "https://tezkyzmat-web.vercel.app/client",
	image: "https://tezkyzmat-web.vercel.app/seo-img.png",
});

const Home = () => {
	return (
		<>
			{/* <Hero /> */}
			{/* <Service /> */}
			{/* <BusinessProblems /> */}
			{/* <Instruction /> */}
			{/* <Applications /> */}

			{/* // */}
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

export default Home;
