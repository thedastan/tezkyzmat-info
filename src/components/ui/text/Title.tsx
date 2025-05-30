"use client";

import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
	children: string;
}

export function Title({ children, className, ...props }: Props) {
	return (
		<h1
			{...props}
			className={twMerge("md:text-[48px] text-[26px] font-[700] leading-[120%] text-black", className)}>
			{children}
		</h1>
	);
}
