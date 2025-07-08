"use client";
import { Title } from "@/components/ui/text/Title";
import service1 from "@/assets/images/service1.png";
import service2 from "@/assets/images/service2.png";
import service3 from "@/assets/images/service3.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import useAos from "@/hooks/useAos";

const Service = () => {
 
	const t = useTranslations("Service");

	useAos()

	const card = [
		{
			img: service1,
			span: t("span1"),
			desc: t("desc1"),
		},
		{
			img: service2,
			span: t("span2"),
			desc: t("desc2"),
		},
		{
			img: service3,
			span: t("span3"),
			desc: t("desc3"),
		},
	];

	return (
		<section  id="forwhom" className="bg-white py-20">
			<div className="container">
				<Title>{t("title")}</Title>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
					{card.map((el, index) => (
						<div
							key={index}
							data-aos="fade-up"
							data-aos-delay={index * 200}
							className="bg-[#F2F2F2] w-full rounded-[20px] flex justify-start items-center flex-col p-6">
							<div className="w-[300px] h-[280px] relative">
								<Image src={el.img} fill objectFit="contain" alt="img" />
							</div>
							<div className="w-full">
								<p className="text-[14px] text-[#8F8F95]">{el.span}</p>
								<p
									className="md:text-[16px] text-[16px] font-[400] leading-[140%] text-black"
									dangerouslySetInnerHTML={{ __html: el.desc }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Service;
