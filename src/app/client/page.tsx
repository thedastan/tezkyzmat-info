import Applications from "@/components/client/applications/Applications";
import BusinessProblems from "@/components/client/business-problems/BusinessProblems";
import Cards from "@/components/client/cards/Cards";
import Hero from "@/components/client/hero/Hero";
import Instruction from "@/components/client/instruction/Instruction";
import Order from "@/components/client/order/Order";
import Reviews from "@/components/client/reviews/Reviews";
import Service from "@/components/client/service/Service";
import Shop from "@/components/client/shop/Shop";
import Group from "@/components/home/group/Group";
import WeTeam from "@/components/home/we-team/WeTeam";
import React from "react";

const ClientPage = () => {
	return (
		<div>
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
		</div>
	);
};

export default ClientPage;
