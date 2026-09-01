import Link from "next/link";
import type { IWebStoreShort } from "@/models/types/web.types";

interface Props {
	store: IWebStoreShort;
	locale: string;
	partsLabel: string;
	goToStoreLabel: string;
}

export default function StoreBadge({ store, locale, partsLabel, goToStoreLabel }: Props) {
	const place = [store.market, store.city].filter(Boolean).join(", ");
	return (
		<Link
			href={`/${locale}/s/${store.slug}`}
			className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 transition hover:shadow-md">
			<div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#F3F3F3]">
				{store.logo ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={store.logo} alt={store.store_name} className="h-full w-full object-cover" />
				) : null}
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-[15px] font-semibold text-black">{store.store_name}</p>
				<p className="truncate text-[13px] text-[#777]">
					{place}
					{place && store.parts_count ? " · " : ""}
					{store.parts_count ? `${store.parts_count} ${partsLabel}` : ""}
				</p>
			</div>
			<span className="shrink-0 text-[13px] font-medium text-black underline-offset-2 hover:underline">
				{goToStoreLabel} →
			</span>
		</Link>
	);
}
