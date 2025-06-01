"use client";
import { Title } from "@/components/ui/text/Title";
import icon1 from "@/assets/images/icon1cl.png";
import icon2 from "@/assets/images/icon2cl.png";
import icon3 from "@/assets/images/icon3cl.png";
import icon4 from "@/assets/images/icon4cl.png";

import Image from "next/image";
import { useTranslations } from "next-intl";

const BusinessProblems = () => {
	 
	const t = useTranslations("BusinessProblemscl");

	const card = [
		{
			icon: icon1,
			desc: t("desc1"),
		},
		{
			icon: icon2,
			desc: t("desc2"),
		},
		{
			icon: icon3,
			desc: t("desc3"),
		},
		{
			icon: icon4,
			desc: t("desc4"),
		},
	];
	 
	return (
		<section className="bg-white py-20">
			<div className="container">
				<Title className="text-center md:text-start">
					{t("title")}
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
