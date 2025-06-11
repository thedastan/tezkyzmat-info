"use client";

import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

export function Description({ children, className, ...props }: Props) {
	return (
		<h1
			{...props}
			className={twMerge(
				"md:text-[18px] text-[16px] font-[400] leading-[140%] text-black",
				className
			)}>
			{children}
		</h1>
	);
}
