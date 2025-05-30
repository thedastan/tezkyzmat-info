"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import {  useNavbar } from "../data";
import { AiOutlineMenu } from "react-icons/ai";
import LanguageSelect from "./LanguageModal";

const Header = () => {
	const navbar = useNavbar();
	const [isOpen, setIsOpen] = useState(false);

	const toggleBox = () => {
		setIsOpen((prevState) => !prevState);
	};
 
	return (
		<header className="w-full  bg-transparent h-[60px] ">
			<div className=" fixed flex items-center z-50 w-full h-[60px] bg-black">
				<div className="container">
					<div className="flex justify-between py-2 items-center">
						<div className="flex items-center  gap-14">
							<Link
								href={PAGE.HOME}
								className="  w-[118px] text-[#999999] text-[30px]  ">
								<Image src={logo} alt="logo" />
							</Link>

							<div className="md:flex gap-6 hidden">
								{navbar.map((el, index) => (
									<Link
										key={index}
										href={el.href}
										className="text-[14px] text-white  font-[400]  ">
										{el.name}
									</Link>
								))}
							</div>
						</div>

						<div className="md:flex hidden">
							 <LanguageSelect setIsOpen={setIsOpen}/>
						</div>

						<div className="md:hidden text-white flex">
							<button
								onClick={toggleBox}
								className="flex items-center justify-center text-[26px] font-[800]">
								<AiOutlineMenu />
							</button>
						</div>
					</div>
				</div>
			</div>

			<BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</header>
	);
};

export default Header;
