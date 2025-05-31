"use client";
import InstagramSvg from "@/assets/svg/Instagram";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import img from "@/assets/images/order.png";
import { MdArrowRightAlt } from "react-icons/md";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useState } from "react";
import Forma from "../forma/Forma";
import Link from "next/link";
import { INSTAGRAM_DUBAY_LINK } from "@/constants/constants";

const Order = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const { t } = useLanguageStore();

	return (
		<section className="flex  relative flex-col ">
			<div
				style={{
					backgroundImage: `url(${img.src})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
				className="w-full h-full mt-[70px] min-h-[787px] rounded-tr-[40px] z-10 rounded-tl-[40px] relative overflow-hidden flex justify-center items-center">
				<div className="bg-[#00000099] w-full h-full absolute" />
				<div className="container">
					<div className=" relative z-10 flex justify-center items-center flex-col gap-4">
						<Title className="text-white text-center w-full max-w-[850px]">
							{t("Order.title")}
						</Title>
						<Description className="text-white text-center w-full max-w-[550px]">
							{t("Order.desc")}
						</Description>

						<div className="md:flex md:mt-0 mt-10 block gap-8 w-full justify-center">
							<Link href={INSTAGRAM_DUBAY_LINK} target={"_blank"}>
								<button className="bg-transparent border border-white text-white rounded-[50px] md:w-[300px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
									{t("Order.btn1")}  {" "}
									<span className="text-[32px]">
										<InstagramSvg />
									</span>
								</button>
							</Link>
							<button
								onClick={() => setModalOpen(true)}
								className="bg-[#FADD13] rounded-[50px] md:w-[300px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
								{t("Order.btn2")} {" "}
								<span className="text-[32px]">
									<MdArrowRightAlt />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="py-20 bg-white rounded-tr-[40px] mt-[-70px] rounded-tl-[40px] relative z-20">
				<div className="container">
					<div className="flex flex-col md:flex-row justify-between items-start gap-16">
						<h1 className="md:text-[64px] text-[34px] font-[700] leading-[120%] w-full max-w-[550px]">
							{t("Order.title2")}
						</h1>

						<div className="flex flex-col gap-4 w-full max-w-[480px]">
							<h3 className="text-[26px] font-[600]">{t("Order.desc2")}</h3>
							<Description>{t("Order.desc3")}</Description>
							<Link href={"#footer"}>
								<button className="bg-[#000000] text-white rounded-[50px] md:w-[300px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
									{t("Order.btn3")}  {" "}
									<span className="text-[32px]">
										<MdArrowRightAlt />
									</span>
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{isModalOpen && <Forma setModalOpen={setModalOpen} />}
		</section>
	);
};

export default Order;
