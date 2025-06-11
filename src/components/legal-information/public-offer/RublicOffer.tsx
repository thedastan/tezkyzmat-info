import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { EMAIL_ADDRESS_LINK } from "@/constants/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const RublicOffer = () => {
	const t = useTranslations("RublicOffer");

	return (
		<section className="w-full bg-black">
			<div className="bg-white rounded-tl-[32px] rounded-tr-[32px] py-12">
				<div className="container space-y-6">
					<Title>{t("title")}</Title>

					<TitleComponent>{t("lastUpdate")}</TitleComponent>
					<Description className="text-[#4D4D4D]">{t("intro_1")}</Description>
					<Description className="text-[#4D4D4D]">{t("intro_2")}</Description>

					<TitleComponent>1. {t("general.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("general.point_1")}</li>
							<li>{t("general.point_2")}</li>
							<li>{t("general.point_3")}</li>
						</ul>
					</Description>

					<TitleComponent>2. {t("subject.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("subject.point_1")}</li>
							<li>{t("subject.point_2")}</li>
						</ul>
					</Description>

					<TitleComponent>3. {t("procedure.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("procedure.point_1")}</li>
							<li>{t("procedure.point_2")}</li>
							<li>{t("procedure.point_3")}</li>
						</ul>
					</Description>

					<TitleComponent>4. {t("pricing.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("pricing.point_1")}</li>
							<li>{t("pricing.point_2")}</li>
							<li>{t("pricing.point_3")}</li>
						</ul>
					</Description>

					<TitleComponent>5. {t("rights.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<p className="font-medium">{t("rights.company")}</p>
						<ul className="list-disc list-inside pl-4 mb-4">
							<li>{t("rights.company_1")}</li>
							<li>{t("rights.company_2")}</li>
							<li>{t("rights.company_3")}</li>
						</ul>
						<p className="font-medium">{t("rights.user")}</p>
						<ul className="list-disc list-inside pl-4">
							<li>{t("rights.user_1")}</li>
							<li>{t("rights.user_2")}</li>
							<li>{t("rights.user_3")}</li>
						</ul>
					</Description>

					<TitleComponent>6. {t("refund.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("refund.point_1")}</li>
							<li>{t("refund.point_2")}</li>
						</ul>
					</Description>

					<TitleComponent>7. {t("liability.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("liability.point_1")}</li>
							<li>{t("liability.point_2")}</li>
							<li>{t("liability.point_3")}</li>
						</ul>
					</Description>

					<TitleComponent>8. {t("privacy.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						<ul className="list-disc list-inside pl-4">
							<li>{t("privacy.point_1")}</li>
							<li>{t("privacy.point_2")}</li>
						</ul>
					</Description>

					<TitleComponent>9. {t("forceMajeure.title")}</TitleComponent>
					<Description className="text-[#4D4D4D]">
						{t("forceMajeure.text")}
					</Description>

					<TitleComponent>10. {t("contacts.title")}</TitleComponent>
					<div className="flex flex-col text-[#4D4D4D]">
						<Description>{t("contacts.company")}</Description>
						<Link
							href={EMAIL_ADDRESS_LINK}
							target="_blank"
							className="text-[18px] text-[#4D4D4D]">
							{t("contacts.email")}
						</Link>
						<Link
							href="tel:+996556051299"
							className="text-[18px] text-[#4D4D4D]">
							{t("contacts.phone")}
						</Link>
						<Link
							href="https://2gis.kg/bishkek/geo/15763234350964758?m=74.585811%2C42.866164%2F16"
							target="_blank"
							className="text-[18px] text-[#4D4D4D]">
							{t("contacts.address")}
						</Link>
					</div>

					<Description className="text-[#4D4D4D] font-medium mt-6">
						{t("footer")}
					</Description>
				</div>
			</div>
		</section>
	);
};

export default RublicOffer;
