"use client";

import { ImCamera } from "react-icons/im";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface Props {
	onChange?: (files: FileList | null) => void;
	error?: string;
	multiple?: boolean;
}

export function FileUpload({ onChange, error, multiple = false }: Props) {
	const [images, setImages] = useState<string[]>([]);

	const { t } = useLanguageStore();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const fileURLs = Array.from(files).map((file) => URL.createObjectURL(file));
		setImages((prev) => [...prev, ...fileURLs]);

		onChange?.(files);
	};

	return (
		<div className="flex gap-1 flex-wrap">
			{images.map((img, index) => (
				<div key={index} className="relative w-[55px] h-[55px] overflow-hidden">
					<img
						src={img}
						alt="preview"
						className="rounded w-full h-full object-cover absolute"
					/>
				</div>
			))}

			{images.length === 0 ? (
				<label className="flex flex-col justify-center items-center w-full h-[55px] bg-[#F2F2F2] text-gray-600 text-sm rounded-[14px] cursor-pointer hover:opacity-80 transition">
					<div className="flex items-center gap-3 text-[#8F8F95]">
						<ImCamera size={20} />
						<span className="text-[#8F8F95]">{t("Forma.add")}</span>
					</div>

					<input
						type="file"
						accept="image/*"
						multiple={multiple}
						onChange={handleChange}
						className="hidden"
					/>
				</label>
			) : (
				<label className="flex flex-col justify-center items-center w-[55px] h-[55px] bg-[#F2F2F2] text-gray-600 text-sm rounded-[10px] cursor-pointer hover:opacity-80 transition">
					<IoAdd size={28} />
					<input
						type="file"
						accept="image/*"
						multiple={multiple}
						onChange={handleChange}
						className="hidden"
					/>
				</label>
			)}

			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
}
