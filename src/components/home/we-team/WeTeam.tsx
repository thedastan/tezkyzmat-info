"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import img from "@/assets/images/we-team.png";

import img1 from "@/assets/images/project1.png";
import img2 from "@/assets/images/project2.png";
import { useTranslations } from "next-intl";

const WeTeam = () => {
	const t = useTranslations("WeTeam");

	const card = [
		{
			img: img1,
			span: t("block1.span"),
			desc: t("block1.desc"),
		},
		{
			img: img2,
			span: t("block2.span"),
			desc: t("block2.desc"),
		},
	];

	return (
		<section className="w-full py-10 bg-white">
			<div className="container">
				<div className="flex justify-between gap-4 sm:items-center items-start flex-col md:flex-row">
					<div className="flex md:max-w-[650px] max-w-[360px] w-full flex-col gap-5">
						<Title>{t("title")}</Title>
						<Description>{t("desc")}</Description>
					</div>
					<div className="max-w-[512px] md:mt-0 mt-2 w-full md:h-[600px] h-[268px] relative overflow-hidden rounded-[24px]">
						<Image src={img} fill objectFit="cover" alt="img" />
					</div>
				</div>
				<div className="flex flex-col items-center mt-20">
					<Title className="md:w-[550px] w-[300px] text-center">
						{t("title2")}
					</Title>
					<div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
						{card.map((el, index) => (
							<div
								key={index}
								className="bg-[#F2F2F2] w-full rounded-[20px] flex justify-start items-center flex-col p-6">
								<div className="w-full h-[280px] relative">
									<Image src={el.img} fill alt="img" objectFit="contain" />
								</div>
								<div className="w-full">
									<p className="md:text-[24px] text-[22px] text-[#000000]">
										{el.span}
									</p>
									<p
										className="md:text-[16px] mt-1 text-[16px] font-[400] leading-[140%] text-black"
										dangerouslySetInnerHTML={{ __html: el.desc }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WeTeam;
