import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { EMAIL_ADDRESS_LINK } from "@/constants/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  const t = useTranslations("PrivacyPolicy");

  return (
    <section className="w-full bg-black">
      <div className="bg-white rounded-tl-[32px] rounded-tr-[32px] py-12">
        <div className="container space-y-6">
          <Title>{t("title")}</Title>

          <TitleComponent>{t("titleComponent_1")}</TitleComponent>
          <Description className="text-[#4D4D4D]">{t("desc_1")}</Description>

          <TitleComponent>{t("titleComponent_2")}</TitleComponent>
          <Description className="text-[#4D4D4D]">{t("desc_2")}</Description>

          <TitleComponent>{t("titleComponent_3")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_3")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_3_1")}</li>
              <li>{t("desc_3_2")}</li>
              <li>{t("desc_3_3")}</li>
              <li>{t("desc_3_4")}</li>
              <li>{t("desc_3_5")}</li>
              <li>{t("desc_3_6")}</li>
              <li>{t("desc_3_7")}</li>
            </ul>
          </Description>

          <TitleComponent>{t("titleComponent_4")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_4")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_4_1")}</li>
              <li>{t("desc_4_2")}</li>
              <li>{t("desc_4_3")}</li>
              <li>{t("desc_4_4")}</li>
              <li>{t("desc_4_5")}</li>
            </ul>
          </Description>

          <TitleComponent>{t("titleComponent_5")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_5")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_5_1")}</li>
              <li>{t("desc_5_2")}</li>
              <li>{t("desc_5_3")}</li>
            </ul>
          </Description>

          <TitleComponent>{t("titleComponent_6")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_6")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_6_1")}</li>
              <li>{t("desc_6_2")}</li>
              <li>{t("desc_6_3")}</li>
            </ul>
          </Description>

          <TitleComponent>{t("titleComponent_7")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_7")}
          </Description>

          <TitleComponent>{t("titleComponent_8")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_8")}
          </Description>

          <TitleComponent>{t("titleComponent_9")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_9")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_9_1")}</li>
              <li>{t("desc_9_2")}</li>
            </ul>
            {t("desc_9_3")}
          </Description>

          <TitleComponent>{t("titleComponent_10")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_10")}
            <ul className="list-disc list-inside pl-4">
              <li>{t("desc_10_1")}</li>
              <li>{t("desc_10_2")}</li>
              <li>{t("desc_10_3")}</li>
              <li>{t("desc_10_4")}</li>
            </ul>
          </Description>

          <TitleComponent>{t("titleComponent_11")}</TitleComponent>
          <div className="flex flex-col text-[#4D4D4D]">
            <Description className="text-[#4D4D4D]">
              {t("companyName")}
            </Description>
            <Link
              className="text-[18px] text-[#4D4D4D]"
              href={EMAIL_ADDRESS_LINK}
              target={"_blank"}
            >
              {t("email")}
            </Link>
            <Link
              className="text-[18px] text-[#4D4D4D]"
              href="tel:+996556051299"
            >
              {t("phone")}
            </Link>
            <Link
              className="text-[18px] text-[#4D4D4D]"
              href={
                "https://2gis.kg/bishkek/geo/15763234350964758?m=74.585811%2C42.866164%2F16"
              }
              target={"_blank"}
            >
              {t("address")}
            </Link>
          </div>

          <TitleComponent>{t("titleComponent_12")}</TitleComponent>
          <Description className="text-[#4D4D4D]">
            {t("desc_12")}
          </Description>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;