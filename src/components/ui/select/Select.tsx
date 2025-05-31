"use client";

import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	registration?: UseFormRegisterReturn;
	options: { label: string; value: string }[];
	placeholder?: string;
}

export function Select({
	label,
	error,
	registration,
	options,
	placeholder,
	className,
	...props
}: Props) {
	const id = props.id || "select-" + Math.random().toString(36).substring(2, 9);

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="block text-sm mb-1 text-gray-700">
					{label}
				</label>
			)}
			<div className="relative">
				<select
					id={id}
					{...registration}
					{...props}
					defaultValue=""
					className={twMerge(
						"w-full px-3 py-4 pr-8 rounded-[14px] border bg-[#F2F2F2] text-sm appearance-none outline-none",
						error ? "border-red-500" : "border-[#F2F2F2]",
						className
					)}>
					<option value="" disabled hidden>
						{placeholder}
					</option>
					{options.map(({ value, label }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
					<svg
						className="w-4 h-6 text-green-800"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
}
