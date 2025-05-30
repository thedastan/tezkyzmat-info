"use client";
import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

interface LayoutPageProps {
	children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
	return (
		<div className="flex flex-col justify-between min-h-[100vh]">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default LayoutPage;
