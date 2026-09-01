import { ImageResponse } from "next/og";
import { getPart, parsePartId } from "@/services/web/web.service";
import { formatPrice, SITE_URL } from "@/constants/web.constants";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Фото для OG: относительный путь (мок из public/) → data URI, иначе абсолютный URL */
async function resolvePhoto(src: string | undefined): Promise<string | null> {
	if (!src) return null;
	if (/^https?:\/\//.test(src)) return src;
	if (src.startsWith("/")) {
		try {
			const buf = await readFile(path.join(process.cwd(), "public", src));
			const ext = src.split(".").pop()?.toLowerCase();
			const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
			return `data:${mime};base64,${buf.toString("base64")}`;
		} catch {
			return `${SITE_URL}${src}`;
		}
	}
	return null;
}

export const revalidate = 300; // = REVALIDATE (segment config must be a literal)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tez Kyzmat";

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

export default async function OgImage({ params }: Props) {
	const { slug, locale } = await params;
	const id = parsePartId(slug);
	const part = id ? await getPart(id) : null;

	const photo = await resolvePhoto(part?.images[0]?.file);
	const title = part?.name ?? "Tez Kyzmat";
	const price =
		part && !part.price_hidden && part.price !== null
			? formatPrice(part.price, part.currency)
			: locale === "en"
			? "Price on request"
			: locale === "kg"
			? "Баасы суроо боюнча"
			: "Цена по запросу";
	const sub = part
		? [part.brand?.name, part.brand_model?.name, part.year_raw, part.part_condition?.name]
				.filter(Boolean)
				.join(" · ")
		: "";
	const store = part ? [part.store.store_name, part.store.city].filter(Boolean).join(", ") : "";

	const [regular, bold] = await Promise.all([
		readFile(path.join(process.cwd(), "src/app/fonts/Inter-Regular-og.ttf")),
		readFile(path.join(process.cwd(), "src/app/fonts/Inter-Bold-og.ttf")),
	]);

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					background: "#111",
					color: "#fff",
					fontFamily: "Inter, Helvetica, Arial, sans-serif",
				}}>
				<div style={{ width: 630, height: 630, display: "flex", background: "#222" }}>
					{photo ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={photo} alt="" width={630} height={630} style={{ objectFit: "cover" }} />
					) : null}
				</div>
				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "44px 48px",
					}}>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: 40,
								fontWeight: 700,
								lineHeight: 1.15,
								display: "-webkit-box",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}>
							{title}
						</div>
						{sub ? (
							<div style={{ marginTop: 14, fontSize: 24, color: "#bbb" }}>{sub}</div>
						) : null}
					</div>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: 54,
								fontWeight: 700,
								color: "#FADD13",
								lineHeight: 1,
							}}>
							{price}
						</div>
						{store ? (
							<div style={{ marginTop: 14, fontSize: 24, color: "#ddd" }}>{store}</div>
						) : null}
						<div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 10 }}>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 7,
									background: "#FADD13",
								}}
							/>
							<div style={{ fontSize: 22, color: "#999" }}>tezkyzmat.kg</div>
						</div>
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: "Inter", data: regular, weight: 400, style: "normal" },
				{ name: "Inter", data: bold, weight: 700, style: "normal" },
			],
		}
	);
}
