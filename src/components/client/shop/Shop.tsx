"use client";

import { Description } from "@/components/ui/text/Description";
import img1 from "@/assets/images/shop.jpg";
import img2 from "@/assets/images/shop2.png";
import { useLanguageStore } from "@/stores/useLanguageStore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Shop = () => {
	const { t } = useLanguageStore();

	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const slides = [
		{
			img: img2.src,
			titleKey: "Shop.title",
			descKey: "Shop.desc",
		},
		{
			img: img1.src,
			titleKey: "Shop.title",
			descKey: "Shop.desc",
		} 
	];

	return (
		<section>
			<div className="container">
				<div className="relative">
					<Swiper
						modules={[Navigation]}
						navigation={{
							prevEl: prevRef.current,
							nextEl: nextRef.current,
						}}
						onBeforeInit={(swiper) => {
							if (
								swiper.params.navigation &&
								typeof swiper.params.navigation === "object"
							) {
								swiper.params.navigation.prevEl = prevRef.current;
								swiper.params.navigation.nextEl = nextRef.current;
							}
						}}
						slidesPerView={1}
						loop={true}
						className="w-full">
						{slides.map(({ img, titleKey, descKey }, index) => (
							<SwiperSlide key={index}>
								<div
									style={{
										backgroundImage: `url(${img})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
									}}
									className="w-full flex justify-start items-start h-[630px] rounded-[20px] md:p-10 p-0">
									<div className="  bg-[#000000bd] md:w-[520px] w-full md:h-[200px] h-[100%] rounded-[20px] md:p-4 p-4 flex flex-col md:justify-center gap-4 md:gap-0 justify-center items-start">
										<h1 className="text-white md:text-[32px] text-[24px] font-[700] leading-[120%]">
											{t(titleKey)}
										</h1>
										<Description className="text-white md:mt-4 mt-0 w-full max-w-[400px]">
											{t(descKey)}
										</Description>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Arrows */}
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 z-10">
						<button
							ref={prevRef}
							className="text-white text-2xl bg-black/60 border border-black hover:bg-black/60 p-2 rounded-[10px] transition">
							<MdArrowBackIosNew />
						</button>
						<button
							ref={nextRef}
							className="text-white text-2xl bg-black/60 border border-black hover:bg-black/60 p-2 rounded-[10px] transition">
							<MdArrowForwardIos />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Shop;
