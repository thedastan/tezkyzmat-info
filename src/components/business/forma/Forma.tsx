"use client";
import { FileUpload } from "@/components/ui/input/FileUpload";
import { InputComponent } from "@/components/ui/input/InputComponent";
import PhoneInputComponent from "@/components/ui/input/PhoneInputComponent";
import { TextareaComponent } from "@/components/ui/input/TextareaComponent";
import { Select } from "@/components/ui/select/Select";
import { Description } from "@/components/ui/text/Description";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { useFormOptions } from "./FormaOptions";
import axios from "axios";

import { toast, Toaster } from "sonner";

interface IForma {
	setModalOpen: (value: boolean) => void;
}

interface FormData {
	phone?: string;
	text?: string;
	images?: FileList | File[];
	description?: string;
	brandId?: string;
	modelId?: string;
	country?: string;
	topliva?: string;
	obem?: string;
}

interface TelegramPhotoMedia {
	type: "photo";
	media: string;
	caption?: string;
	parse_mode?: "HTML" | "Markdown";
}

const Forma = ({ setModalOpen }: IForma) => {
	const t = useTranslations("Forma");
	const [allFiles, setAllFiles] = React.useState<File[]>([]);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			phone: "",
		},
	});

	const selectedBrandId = watch("brandId");

	const {
		manufacturerCountries,
		fueltype,
		brandOptions,
		modelOptions,
		volumeOptions,
		modelsLoading,
	} = useFormOptions(selectedBrandId ? Number(selectedBrandId) : undefined);

	const messageModel = (
		data: FormData & {
			brandName?: string;
			modelName?: string;
			countryName?: string;
			fuelName?: string;
		}
	) => {
		let messageTg = `📢 <b>Заявка на запчасти из ОАЭ</b>\n\n`;
		messageTg += `Телефон: <b>${data.phone}</b>\n`;
		messageTg += `Марка: <b>${data.brandName}</b>\n`;
		messageTg += `Модель: <b>${data.modelName}</b>\n`;
		messageTg += `Страна: <b>${data.countryName}</b>\n`;
		messageTg += `Топливо: <b>${data.fuelName}</b>\n`;
		messageTg += `Объем: <b>${data.obem}</b>\n`;
		messageTg += `VIN-код: <b>${data.text || "—"}</b>\n`;
		messageTg += `Описание: <b>${data.description || "—"}</b>\n`;

		return messageTg;
	};

	const sendToTelegram = async (
		data: FormData & {
			brandName?: string;
			modelName?: string;
			countryName?: string;
			fuelName?: string;
		}
	) => {
		try {
			const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
			const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

			if (!TOKEN || !CHAT_ID) {
				console.error("Telegram TOKEN или CHAT_ID не установлены");
				return false;
			}

			// Генерация текста сообщения
			const message = messageModel(data);

			// Обработка изображений
			let files: File[] = [];
			if (data.images) {
				if (data.images instanceof FileList) {
					files = Array.from(data.images);
				} else if (Array.isArray(data.images)) {
					files = data.images;
				}
			}

			console.log("Файлы для отправки:", files.length, files);

			if (files.length > 1) {
				// Отправка группы изображений
				const media: TelegramPhotoMedia[] = files.map((file, index) => {
					const item: TelegramPhotoMedia = {
						type: "photo",
						media: `attach://photo_${index}`,
					};
					if (index === 0) {
						item.caption = message;
						item.parse_mode = "HTML";
					}
					return item;
				});

				const formData = new FormData();
				formData.append("chat_id", CHAT_ID);
				formData.append("media", JSON.stringify(media));
				files.forEach((file, index) => {
					formData.append(`photo_${index}`, file);
				});

				await axios.post(
					`https://api.telegram.org/bot${TOKEN}/sendMediaGroup`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
			} else if (files.length === 1) {
				// Отправка одного изображения
				const formData = new FormData();
				formData.append("chat_id", CHAT_ID);
				formData.append("photo", files[0]);
				formData.append("caption", message);
				formData.append("parse_mode", "HTML");

				await axios.post(
					`https://api.telegram.org/bot${TOKEN}/sendPhoto`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
			} else {
				// Отправка текста без изображений
				await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
					chat_id: CHAT_ID,
					parse_mode: "HTML",
					text: message,
				});
			}

			return true;
		} catch (error) {
			console.error("Ошибка при отправке в Telegram:", error);
			return false;
		}
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log("Данные формы перед отправкой:", {
			...data,
			imagesCount: data.images
				? data.images instanceof FileList
					? data.images.length
					: data.images.length
				: 0,
		});

		const selectedBrand = brandOptions.find((b) => b.value === data.brandId);
		const selectedModel = modelOptions.find((m) => m.value === data.modelId);
		const selectedCountry = manufacturerCountries.find(
			(c) => c.value === data.country
		);
		const selectedFuel = fueltype.find((f) => f.value === data.topliva);

		const result = {
			...data,
			brandName: selectedBrand?.label,
			modelName: selectedModel?.label,
			countryName: selectedCountry?.label,
			fuelName: selectedFuel?.label,
		};

		try {
			const success = await sendToTelegram(result);
			if (success) {
				toast.success(t("Successfully"));

				reset({
					phone: "",
					brandId: undefined,
					modelId: undefined,
					country: undefined,
					topliva: undefined,
					obem: undefined,
					text: undefined,
					description: undefined,
					images: undefined,
				});
				setAllFiles([]);
			} else {
				alert("Произошла ошибка при отправке");
			}
		} catch (error) {
			console.error("Ошибка:", error);
			alert("Произошла ошибка при отправке");
		}
	};

	return (
		<div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<Toaster position="top-center" />
			<div className="container">
				<div
					className="flex z-50 relative flex-col items-center justify-center bg-[#ffffff] rounded-[20px] py-10 md:py-4 px-4 w-full md:max-h-[100%] max-h-[80vh]"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}>
					<button
						className="absolute text-[32px] z-10 right-2 top-2"
						onClick={() => setModalOpen(false)}>
						<IoCloseOutline />
					</button>
					<div className="md:flex hidden flex-col pb-10">
						<h1 className="text-center font-bold text-[36px]">{t("title")}</h1>
						<Description className="text-center mt-2">{t("desc")}</Description>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full max-w-[810px] overflow-y-auto md:overflow-y-visible">
						<div className="w-full flex md:flex-row flex-col gap-4">
							<div className="flex md:hidden flex-col">
								<h1 className="text-center font-bold text-[36px]">
									{t("title")}
								</h1>
								<Description className="text-center mt-2">
									{t("desc")}
								</Description>
							</div>
							<div className="flex w-full flex-col gap-4">
								<PhoneInputComponent control={control} />

								<Select
									placeholder={t("select1")}
									options={brandOptions}
									registration={register("brandId", {
										required: t("selectBrandRequired"),
									})}
									error={errors.brandId?.message?.toString()}
								/>

								<Select
									placeholder={t("select2")}
									options={modelOptions}
									registration={register("modelId", {
										required: t("selectBrandRequired"),
									})}
									error={errors.modelId?.message?.toString()}
									disabled={!selectedBrandId || modelsLoading}
								/>

								<Select
									placeholder={t("select3")}
									options={manufacturerCountries}
									registration={register("country", {
										required: t("selectBrandRequired"),
									})}
									error={errors.country?.message?.toString()}
								/>

								<Select
									placeholder={t("select4")}
									options={fueltype}
									registration={register("topliva", {
										required: t("selectBrandRequired"),
									})}
									error={errors.topliva?.message?.toString()}
								/>
							</div>

							<div className="flex w-full h-f flex-col gap-4">
								<Select
									placeholder={t("select5")}
									options={volumeOptions}
									registration={register("obem", {
										required: t("selectBrandRequired"),
									})}
									error={errors.obem?.message?.toString()}
								/>

								<InputComponent
									placeholder={t("code")}
									type="text"
									registration={register("text")}
								/>

								<FileUpload
									multiple
									files={allFiles}
									onChange={(files) => {
										if (files) {
											const filesArray = Array.from(files);
											setAllFiles((prev) => [...prev, ...filesArray]);
											setValue("images", [...allFiles, ...filesArray]);
										}
									}}
									onRemove={(fileToRemove) => {
										setAllFiles((prev) => {
											const filtered = prev.filter(
												(file) => file !== fileToRemove
											);
											setValue("images", filtered);
											return filtered;
										});
									}}
								/>
								<TextareaComponent
									placeholder={t("textare")}
									registration={register("description")}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="bg-[#111218] text-white rounded-[50px] w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
							{t("btn")}
							<span className="text-[32px]">
								<MdArrowRightAlt />
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Forma;
