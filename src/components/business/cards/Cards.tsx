"use client";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import img1 from "@/assets/images/cards1.png";
import img2 from "@/assets/images/cards2.png";
import img3 from "@/assets/images/cards3.png";
import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";
import {
	INSTAGRAM_LINK,
	LOCATION_LINK,
	WHATSAPP_LINK,
} from "@/constants/constants";
import { HiLocationMarker } from "react-icons/hi";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { useTranslations } from "next-intl";
import useAos from "@/hooks/useAos";

const Cards = () => {
	const t = useTranslations("Cards");
	useAos();

	const cards = [
		{
			img: img1,
			title: t("title"),
			description: [
				{ desc: t("desc1") },
				{ desc: t("desc2") },
				{ desc: t("desc3") },
			],
		},
		{
			img: img2,
			title: t("title_2"),
			description: [
				{ desc: t("desc1_2") },
				{ desc: t("desc2_2") },
				{ desc: t("desc3_2") },
			],
		},
	];

	return (
		<section>
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-20">
					{cards.map((el, index) => (
						<div
							key={index}
							data-aos="fade-up"
						 
							className="bg-[#F2F2F2] flex flex-col gap-4 w-full p-4 rounded-[24px]">
							<div className="h-[225px] w-full relative overflow-hidden rounded-[12px]">
								<Image fill objectFit="cover" src={el.img} alt="img" />
							</div>
							<h1 className="md:text-[32px] text-[26px] font-[600]">
								{el.title}
							</h1>
							<div className="flex flex-col gap-2">
								{el.description.map((el, index) => (
									<Description key={index}>{el.desc}</Description>
								))}
							</div>
						</div>
					))}
					<div
						data-aos="fade-up"
				 
						className="bg-[#F2F2F2] flex flex-col gap-4 w-full p-4 rounded-[24px]">
						<div className="h-[225px] w-full relative overflow-hidden rounded-[12px]">
							<Image fill objectFit="cover" src={img3} alt="img" />
						</div>
						<h1 className="md:text-[32px] text-[26px] font-[600]">
							{t("contact")}
						</h1>
						<div className="flex flex-col gap-2">
							<Link
								href={LOCATION_LINK}
								target={"_blank"}
								className="text-[18px] font-[400] gap-2 flex items-center">
								<HiLocationMarker size={26} /> {t("location")}{" "}
								<GoArrowUpRight />
							</Link>

							<Link
								href={INSTAGRAM_LINK}
								target={"_blank"}
								className="text-[18px] font-[400] gap-2 flex items-center">
								<TbBrandInstagramFilled size={26} /> Instagram{" "}
								<GoArrowUpRight />
							</Link>

							<Link
								href={WHATSAPP_LINK}
								target={"_blank"}
								className="text-[18px] font-[400] gap-2 flex items-center">
								<RiWhatsappFill size={26} /> WhatsApp <GoArrowUpRight />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cards;
