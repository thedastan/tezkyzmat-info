"use client";
import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import reviews1 from "@/assets/images/Reviews1.png";
import reviews2 from "@/assets/images/Reviews2.png";
import reviewsava1 from "@/assets/images/Reviews-ava.png";
import reviewsava2 from "@/assets/images/Reviews-ava2.png";
import { Description } from "@/components/ui/text/Description";
import { FaPlay } from "react-icons/fa";
import { useLanguageStore } from "@/stores/useLanguageStore";

const Reviews = () => {
	const { t } = useLanguageStore();

	return (
		<section id="reviews">
			<Title className="text-center">{t("Reviews.title")}</Title>
			<div
				className="w-full overflow-x-auto mt-10 px-[calc((100%-1300px)/2)]"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}>
				<div className="flex w-full flex-nowrap gap-4 px-4  ">
					{/* Карточка с видео и текстом */}
					<div className="flex-shrink-0  w-[310px] h-[462px] bg-[#F6F2D1] rounded-[23px] overflow-hidden">
						<div className="relative w-full h-[232px]">
							<Image fill className="object-cover" src={reviews1} alt="img" />
							<button className="bg-black p-3 rounded-full absolute z-10 text-white text-[18px] bottom-2 left-2">
								<FaPlay />
							</button>
						</div>
						<div className="flex flex-col p-6 gap-2">
							<h1 className="text-[24px] font-bold">{t("Reviews.card1_name")}</h1>
							<Description className="text-[#2A4A45] text-[16px]">
							{t("Reviews.card1_desc")}
								 
							</Description>
						</div>
					</div>

					{/* Карточка с аватаром и текстом */}
					<div className="flex-shrink-0  w-[300px] h-[390px] p-6 bg-[#F2F2F2] rounded-[23px]">
						<div className="flex items-center gap-3">
							<Image width={50} height={50} src={reviewsava1} alt="ava" />
							<div>
								<h2 className="text-[15px] font-bold">{t("Reviews.card2_name")}</h2>
								<p className="text-[12px] text-[#6F6A6A]">
								 {t("Reviews.card2_span")}
								</p>
							</div>
						</div>
						<Description className="mt-4 text-[16px]">
						{t("Reviews.card2_desc")}
						</Description>
					</div>

					{/* Видео-карточка */}
					<div className="flex-shrink-0  w-[310px] h-[414px] mt-12 rounded-[23px] overflow-hidden relative flex justify-center items-center">
						<Image src={reviews2} fill className="object-cover" alt="img" />
						<button className="bg-black p-3 rounded-full absolute z-10 text-white text-[18px]">
							<FaPlay />
						</button>
					</div>

					{/* Вторая карточка с аватаром */}
					<div className="flex-shrink-0  w-[300px] h-[375px] mt-32 p-6 bg-[#F9F5E6] rounded-[23px]">
						<div className="flex items-center gap-3">
							<Image width={50} height={50} src={reviewsava2} alt="ava" />
							<div>
								<h2 className="text-[15px] font-bold">{t("Reviews.card4_name")}</h2>
								<p className="text-[12px] text-[#6F6A6A]">
								{t("Reviews.card4_span")}
								</p>
							</div>
						</div>
						<Description className="mt-4 text-[16px]">
						{t("Reviews.card4_desc")}
						</Description>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Reviews;
