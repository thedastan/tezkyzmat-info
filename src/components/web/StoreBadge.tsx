import Link from "next/link";
import type { IWebSellerShort } from "@/models/types/web.types";

interface Props {
	seller: IWebSellerShort;
	locale: string;
	goToStoreLabel: string;
}

export default function StoreBadge({ seller, locale, goToStoreLabel }: Props) {
	const place = [seller.market, seller.city].filter(Boolean).join(", ");
	return (
		<Link
			href={`/${locale}/s/${seller.slug}`}
			className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 transition hover:shadow-md">
			<div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#F3F3F3]">
				{seller.logo ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={seller.logo} alt={seller.name} className="h-full w-full object-cover" />
				) : null}
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-[15px] font-semibold text-black">{seller.name}</p>
				{place ? <p className="truncate text-[13px] text-[#777]">{place}</p> : null}
			</div>
			<span className="shrink-0 text-[13px] font-medium text-black underline-offset-2 hover:underline">
				{goToStoreLabel} →
			</span>
		</Link>
	);
}
