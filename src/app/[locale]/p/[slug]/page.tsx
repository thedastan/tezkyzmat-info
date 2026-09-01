import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
	getPart,
	getSimilarParts,
	parsePartId,
	partPath,
	storePath,
} from "@/services/web/web.service";
import { formatPrice } from "@/constants/web.constants";
import { absUrl, jsonLd, webMetadata } from "@/lib/web-seo";
import Gallery from "@/components/web/Gallery";
import OpenInAppButton from "@/components/web/OpenInAppButton";
import StoreBadge from "@/components/web/StoreBadge";
import PartCard from "@/components/web/PartCard";
import Breadcrumbs from "@/components/web/Breadcrumbs";
import TrackView from "@/components/web/TrackView";
import type { IWebPart } from "@/models/types/web.types";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

/** «Радиатор Toyota Camry 50, 2012–2017, б/у» — марку/модель добавляем, только если их нет в названии */
const seoTitle = (p: IWebPart) => {
	const name = p.name.toLowerCase();
	const bits = [p.name];
	const brand = p.brand?.name;
	const model = p.brand_model?.name?.split(/[\s(]/)[0];
	const fit = [
		brand && !name.includes(brand.toLowerCase()) ? brand : null,
		model && !name.includes(model.toLowerCase()) ? p.brand_model?.name : null,
	]
		.filter(Boolean)
		.join(" ");
	if (fit) bits.push(fit);
	if (p.year_raw) bits.push(p.year_raw);
	if (p.part_condition?.name) bits.push(p.part_condition.name.toLowerCase());
	return bits.join(", ");
};

/** «Автомир Кудайберген, Бишкек» — не дублируем рынок, если он уже в названии магазина */
const storePlace = (p: IWebPart) => {
	const s = p.store;
	const market = s.market && !s.store_name.toLowerCase().includes(s.market.toLowerCase()) ? s.market : null;
	return [s.store_name, market, s.city].filter(Boolean).join(", ");
};

const priceText = (p: IWebPart, onRequest: string) =>
	p.price_hidden || p.price === null ? onRequest : formatPrice(p.price, p.currency);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const id = parsePartId(slug);
	const part = id ? await getPart(id) : null;
	const t = await getTranslations({ locale, namespace: "Web" });
	if (!part) {
		return webMetadata({
			locale,
			path: `/p/${slug}`,
			title: t("notFoundTitle"),
			description: t("notFoundText"),
			noindex: true,
		});
	}
	const path = partPath(part);
	const title = `${seoTitle(part)} — ${storePlace(part)}`;
	const description = [
		priceText(part, t("priceOnRequest")),
		part.part_condition?.name,
		part.manufacturer_country?.name,
		part.oem ? `OEM ${part.oem}` : null,
		part.summary,
	]
		.filter(Boolean)
		.join(" · ")
		.slice(0, 160);
	return webMetadata({
		locale,
		path,
		title,
		description,
		image: `${absUrl(locale, path)}/opengraph-image`,
		noindex: !part.is_active,
	});
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
	if (value === null || value === undefined || value === "") return null;
	return (
		<div className="flex justify-between gap-4 border-b border-black/5 py-2.5 text-[14px] last:border-0">
			<dt className="text-[#777]">{label}</dt>
			<dd className="text-right font-medium text-black">{value}</dd>
		</div>
	);
}

