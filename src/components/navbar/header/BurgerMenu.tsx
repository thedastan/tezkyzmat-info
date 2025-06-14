"use client";

import Link from "next/link";
import { useNavbar } from "../../../lib/data";
import { PAGE } from "@/config/pages/public-page.config";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

import logo from "@/assets/images/logo-burder.png";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";
import { RiWhatsappFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { INSTAGRAM, LOCATION_LINK, WHATSAPP_LINK } from "@/constants/constants";
import LanguageSelect from "./LanguageModal";
import { useTranslations } from "next-intl";

const BurgerMenu = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	const navbar = useNavbar();

	const t = useTranslations("BurgerMenu");

	return (
		<div
			id="menu-overlay"
			className={`fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-[100vh] z-50 transition-opacity duration-700 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				className={`fixed top-0 left-0 w-[90%] h-full bg-white  p-4 flex flex-col justify-start gap-4 shadow-lg z-50 transition-transform duration-700 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<div className="flex justify-between items-center mt-6 ">
					<Link
						href={PAGE.HOME}
						className="  w-[182px] text-[#999999] text-[30px]  ">
						<Image src={logo} alt="logo" />
					</Link>
					<button
						onClick={() => setIsOpen(false)}
						className="flex items-center text-black justify-center text-[32px] font-[800]">
						<IoCloseOutline />
					</button>
				</div>

				<div className="w-full flex flex-col justify-start items-start">
					<div className="flex flex-col items-start w-[90%] text-start gap-4 mt-10 ">
						{navbar.map((el, index) => (
							<Link
								key={index}
								href={el.href}
								className="text-black text-[16px] text-start w-full font-medium"
								onClick={() => setIsOpen(false)} // Закрывать меню при переходе
							>
								{el.name}
							</Link>
						))}
						<div className="flex">
							<LanguageSelect textColor="text-black" />
						</div>
					</div>

					<div className="mt-12">
						<h1 className="text-[20px] font-[600]">{t("contact")}</h1>

						<div className="flex flex-col gap-4 mt-5">
							<Link
								href={LOCATION_LINK}
								target={"_blank"}
								className="text-[18px] font-[600] gap-2 flex items-center">
								<HiLocationMarker size={26} /> {t("location")}{" "}
								<GoArrowUpRight />
							</Link>

							<Link
								href={INSTAGRAM}
								target={"_blank"}
								className="text-[18px] font-[600] gap-2 flex items-center">
								<TbBrandInstagramFilled size={26} /> Instagram{" "}
								<GoArrowUpRight />
							</Link>

							<Link
								href={WHATSAPP_LINK}
								target={"_blank"}
								className="text-[18px] font-[600] gap-2 flex items-center">
								<RiWhatsappFill size={26} /> WhatsApp <GoArrowUpRight />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
