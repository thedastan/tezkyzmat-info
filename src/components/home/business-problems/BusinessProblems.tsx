"use client";
import { Title } from "@/components/ui/text/Title";
import icon1 from "@/assets/images/icon1.png";
import icon2 from "@/assets/images/icon2.png";
import icon3 from "@/assets/images/icon3.png";
import icon4 from "@/assets/images/icon4.png";

import Image from "next/image";
import { useLanguageStore } from "@/stores/useLanguageStore";

const BusinessProblems = () => {
	const { t } = useLanguageStore();

	const card = [
		{
			icon: icon1,
			desc: t("BusinessProblems.desc1"),
		},
		{
			icon: icon2,
			desc: t("BusinessProblems.desc2"),
		},
		{
			icon: icon3,
			desc: t("BusinessProblems.desc3"),
		},
		{
			icon: icon4,
			desc: t("BusinessProblems.desc4"),
		},
	];
	return (
		<section className="bg-white py-20">
			<div className="container">
				<Title className="text-center md:text-start">
					{t("BusinessProblems.title")}
				</Title>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-10 mt-10">
					{card.map((el, index) => (
						<div
							key={index}
							className="  w-full  flex justify-start md:items-start items-center md:flex-col flex-row gap-6">
							<Image width={56} height={56} src={el.icon} alt="img" />
							<p
								className="md:text-[16px] text-[16px] font-[400] leading-[140%] text-black"
								dangerouslySetInnerHTML={{ __html: el.desc }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BusinessProblems;
