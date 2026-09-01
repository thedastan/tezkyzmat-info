"use client";
import img from "@/assets/images/Group.png";
import { Description } from "@/components/ui/text/Description";
import Image, { StaticImageData } from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import ava from "@/assets/images/dastan.jpg";
import ava2 from "@/assets/images/airas_tat.jpeg";
import ava3 from "@/assets/images/danysh.jpg";


import { TbBrandInstagramFilled, TbBrandLinkedin } from "react-icons/tb";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useAos from "@/hooks/useAos";
import { INSTAGRAM_LINK } from "@/constants/constants";

const Group = () => {
	const t = useTranslations("Group");
	useAos();

	const piple: {
		ava: StaticImageData;
		title: string;
		desc: string;
		instagram?: string;
		linkedin?: string;
	}[] = [
		{
			ava: ava3,
			title: t("member1_name"),
			instagram: "danyshbek.beisheev",
			desc: t("member1_desc"),
		},
		{
			ava: ava,
			title: t("member3_name"),
			instagram: "dastan.mukeev",
			desc: t("member3_desc"),
		},
		{
			ava: ava2,
			title: t("member2_name"),
			linkedin: "https://www.linkedin.com/in/t-airas-t/",
			desc: t("member2_desc"),
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
							className="relative rounded-[20px] w-full overflow-hidden">
							{/* размытая тёмная подложка из фото */}
							<Image
								src={el.ava}
								fill
								aria-hidden
								className="object-cover blur-2xl scale-125"
								alt=""
							/>
							<div className="absolute inset-0 bg-black/55" />

							{/* контент поверх подложки */}
							<div className="relative">
								<div className="w-full h-[330px] relative overflow-hidden">
									<Image
										src={el.ava}
										fill
										className="object-cover object-top"
										alt="ava"
									/>
									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
								</div>
								<div className="p-4 flex flex-col gap-3">
									<h1 className="text-[24px] font-[600] text-white">{el.title}</h1>
									{el.instagram && (
										<Link
											className="text-white/90 flex gap-1 items-center"
											href={`https://instagram.com/${el.instagram}`}
											target={"_blank"}>
											<span className="text-[24px]">
												<TbBrandInstagramFilled />
											</span>{" "}
											@{el.instagram}
										</Link>
									)}
									{el.linkedin && (
										<Link
											className="text-white/90 flex gap-1 items-center"
											href={el.linkedin}
											target={"_blank"}>
											<span className="text-[24px]">
												<TbBrandLinkedin />
											</span>{" "}
											LinkedIn
										</Link>
									)}
									<Description className="text-white/75">{el.desc}</Description>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Group;
