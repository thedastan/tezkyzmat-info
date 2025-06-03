import Applications from "@/components/client/applications/Applications";
import BusinessProblems from "@/components/client/business-problems/BusinessProblems";
import Cards from "@/components/client/cards/Cards";
import Hero from "@/components/client/hero/Hero";
import Instruction from "@/components/client/instruction/Instruction";
import Order from "@/components/client/order/Order";
import Service from "@/components/client/service/Service";
import Shop from "@/components/client/shop/Shop";
import Group from "@/components/home/group/Group";
import Reviews from "@/components/home/reviews/Reviews";
import WeTeam from "@/components/home/we-team/WeTeam";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
	title: "Что такое TezKyzmat — Удобный сервис для поиска автозапчастей",
	description:
		"Узнайте, как работает TezKyzmat — сервис, который помогает клиентам находить автозапчасти быстро и удобно. Платформа соединяет клиентов с продавцами.",
	keywords:
		"TezKyzmat, автозапчасти, поиск запчастей, как работает TezKyzmat, TezKyzmat для клиентов, доставка автозапчастей, TezKyzmat Бишкек, автосервис",
	robots: "index, follow",
	authors: [{ name: "TezKyzmat Info" }],
	openGraph: {
		title: "TezKyzmat — Сервис для поиска автозапчастей",
		description:
			"TezKyzmat — информационная платформа, которая объясняет, как быстро и удобно найти автозапчасти и оформить заказ у продавцов.",
		url: "https://tezkyzmat-web.vercel.app/client",
		type: "article",
	},
};

const ClientPage = () => {
	return (
		<>
			<Head>
				<link rel="canonical" href="https://tezkyzmat-web.vercel.app/client" />
				<meta name="author" content="TezKyzmat" />
				<meta
					name="description"
					content="Узнайте, как клиенты находят и заказывают автозапчасти с помощью платформы TezKyzmat. Подробная информация, преимущества, отзывы."
				/>
				<meta
					property="og:title"
					content="TezKyzmat — Информация для клиентов"
				/>
				<meta
					property="og:description"
					content="Информационный сайт о том, как пользоваться платформой TezKyzmat для поиска и заказа автозапчастей."
				/>
				<meta
					property="og:image"
					content="https://tezkyzmat.kg/og-client.jpg"
				/>
				<meta property="og:url" content="https://tezkyzmat-web.vercel.app/client" />
				<meta property="og:type" content="article" />
			</Head>

			<Hero />
			<Service />
			<BusinessProblems />
			<Instruction />
			<Applications />
			<Reviews />

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
