"use client";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import img1 from "@/assets/images/instruction1cl.png";
import img2 from "@/assets/images/instruction2cl.png";
import { useTranslations } from "next-intl";

const Instruction = () => {
	const t = useTranslations("Instructioncl");

	const data = [
		{
			id: "advantages",
			image: img1,
			title: t("solution.title"), // содержит <br /> если нужно
			description: [
				{ desc: t("solution.description.0") },
				{ desc: t("solution.description.1") },
				{ desc: t("solution.description.2") },
			],
		},
		{
			id: "solution",
			image: img2,
			title: t("advantages.title"),
			description: [
				{ desc: t("advantages.description.0") },
				{ desc: t("advantages.description.1") },
				{ desc: t("advantages.description.2") },
			],
		},
	];

	return (
		<section className="bg-[#1C1C1C] py-20 rounded-tl-[40px] rounded-tr-[40px]">
			<div className="container">
				<div className="flex flex-col gap-24">
					{data.map((el, index) => (
						<div
							id={el.id}
							key={index}
							className={`flex justify-between items-center md:gap-4 gap-8 flex-col ${
								index % 2 == 0 ? "md:flex-row-reverse" : "md:flex-row"
							}`}>
							<div className="md:max-w-[550px] max-w-[500px] w-full">
								<h1
									data-aos="fade-up"
									className="text-white md:text-[48px] text-[26px] font-[700] leading-[120%] "
									dangerouslySetInnerHTML={{ __html: el.title }}
								/>
								<div className="flex flex-col gap-4 mt-6">
									{el.description.map((item, index) => (
										<div
											key={index}
											data-aos="fade-up"
											data-aos-delay={index * 200}
											className="flex items-center gap-3  ">
											<h1 className="bg-[#FADD13] flex rounded-[50px] p-1">
												<FaCheck />
											</h1>
											<Description className="text-white">
												{item.desc}
											</Description>
										</div>
									))}
								</div>
							</div>
							<div
								data-aos="fade-up"
								className="md:max-w-[600px] max-w-[500px] w-full md:h-[520px] sm:h-[420px]  h-[320px]   relative">
								<Image
									src={el.image}
									objectFit="contain"
									fill
									alt="image-mobile"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Instruction;
