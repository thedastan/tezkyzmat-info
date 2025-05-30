'use client'
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import img from "@/assets/images/hero-mobiles.png";
import { MdArrowRightAlt } from "react-icons/md";
import { FaGooglePlay } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";
const Hero = () => {

	const { t } = useLanguageStore();

	return (
		<section className="bg-[#000000]">
			<div className="relative bg-[#1C1C1C] w-full md:h-[700px] h-full flex justify-center items-center overflow-hidden py-10 rounded-tl-[40px] rounded-tr-[40px]">
				<div className="absolute md:top-[-15vw] top-[-10vw] left-1/2 transform -translate-x-1/2 md:w-[70%] w-[100%] h-[30vw] blur-[80px] bg-[radial-gradient(circle,_rgba(175,171,145,0.5)_0%,_rgba(175,171,145,0.1)_60%,_rgba(175,171,145,0)_100%)] z-0 pointer-events-none" />

				<div className="container relative z-10">
					<div className="flex flex-col-reverse md:flex-row justify-between items-center">
						<div className="flex flex-col md:gap-6 gap-4 items-start">
							<Description className="uppercase md:flex hidden text-white">
								Tez Kyzmat PRO
							</Description>

							<div className="flex md:hidden mt-[50px]">
								<DeviceHero />
							</div>

							<h1 className="md:text-[64px] text-[26px] mt-2 font-[700] leading-[110%] text-white">
							{t("Hero.title")} <br />
								<span className="text-[#FADD13]">{t("Hero.span")}</span>
							</h1>
							<Description className="text-white">
								{/* Получайте клиентов напрямую, без посредников, без комиссий. */}
								{t("Hero.desc")}
							</Description>
							<button className="bg-white rounded-[50px] md:w-[340px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
							{t("Hero.btn")}{" "}
								<span className="text-[32px]">
									<MdArrowRightAlt />
								</span>
							</button>
						</div>

						<div className="md:max-w-[600px] max-w-[500px] w-full md:h-[520px] sm:h-[420px]  h-[350px]   relative">
							<Image src={img} objectFit="contain" fill alt="image-mobile" />
							<div className=" absolute z-10 bottom-6 left-4 md:flex hidden">
								<DeviceHero />
							</div>
						</div>

						<div className="flex md:hidden text-center">
							<Description className="uppercase text-white pb-8 text-center   w-full">
								Tez Kyzmat PRO
							</Description>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const data = [
	{
		icon: <FaGooglePlay />,
		span: "Доступно в",
		title: "Google Play",
		link: "/",
	},
	{
		icon: <BsApple />,
		span: "Доступно в",
		title: "App Store",
		link: "/",
	},
];

export const DeviceHero = () => {
	return (
		<div className="flex gap-2">
			{data.map((el, index) => (
				<Link
					key={index}
					href={el.link}
					className="inline-flex justify-center items-center gap-2 text-black bg-white p-2 rounded-[5px] border border-black min-w-[100px] max-w-max">
					<h1 className="md:text-[26px] text-[22px]">{el.icon}</h1>
					<div className="flex flex-col">
						<p className="text-[7px]">{el.span}</p>
						<h1 className="md:text-[18px] text-[16px] leading-[110%] font-bold whitespace-nowrap">
							{el.title}
						</h1>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Hero;
