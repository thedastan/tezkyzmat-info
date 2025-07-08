"use client";
import { Title } from "@/components/ui/text/Title";
import img1 from "@/assets/images/applications3cl_new2.jpg";
import img2 from "@/assets/images/applications2cl.png";
import img3 from "@/assets/images/applications3cl.png";

import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
	{
		img: img1,
	},
	{
		img: img2,
	},
	{
		img: img3,
	},
];

const Applications = () => {
	const t = useTranslations("Applicationscl");

	return (
		<section className="py-20 w-full">
			<div className="container">
				<div className="w-full flex flex-col justify-center items-center">
					<Title className="text-center">{t("title")}</Title>
				</div>

				<div className="gap-3 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{images.map((el, index) => (
						<div
							key={index}
							data-aos="fade-up"
							data-aos-delay={index * 200}
							className=" overflow-hidden bg-[#F2F2F2] rounded-[20px] w-full h-[400px] flex justify-center items-end">
							<div className=" relative w-[233px] h-[330px]">
								<div className="w-[222px] h-[330px] bg-[#DDDDDD] absolute right-4 rounded-tr-[20px] rounded-tl-[20px] " />
								<Image
									className="mt-3 rounded-tr-[30px] rounded-tl-[30px]"
									fill
									objectFit="contain"
									src={el.img}
									alt="img"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Applications;
