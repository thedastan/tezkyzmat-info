"use client";

import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	registration?: UseFormRegisterReturn;
}

export function InputComponent({
	error,
	className,
	registration,
	...props
}: Props) {
	const id = props.id || "input-" + Math.random().toString(36).substring(2, 9);

	return (
		<div className="w-full">
			 
			<input
				id={id}
				{...registration}
				{...props}
				className={twMerge(
					"border w-full bg-[#F2F2F2] h-[55px] rounded-[14px] px-3 py-2   outline-none text-sm",
					error ? "border-red-500" : "border-[#F2F2F2]",
					className
				)}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
}
