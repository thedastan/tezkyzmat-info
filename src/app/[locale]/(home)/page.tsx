import Applications from "@/components/business/applications/Applications";
import BusinessProblems from "@/components/business/business-problems/BusinessProblems";
import Cards from "@/components/business/cards/Cards";
import Hero from "@/components/business/hero/Hero";
import Instruction from "@/components/business/instruction/Instruction";
import Service from "@/components/business/service/Service";
import Shop from "@/components/business/shop/Shop";
import Group from "@/components/client/group/Group";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
	title: "Tez Kyzmat — быстрый поиск автозапчастей и автосервисов",
	description: "Узнайте, как работает TezKyzmat — сервис, который помогает клиентам находить автозапчасти быстро и удобно. Платформа соединяет клиентов с продавцами.",
	url: "https://www.tezkyzmat.kg/",
	image: "https://www.tezkyzmat.kg/seo-img.png",
});

const Home = () => {
	return (
		<>
			<Hero />
			<Service />
			<BusinessProblems />

			<Instruction />
			<Applications />

			{/* // */}
			{/* <Reviews /> */}

			{/* // */}

			<Shop />
			<Cards />

			{/* // */}

			<Group />
		</>
	);
};

export default Home;
