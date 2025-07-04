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

const Forma = ({ setModalOpen }: IForma) => {
	const t = useTranslations("Forma");

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormData>();

	const selectedBrandId = watch("brandId");

	const {
		manufacturerCountries,
		fueltype,
		brandOptions,
		modelOptions,
		volumeOptions,
		modelsLoading,
	} = useFormOptions(selectedBrandId ? Number(selectedBrandId) : undefined);

	const onSubmit: SubmitHandler<FormData> = (data) => {
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

		alert("Сообщение в console")

		console.log(result);

		reset();
	};

	return (
		<div className="fixed z-50 inset-0   bg-black bg-opacity-50 flex justify-center items-center  ">
			<div className="container">
				<div
					className="flex z-50  relative flex-col items-center justify-center bg-[#ffffff] rounded-[20px] py-10 md:py-4 px-4 w-full md:max-h-[100%] max-h-[80vh]  "
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}>
					<button
						className=" absolute text-[32px] z-10    right-2 top-2"
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
						<div className=" w-full  flex  md:flex-row flex-col gap-4 ">
							<div className="flex md:hidden flex-col">
								<h1 className="text-center font-bold text-[36px]">
									{t("title")}
								</h1>
								<Description className="text-center mt-2">
									{t("desc")}
								</Description>
							</div>
							<div className="flex w-full flex-col gap-4">
								{/* телефн номер  */}
								<PhoneInputComponent control={control} />

								{/* Марка авто */}

								<Select
									placeholder={t("select1")}
									options={brandOptions}
									registration={register("brandId", {
										required: t("selectBrandRequired"),
									})}
									error={errors.brandId?.message?.toString()}
								/>

								{/* модель авто */}

								<Select
									placeholder={t("select2")}
									options={modelOptions}
									registration={register("modelId", {
										required: t("selectBrandRequired"),
									})}
									error={errors.modelId?.message?.toString()}
									disabled={!selectedBrandId || modelsLoading}
								/>

								{/* страна */}

								<Select
									placeholder={t("select3")}
									options={manufacturerCountries}
									registration={register("country", {
										required: t("selectBrandRequired"),
									})}
									error={errors.country?.message?.toString()}
								/>

								{/* тип топлива */}

								<Select
									placeholder={t("select4")}
									options={fueltype}
									registration={register("topliva", {
										required: t("selectBrandRequired"),
									})}
									error={errors.topliva?.message?.toString()}
								/>
							</div>

							{/* объем двигателя  */}

							<div className="flex w-full h-f flex-col gap-4">
								<Select
									placeholder={t("select5")}
									options={volumeOptions}
									registration={register("obem", {
										required: t("selectBrandRequired"),
									})}
									error={errors.obem?.message?.toString()}
								/>

								{/* VIN-код */}

								<InputComponent
									placeholder={t("code")}
									type="text"
									registration={register("text")}
								/>

								{/* картинки */}

								<FileUpload
									onChange={(files) => {
										if (files) setValue("images", files);
									}}
									multiple
								/>
								{/* сообщение */}

								<TextareaComponent
									placeholder={t("textare")}
									registration={register("description")}
								/>
							</div>
						</div>
						<button className="bg-[#111218] text-white rounded-[50px]  w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
							{t("btn")}{" "}
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
