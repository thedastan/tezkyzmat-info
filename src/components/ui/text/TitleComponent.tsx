"use client";

import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

export function TitleComponent({ children, className, ...props }: Props) {
	return (
		<h1
			{...props}
			className={twMerge("md:text-[24px] text-[22px] font-[600] leading-[120%] text-black", className)}>
			{children}
		</h1>
	);
}
