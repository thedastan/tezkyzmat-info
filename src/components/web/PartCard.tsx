import Link from "next/link";
import type { IWebPartCard } from "@/models/types/web.types";
import { formatPrice } from "@/constants/web.constants";

interface Props {
	part: IWebPartCard;
	locale: string;
	priceOnRequestLabel: string;
}

export default function PartCard({ part, locale, priceOnRequestLabel }: Props) {
	const href = `/${locale}/p/${part.slug}-${part.id}`;
	const subtitle = [part.brand, part.brand_model].filter(Boolean).join(" ");

	return (
		<Link
			href={href}
			className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:shadow-md">
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F3F3]">
				{part.image ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={part.image}
						alt={part.name}
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
					/>
				) : null}
				{part.part_condition ? (
					<span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[12px] font-medium text-black">
						{part.part_condition}
					</span>
				) : null}
			</div>
			<div className="flex flex-1 flex-col gap-1 p-3">
				<p className="line-clamp-2 text-[14px] font-medium leading-[130%] text-black">
					{part.name}
				</p>
				{subtitle ? (
					<p className="line-clamp-1 text-[12px] text-[#777]">{subtitle}</p>
				) : null}
				<p className="mt-auto pt-1 text-[16px] font-semibold text-black">
					{part.price_hidden || part.price === null
						? priceOnRequestLabel
						: formatPrice(part.price, part.currency)}
				</p>
			</div>
		</Link>
	);
}
