"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { IImage } from "@/models/types/web.types";

interface Props {
	images: IImage[];
	alt: string;
}

export default function Gallery({ images, alt }: Props) {
	if (!images.length) {
		return (
			<div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-[#F3F3F3] text-[#999]">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
					<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
					<circle cx="9" cy="10" r="1.5" fill="currentColor" />
					<path d="M21 16l-5-5-8 8" stroke="currentColor" strokeWidth="1.5" />
				</svg>
			</div>
		);
	}

	return (
		<div className="web-gallery self-start overflow-hidden rounded-2xl bg-[#F3F3F3]">
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={images.length > 1}
				pagination={images.length > 1 ? { clickable: true } : false}
				loop={images.length > 1}
				className="aspect-[4/3] w-full">
				{images.map((img, i) => (
					<SwiperSlide key={img.id}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={img.file}
							alt={i === 0 ? alt : `${alt} — фото ${i + 1}`}
							className="h-full w-full object-cover"
							loading={i === 0 ? "eager" : "lazy"}
							fetchPriority={i === 0 ? "high" : "auto"}
							decoding="async"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
