import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
	getStore,
	getStoreParts,
	storePath,
	STORE_PARTS_LIMIT,
} from "@/services/web/web.service";
import { absUrl, jsonLd, webMetadata } from "@/lib/web-seo";
import OpenInAppButton from "@/components/web/OpenInAppButton";
import PartCard from "@/components/web/PartCard";
import Breadcrumbs from "@/components/web/Breadcrumbs";
import TrackView from "@/components/web/TrackView";

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)

interface Props {
	params: Promise<{ locale: string; slug: string }>;
	searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const { page } = await searchParams;
	const store = await getStore(slug);
	const t = await getTranslations({ locale, namespace: "Web" });
	if (!store) {
		return webMetadata({
			locale,
			path: `/s/${slug}`,
			title: t("notFoundTitle"),
			description: t("notFoundText"),
			noindex: true,
		});
	}
	const place = store.addresses
		.map((a) => [a.market, a.city].filter(Boolean).join(", "))
		.filter(Boolean)[0];
	const cats = store.categories.map((c) => c.name).slice(0, 4).join(", ");
	const brands = store.brands.map((b) => b.name).slice(0, 5).join(", ");
	const title = `${store.store_name}${place ? ` — ${place}` : ""}`;
	const description = [
		store.parts_count ? `${store.parts_count} ${t("parts")}` : null,
		cats,
		brands,
		store.description,
	]
		.filter(Boolean)
		.join(" · ")
		.slice(0, 160);
	return webMetadata({
		locale,
		path: storePath(store),
		title: page && page !== "1" ? `${title} — ${t("page")} ${page}` : title,
		description,
		image: store.images[0]?.file || store.logo,
		noindex: !store.is_active || (!!page && page !== "1"),
	});
}

