"use client";
import { Title } from "@/components/ui/text/Title";
import service1 from "@/assets/images/service1.png";
import service2 from "@/assets/images/service2.png";
import Image from "next/image";
import { useLanguageStore } from "@/stores/useLanguageStore";

const Service = () => {
	const { t } = useLanguageStore();

	const card = [
		{
			img: service1,
			span: t("Servicecl.span1"),
			desc: t("Servicecl.desc1"),
		},
		{
			img: service2,
			span: t("Servicecl.span2"),
			desc: t("Servicecl.desc2"),
		} 
	];

	return (
		<section id="forwhom" className="bg-white py-20">
			<div className="container">
				<Title>{t("Servicecl.title")}</Title>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
					{card.map((el, index) => (
						<div
							key={index}
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
