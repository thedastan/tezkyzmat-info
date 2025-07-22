"use client";
import { PAGE } from "@/config/pages/public-page.config";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useNavbar } from "../../../lib/data";

import logo from "@/assets/images/logo.png";

import card1 from "@/assets/images/card1.png";
import card2 from "@/assets/images/card2.png";
import card3 from "@/assets/images/card3.png";

import qrClient from "@/assets/images/qrcode_client.png";
import qrBusiness from "@/assets/images/qrcode_business.png";

import {
	EMAIL_ADDRESS,
	EMAIL_ADDRESS_LINK,
	INSTAGRAM_LINK,
	PHONE_NUMBER,
	TIKTOK_LINK,
	YOUTUBE_LINK,
} from "@/constants/constants";
import { FaInstagram } from "react-icons/fa6";
import { RiTiktokLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { Description } from "@/components/ui/text/Description";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Footer = () => {
	const t = useTranslations("Footer");
	const navbar = useNavbar();

	const pathname = usePathname();

	const qrImage = useMemo(() => {
		if (pathname.includes(PAGE.BUSINESS)) return qrBusiness;
		return qrClient;
	}, [pathname]);

	return (
		<footer id="footer" className="bg-[#000000] py-4 ">
			<div className="container">
				<div className="flex justify-between md:gap-2 gap-16 py-20 md:flex-row flex-col">
					<div className="flex flex-col items-start gap-14   ">
						<Link
							href={PAGE.HOME}
							className="  w-[231px] text-[#999999] text-[30px]  ">
							<Image src={logo} alt="logo" />
						</Link>

						<div className="flex justify-between w-full items-start">
							<div className="flex flex-col gap-6">
								{navbar.map((el, index) => (
									<Link
										key={index}
										href={el.href}
										className="text-[17px] text-white  font-[400]  ">
										{el.name}
									</Link>
								))}
							</div>

							<div className="flex flex-col md:hidden justify-center items-center ">
								<Image style={{ borderRadius: "3px" }} width={115} height={115} src={qrImage} alt="QR" />
								<Link
									className="text-[18px] font-[500] text-white mt-6"
									target={"_blank"}
									href={EMAIL_ADDRESS_LINK}>
									{EMAIL_ADDRESS}
								</Link>

								<Link
									className="text-[18px] font-[500] text-white mt-2"
									target={"_blank"}
									href={`tel:${PHONE_NUMBER}`}>
									{PHONE_NUMBER}
								</Link>
							</div>
						</div>
					</div>

					<div className="bg-[#7E7E7E] md:w-[1px] w-full md:h-[330px] h-[1px]" />

					<div className="md:flex hidden flex-col   justify-center items-center ">
						<Image
							style={{ borderRadius: "4px" }}
							width={180}
							height={180}
							src={qrImage}
							alt="QR"
						/>
						<Link
							className="text-[28px] font-[500] text-white mt-14"
							target={"_blank"}
							href={EMAIL_ADDRESS_LINK}>
							{EMAIL_ADDRESS}
						</Link>

						<Link
							className="text-[28px] font-[500] text-white mt-2"
							target={"_blank"}
							href={`tel:${PHONE_NUMBER}`}>
							{PHONE_NUMBER}
						</Link>
					</div>

					<div className="bg-[#7E7E7E] md:flex hidden md:w-[1px] w-full md:h-[330px] h-[1px]" />

					<div className="flex flex-col  items-center md:items-start">
						{/* <div>
							<h1 className="text-white md:text-[32px] text-[24px] font-bold">
								{t("title")}
							</h1>
							<div className="flex md:mt-6 mt-8">
								<input
									placeholder={t("input")}
									className="bg-[#FFFFFF1A] text-white md:w-[443px] w-full h-[72px] rounded-tl-[20px] rounded-bl-[20px] px-6"
									type="text"
								/>
								<div className="bg-[#FFFFFF1A] flex justify-center items-center px-6 h-[72px] rounded-tr-[20px] rounded-br-[20px]">
									<button className="text-black rounded-[50px] bg-white p-2 text-[32px] ">
										<MdArrowRightAlt />
									</button>
								</div>
							</div>
						</div> */}

						<h1 className="text-white md:text-[32px] text-[24px] font-bold">
							{t("we")}
						</h1>
						<div className="flex gap-3 md:mt-10 mt-10">
							<Link
								className="text-white "
								target={"_blank"}
								href={TIKTOK_LINK}>
								<RiTiktokLine size={32} />
							</Link>

							<Link
								className="text-white "
								target={"_blank"}
								href={INSTAGRAM_LINK}>
								<FaInstagram size={30} />
							</Link>

							<Link
								className="text-white "
								target={"_blank"}
								href={YOUTUBE_LINK}>
								<FiYoutube size={32} />
							</Link>
						</div>
					</div>
				</div>

				<div className="bg-[#7E7E7E] flex md:hidden md:w-[1px] w-full md:h-[330px] h-[1px]" />

				<div className="flex md:mt-0 mt-10 justify-between items-center gap-10 pb-2 md:flex-row flex-col-reverse">
					<div className="flex gap-6 md:flex-row flex-col md:text-start text-center">
						<Description className="text-[#8F8F95]">
							© 2025 Tez Kyzmat
						</Description>
						<Link href={PAGE.PRIVACY}>
							<Description className="text-[#8F8F95]">{t("span1")}</Description>
						</Link>

						<Link href={PAGE.PUBLIC}>
							<Description className="text-[#8F8F95]">{t("span2")}</Description>
						</Link>

						<Link href={PAGE.RETURN}>
							<Description className="text-[#8F8F95]">{t("span3")}</Description>
						</Link>
					</div>

					<div className="flex gap-4">
						<Image width={80} height={24} src={card1} alt="card" />
						<Image width={40} height={24} src={card2} alt="card" />
						<Image width={40} height={24} src={card3} alt="card" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