export default async function StorePage({ params, searchParams }: Props) {
	const { locale, slug } = await params;
	const { page: pageRaw } = await searchParams;
	setRequestLocale(locale);

	const store = await getStore(slug);
	if (!store || !store.is_active) notFound();

	const page = Math.max(1, Number(pageRaw) || 1);
	const [t, parts] = await Promise.all([
		getTranslations("Web"),
		getStoreParts(slug, page, STORE_PARTS_LIMIT),
	]);

	const path = storePath(store);
	const localePath = `/${locale}${path}`;
	const total = parts?.total ?? 0;
	const pages = Math.max(1, Math.ceil(total / STORE_PARTS_LIMIT));
	const addr = store.addresses[0];

	const ld = {
		"@context": "https://schema.org",
		"@type": "AutoPartsStore",
		name: store.store_name,
		url: absUrl(locale, path),
		image: [store.logo, ...store.images.map((i) => i.file)].filter(Boolean),
		description: store.description ?? undefined,
		address: addr
			? {
					"@type": "PostalAddress",
					streetAddress: [addr.market, addr.street].filter(Boolean).join(", ") || undefined,
					addressLocality: addr.city ?? undefined,
					addressRegion: addr.region ?? undefined,
					addressCountry: "KG",
			  }
			: undefined,
		aggregateRating:
			store.rating && store.reviews_count
				? {
						"@type": "AggregateRating",
						ratingValue: store.rating,
						reviewCount: store.reviews_count,
				  }
				: undefined,
	};

	return (
		<article className="container pb-[96px] pt-4 md:pb-8 md:pt-8">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
			<TrackView entity="store" entityId={store.id} locale={locale} />
			<Breadcrumbs items={[{ name: t("home"), href: `/${locale}` }, { name: store.store_name }]} />

			{/* Обложка */}
			{store.images[0] ? (
				<div className="mb-[-40px] h-[160px] w-full overflow-hidden rounded-2xl bg-[#F3F3F3] md:h-[260px]">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={store.images[0].file}
						alt={store.store_name}
						className="h-full w-full object-cover"
						fetchPriority="high"
					/>
				</div>
			) : null}

			<header className={`relative flex flex-col gap-4 md:flex-row md:items-end md:gap-6 ${store.images[0] ? "px-4 md:px-6" : ""}`}>
				<div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-[#F3F3F3] shadow md:h-[120px] md:w-[120px]">
					{store.logo ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={store.logo} alt={store.store_name} className="h-full w-full object-cover" />
					) : null}
				</div>
				<div className="min-w-0 flex-1 pb-1">
					<h1 className="text-[24px] font-semibold leading-[120%] text-black md:text-[32px]">
						{store.store_name}
					</h1>
					<p className="mt-1 text-[14px] text-[#777]">
						{[
							addr ? [addr.market, addr.city].filter(Boolean).join(", ") : null,
							store.parts_count ? `${store.parts_count} ${t("parts")}` : null,
							store.rating ? `★ ${store.rating.toFixed(1)} · ${store.reviews_count} ${t("reviews")}` : null,
						]
							.filter(Boolean)
							.join(" · ")}
					</p>
				</div>
				<div className="w-full md:w-[260px]">
					<OpenInAppButton path={localePath} entity="store" entityId={store.id} locale={locale} />
				</div>
			</header>

			<div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:gap-10">
				<div className="order-2 md:order-1">
					{store.description ? (
						<p className="mb-6 whitespace-pre-line text-[15px] leading-[150%] text-[#333]">
							{store.description}
						</p>
					) : null}

					<div className="mb-3 flex items-baseline justify-between">
						<h2 className="text-[18px] font-semibold text-black md:text-[22px]">{t("allParts")}</h2>
						{pages > 1 ? (
							<span className="text-[13px] text-[#777]">
								{t("page")} {page} / {pages}
							</span>
						) : null}
					</div>

					{parts && parts.items.length ? (
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
							{parts.items.map((p) => (
								<PartCard key={p.id} part={p} locale={locale} priceOnRequestLabel={t("priceOnRequest")} />
							))}
						</div>
					) : (
						<p className="rounded-2xl bg-[#F7F7F7] p-6 text-center text-[14px] text-[#777]">—</p>
					)}

					{pages > 1 ? (
						<nav className="mt-6 flex items-center justify-center gap-2 text-[14px]" aria-label="pagination">
							{page > 1 ? (
								<Link
									href={`${localePath}${page - 1 > 1 ? `?page=${page - 1}` : ""}`}
									rel="prev"
									className="rounded-lg border border-black/10 px-4 py-2 hover:bg-black hover:text-white">
									← {t("prev")}
								</Link>
							) : null}
							{page < pages ? (
								<Link
									href={`${localePath}?page=${page + 1}`}
									rel="next"
									className="rounded-lg border border-black/10 px-4 py-2 hover:bg-black hover:text-white">
									{t("next")} →
								</Link>
							) : null}
						</nav>
					) : null}
				</div>

				<aside className="order-1 flex flex-col gap-5 md:order-2">
					{store.addresses.length ? (
						<section className="rounded-2xl border border-black/5 p-4">
							<h2 className="mb-2 text-[15px] font-semibold text-black">{t("addresses")}</h2>
							<ul className="flex flex-col gap-3">
								{store.addresses.map((a) => (
									<li key={a.id} className="text-[14px] leading-[140%] text-[#333]">
										<p className="font-medium text-black">
											{[a.market, a.city].filter(Boolean).join(", ")}
										</p>
										{[a.street, a.district, a.region].filter(Boolean).length ? (
											<p className="text-[#777]">
												{[a.street, a.district, a.region].filter(Boolean).join(", ")}
											</p>
										) : null}
										{a.map_url ? (
											<a
												href={a.map_url}
												target="_blank"
												rel="noopener noreferrer"
												className="mt-1 inline-block text-[13px] underline underline-offset-2">
												{t("onMap")} ↗
											</a>
										) : null}
									</li>
								))}
							</ul>
						</section>
					) : null}

					{store.categories.length ? (
						<section>
							<h2 className="mb-2 text-[15px] font-semibold text-black">{t("categories")}</h2>
							<div className="flex flex-wrap gap-2">
								{store.categories.map((c) => (
									<span key={c.id} className="rounded-full bg-[#F3F3F3] px-3 py-1 text-[13px] text-black">
										{c.name}
									</span>
								))}
							</div>
						</section>
					) : null}

					{store.brands.length ? (
						<section>
							<h2 className="mb-2 text-[15px] font-semibold text-black">{t("brands")}</h2>
							<div className="flex flex-wrap gap-2">
								{store.brands.map((b) => (
									<span key={b.id} className="rounded-full border border-black/10 px-3 py-1 text-[13px] text-black">
										{b.name}
									</span>
								))}
							</div>
						</section>
					) : null}
				</aside>
			</div>
		</article>
	);
}
