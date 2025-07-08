"use client";
import img from "@/assets/images/Group.png";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import ava from "@/assets/images/dastan.jpg";
import ava2 from "@/assets/images/samuil.jpg";
import ava3 from "@/assets/images/men.png";


import { TbBrandInstagramFilled } from "react-icons/tb";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useAos from "@/hooks/useAos";
import { INSTAGRAM_LINK } from "@/constants/constants";

const Group = () => {
	const t = useTranslations("Group");
	useAos();

	const piple = [
		{
			ava: ava3,
			title: t("member1_name"),
			link: "danyshbek_beisheev",
			desc: t("member1_desc"),
		},
		{
			ava: ava2,
			title: t("member2_name"),
			link: "zaidov_s",
			desc: t("member2_desc"),
		},
		{
			ava: ava,
			title: t("member3_name"),
			link: "dastan.mukeev",
			desc: t("member3_desc"),
		},
	];
	return (
		<section id="about" className="py-20">
			<div className="container">
				<div
					style={{
						backgroundImage: `url(${img.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="w-full h-[550px] rounded-[20px] md:p-10 p-0">
					<div
						data-aos="fade-up"
						className="bg-[#000000bd]   md:w-[550px] w-full md:h-[283px] gap-8 md:gap-0 h-[100%] rounded-[20px] flex flex-col md:justify-between justify-center items-start p-6">
						<h1 className="text-white md:text-[32px] text-[24px] font-[700] leading-[120%]">
							{t("title")}
						</h1>
						<Description className="text-white">{t("desc")}</Description>
						<Link className="md:w-[236px] w-full" href={INSTAGRAM_LINK} target={"_blank"}>
							<button className="bg-white rounded-[50px] md:w-[236px] w-full md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
								{t("btn")}{" "}
								<span className="text-[32px]">
									<MdArrowRightAlt />
								</span>
							</button>
						</Link>
					</div>
				</div>

				<div className="gap-3 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
					{piple.map((el, index) => (
						<div
							key={index}
							data-aos="fade-up"
							data-aos-delay={index * 200}
							className="bg-[#F2F2F2] rounded-[20px] w-full">
							<div className="w-full h-[330px] relative rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
								<Image src={el.ava} objectFit="cover" fill alt="ava" />
							</div>
							<div className="bg-[#F2F2F2] rounded-[20px] p-4 flex flex-col gap-3">
								<h1 className="text-[24px] font-[600]">{el.title}</h1>
								<Link
									className="text-[#292D32] flex gap-1 items-center"
									href={`https://instagram.com/${el.link}`}
									target={"_blank"}>
									<span className="text-[24px]">
										<TbBrandInstagramFilled />
									</span>{" "}
									@{el.link}
								</Link>
								<Description className="text-[#8F8F95] ">{el.desc}</Description>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Group;
