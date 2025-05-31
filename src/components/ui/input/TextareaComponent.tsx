"use client";

import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	registration?: UseFormRegisterReturn;
}

export function TextareaComponent({
	label,
	error,
	className,
	registration,
	...props
}: Props) {
	const id =
		props.id || "textarea-" + Math.random().toString(36).substring(2, 9);

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="block text-sm mb-1 text-gray-700">
					{label}
				</label>
			)}
			<textarea
				id={id}
				{...registration}
				{...props}
				className={twMerge(
					"border w-full bg-[#F2F2F2]  rounded-[14px] px-3 py-4 h-[120px] outline-none text-sm",
					error ? "border-red-500" : "border-[#F2F2F2]",
					className
				)}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
}
