import Link from "next/link";
import type { IWebDismantleCarCard } from "@/models/types/web.types";

interface Props {
	car: IWebDismantleCarCard;
	locale: string;
}

/** Карточка авто на разбор для блока «похожие». Цены нет — только марка/модель. */
export default function DismantleCard({ car, locale }: Props) {
	const href = `/${locale}/d/${car.slug}-${car.id}`;
	const title = [car.brand, car.brand_model].filter(Boolean).join(" ");

	return (
		<Link
			href={href}
			className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:shadow-md">
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F3F3]">
				{car.image ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={car.image}
						alt={title}
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
					/>
				) : null}
				{car.status_title ? (
					<span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[12px] font-medium text-black">
						{car.status_title}
					</span>
				) : null}
			</div>
			<div className="flex flex-1 flex-col gap-1 p-3">
				<p className="line-clamp-2 text-[14px] font-medium leading-[130%] text-black">
					{title}
				</p>
				{car.year ? (
					<p className="line-clamp-1 text-[12px] text-[#777]">{car.year}</p>
				) : null}
			</div>
		</Link>
	);
}