export default async function PartPage({ params }: Props) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const id = parsePartId(slug);
	if (!id) notFound();
	const part = await getPart(id);
	if (!part) notFound();

	const path = partPath(part);
	// Устаревший/чужой slug при верном id → 301 на канонический URL
	if (`/p/${slug}` !== path) permanentRedirect(`/${locale}${path}`);

	const t = await getTranslations("Web");
	const localePath = `/${locale}${path}`;
	const storeHref = `/${locale}${storePath(part.store)}`;
	const price = priceText(part, t("priceOnRequest"));

	// Неактивный товар: 410-сценарий — страница «недоступен» + ссылка на магазин
	if (!part.is_active) {
		return (
			<section className="container py-10 md:py-16">
				<div className="mx-auto max-w-[560px] rounded-2xl border border-black/5 p-6 text-center md:p-10">
					<h1 className="text-[22px] font-semibold text-black md:text-[28px]">
						{t("unavailableTitle")}
					</h1>
					<p className="mt-2 text-[15px] text-[#666]">{t("unavailableText")}</p>
					<div className="mt-6 flex flex-col gap-3">
						<Link
							href={storeHref}
							className="rounded-xl border border-black px-5 py-3 text-[15px] font-medium text-black hover:bg-black hover:text-white">
							{part.store.store_name} →
						</Link>
						<OpenInAppButton
							path={`/${locale}${storePath(part.store)}`}
							entity="store"
							entityId={part.store.id}
							locale={locale}
							variant="inline"
						/>
					</div>
				</div>
			</section>
		);
	}

	const similar = await getSimilarParts(part.id);

	const ld = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: part.name,
		image: part.images.map((i) => i.file),
		description: part.summary ?? undefined,
		sku: part.oem ?? undefined,
		mpn: part.oem ?? undefined,
		brand: part.brand ? { "@type": "Brand", name: part.brand.name } : undefined,
		itemCondition:
			part.part_condition?.name.toLowerCase().includes("нов") ||
			part.part_condition?.name.toLowerCase().includes("new")
				? "https://schema.org/NewCondition"
				: "https://schema.org/UsedCondition",
		offers:
			!part.price_hidden && part.price !== null
				? {
						"@type": "Offer",
						url: absUrl(locale, path),
						priceCurrency: part.currency,
						price: part.price,
						availability: "https://schema.org/InStock",
						seller: { "@type": "Organization", name: part.store.store_name },
				  }
				: undefined,
	};

	const crumbs = [
		{ name: t("home"), href: `/${locale}` },
		{ name: part.store.store_name, href: storeHref },
		...(part.category ? [{ name: part.category.name }] : []),
		{ name: part.name },
	];

	const fit = [part.brand?.name, part.brand_model?.name].filter(Boolean).join(" ");

	return (
		<article className="container pb-[96px] pt-4 md:pb-8 md:pt-8">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
			<TrackView entity="part" entityId={part.id} locale={locale} />
			<Breadcrumbs items={crumbs} />

			<div className="grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
				<Gallery images={part.images} alt={part.name} />

				<div className="flex flex-col gap-5">
					<div>
						<h1 className="text-[22px] font-semibold leading-[125%] text-black md:text-[28px]">
							{part.name}
						</h1>
						{fit || part.year_raw ? (
							<p className="mt-1 text-[14px] text-[#777]">
								{[fit, part.year_raw].filter(Boolean).join(" · ")}
							</p>
						) : null}
					</div>

					<div className="flex items-baseline gap-3">
						<span className="text-[28px] font-bold text-black md:text-[32px]">{price}</span>
						{part.old_price && !part.price_hidden ? (
							<span className="text-[16px] text-[#999] line-through">
								{formatPrice(part.old_price, part.currency)}
							</span>
						) : null}
					</div>

					<OpenInAppButton path={localePath} entity="part" entityId={part.id} locale={locale} />

					<StoreBadge
						store={part.store}
						locale={locale}
						partsLabel={t("parts")}
						goToStoreLabel={t("goToStore")}
					/>

					<section>
						<h2 className="mb-1 text-[16px] font-semibold text-black">{t("attributes")}</h2>
						<dl>
							<Row label={t("category")} value={part.category?.name} />
							<Row label={t("brand")} value={part.brand?.name} />
							<Row label={t("model")} value={part.brand_model?.name} />
							<Row label={t("years")} value={part.year_raw} />
							<Row label={t("condition")} value={part.part_condition?.name} />
							<Row label={t("country")} value={part.manufacturer_country?.name} />
							<Row label={t("oem")} value={part.oem} />
							{part.item_kind !== "part" ? (
								<>
									<Row
										label={t("diameter")}
										value={part.wheel_diameter ? `R${part.wheel_diameter}` : null}
									/>
									<Row label={t("season")} value={part.tyre_season} />
									<Row label={t("pcd")} value={part.wheel_pcd} />
								</>
							) : null}
						</dl>
					</section>

					{part.summary ? (
						<section>
							<h2 className="mb-1 text-[16px] font-semibold text-black">{t("description")}</h2>
							<p className="whitespace-pre-line text-[15px] leading-[150%] text-[#333]">
								{part.summary}
							</p>
						</section>
					) : null}
				</div>
			</div>

			{similar.length ? (
				<section className="mt-10">
					<div className="mb-3 flex items-baseline justify-between">
						<h2 className="text-[18px] font-semibold text-black md:text-[22px]">{t("similar")}</h2>
						<Link href={storeHref} className="text-[14px] text-[#777] hover:text-black hover:underline">
							{t("allParts")} →
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
						{similar.map((s) => (
							<PartCard key={s.id} part={s} locale={locale} priceOnRequestLabel={t("priceOnRequest")} />
						))}
					</div>
				</section>
			) : null}
		</article>
	);
}
