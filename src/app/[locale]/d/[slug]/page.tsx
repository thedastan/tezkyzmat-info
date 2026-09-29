import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
	dismantlePath,
	getDismantleCar,
	getSimilarDismantleCars,
	parsePartId,
	storePath,
} from "@/services/web/web.service";
import { absUrl, jsonLd, webMetadata } from "@/lib/web-seo";
import Gallery from "@/components/web/Gallery";
import OpenInAppButton from "@/components/web/OpenInAppButton";
import StoreBadge from "@/components/web/StoreBadge";
import DismantleCard from "@/components/web/DismantleCard";
import Breadcrumbs from "@/components/web/Breadcrumbs";
import TrackView from "@/components/web/TrackView";
import type { IWebDismantleCar } from "@/models/types/web.types";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

/** «Toyota Camry 50, 2012–2017» — марка + модель + годы */
const carTitle = (c: IWebDismantleCar) =>
	[c.brand, c.brand_model].filter(Boolean).join(" ") || "Авто на разбор";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const id = parsePartId(slug);
	const car = id ? await getDismantleCar(id) : null;
	const t = await getTranslations({ locale, namespace: "Web" });
	if (!car) {
		return webMetadata({
			locale,
			path: `/d/${slug}`,
			title: t("notFoundTitle"),
			description: t("notFoundText"),
			noindex: true,
		});
	}
	const title = [
		carTitle(car),
		car.year_raw,
		t("dismantleCars").toLowerCase(),
	]
		.filter(Boolean)
		.join(", ");
	const description = [
		car.volume ? `${car.volume} ${t("volume").toLowerCase()}` : null,
		car.mileage_title,
		car.steering_title,
		car.location_title,
		car.description,
	]
		.filter(Boolean)
		.join(" · ")
		.slice(0, 160);
	return webMetadata({
		locale,
		path: dismantlePath(car),
		title,
		description,
		image: car.images[0]?.file,
		noindex: !car.is_active,
	});
}

export default async function DismantleCarPage({ params }: Props) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const id = parsePartId(slug);
	if (!id) notFound();
	const car = await getDismantleCar(id);
	if (!car) notFound();

	const path = dismantlePath(car);
	// Устаревший/чужой slug при верном id → 301 на канонический URL
	if (`/d/${slug}` !== path) permanentRedirect(`/${locale}${path}`);

	const t = await getTranslations("Web");
	const localePath = `/${locale}${path}`;
	const title = carTitle(car);
	const storeHref = car.store ? `/${locale}${storePath(car.store)}` : null;

	// Неактивное авто: страница «недоступно» + ссылка на магазин/приложение
	if (!car.is_active) {
		return (
			<section className="container py-10 md:py-16">
				<div className="mx-auto max-w-[560px] rounded-2xl border border-black/5 p-6 text-center md:p-10">
					<h1 className="text-[22px] font-semibold text-black md:text-[28px]">
						{t("carUnavailableTitle")}
					</h1>
					<p className="mt-2 text-[15px] text-[#666]">{t("carUnavailableText")}</p>
					<div className="mt-6 flex flex-col gap-3">
						{car.store && storeHref ? (
							<Link
								href={storeHref}
								className="rounded-xl border border-black px-5 py-3 text-[15px] font-medium text-black hover:bg-black hover:text-white">
								{car.store.store_name} →
							</Link>
						) : null}
						<OpenInAppButton
							path={localePath}
							entity="dismantle"
							entityId={car.id}
							locale={locale}
							variant="inline"
						/>
					</div>
				</div>
			</section>
		);
	}

	const similar = await getSimilarDismantleCars(car.id);

	const ld = {
		"@context": "https://schema.org",
		"@type": "Car",
		name: title,
		image: car.images.map((i) => i.file),
		description: car.description ?? undefined,
		brand: car.brand ? { "@type": "Brand", name: car.brand } : undefined,
		model: car.brand_model ?? undefined,
		url: absUrl(locale, path),
	};

	const crumbs = [
		{ name: t("home"), href: `/${locale}` },
		{ name: t("dismantleCars") },
		...(storeHref && car.store
			? [{ name: car.store.store_name, href: storeHref }]
			: []),
		{ name: title },
	];

	const subtitle = [
		car.year_raw,
		car.volume ? `${car.volume} л` : null,
		car.country,
	]
		.filter(Boolean)
		.join(" · ");

	return (
		<article className="container pb-[96px] pt-4 md:pb-8 md:pt-8">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
			<TrackView entity="dismantle" entityId={car.id} locale={locale} />
			<Breadcrumbs items={crumbs} />

			<div className="grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
				<Gallery images={car.images} alt={title} />

				<div className="flex flex-col gap-5">
					<div>
						<h1 className="text-[22px] font-semibold leading-[125%] text-black md:text-[28px]">
							{title}
						</h1>
						{subtitle ? (
							<p className="mt-1 text-[14px] text-[#777]">{subtitle}</p>
						) : null}
					</div>

					{car.status_title ? (
						<div className="flex flex-wrap gap-2">
							<span className="rounded-full bg-[#F3F3F3] px-3 py-1 text-[13px] font-medium text-black">
								{car.status_title}
							</span>
							{car.location_title ? (
								<span className="rounded-full bg-[#F3F3F3] px-3 py-1 text-[13px] text-[#555]">
									{car.location_title}
								</span>
							) : null}
						</div>
					) : null}

					<OpenInAppButton path={localePath} entity="dismantle" entityId={car.id} locale={locale} />

					{car.store && storeHref ? (
						<StoreBadge
							store={car.store}
							locale={locale}
							partsLabel={t("parts")}
							goToStoreLabel={t("goToStore")}
						/>
					) : null}

					<section>
						<h2 className="mb-1 text-[16px] font-semibold text-black">{t("attributes")}</h2>
						<dl>
							<Row label={t("brand")} value={car.brand} />
							<Row label={t("model")} value={car.brand_model} />
							<Row label={t("years")} value={car.year_raw} />
							<Row label={t("volume")} value={car.volume ? `${car.volume} л` : null} />
							<Row label={t("mileage")} value={car.mileage_title} />
							<Row label={t("steering")} value={car.steering_title} />
							<Row label={t("condition")} value={car.condition_title} />
							<Row label={t("country")} value={car.country} />
							<Row label={t("status")} value={car.status_title} />
							<Row label={t("location")} value={car.location_title} />
						</dl>
					</section>

					{car.description ? (
						<section>
							<h2 className="mb-1 text-[16px] font-semibold text-black">{t("description")}</h2>
							<p className="whitespace-pre-line text-[15px] leading-[150%] text-[#333]">
								{car.description}
							</p>
						</section>
					) : null}
				</div>
			</div>

			{similar.length ? (
				<section className="mt-10">
					<div className="mb-3 flex items-baseline justify-between">
						<h2 className="text-[18px] font-semibold text-black md:text-[22px]">{t("similar")}</h2>
					</div>
					<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
						{similar.map((s) => (
							<DismantleCard key={s.id} car={s} locale={locale} />
						))}
					</div>
				</section>
			) : null}
		</article>
	);
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
	if (value === null || value === undefined || value === "") return null;
	return (
		<div className="flex justify-between gap-4 border-b border-black/5 py-2 text-[14px] last:border-0">
			<dt className="text-[#777]">{label}</dt>
			<dd className="text-right font-medium text-black">{value}</dd>
		</div>
	);
}
