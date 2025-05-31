"use client";
import { FileUpload } from "@/components/ui/input/FileUpload";
import { InputComponent } from "@/components/ui/input/InputComponent";
import PhoneInputComponent from "@/components/ui/input/PhoneInputComponent";
import { TextareaComponent } from "@/components/ui/input/TextareaComponent";
import { Select } from "@/components/ui/select/Select";
import { Description } from "@/components/ui/text/Description";
import { useLanguageStore } from "@/stores/useLanguageStore";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

interface IForma {
	setModalOpen: (value: boolean) => void;
}

interface FormData {
  phone?: string;
  mySelect?: string;
  text?: string;
  images?: FileList | File[];
  description?: string;
}
const Forma = ({ setModalOpen }: IForma) => {
	const { t } = useLanguageStore();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

	const options = [
		{ label: "Option 1", value: "opt1" },
		{ label: "Option 2", value: "opt2" },
	];

	return (
		<div className="fixed z-20 inset-0   bg-black bg-opacity-50 flex justify-center items-center  ">
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
						<h1 className="text-center font-bold text-[36px]">
							{t("Forma.title")}
						</h1>
						<Description className="text-center mt-2">
							{t("Forma.desc")}
						</Description>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full max-w-[810px] overflow-y-auto md:overflow-y-visible">
						<div className=" w-full  flex  md:flex-row flex-col gap-4 ">
							<div className="flex md:hidden flex-col">
								<h1 className="text-center font-bold text-[36px]">
									{t("Forma.title")}
								</h1>
								<Description className="text-center mt-2">
									{t("Forma.desc")}
								</Description>
							</div>
							<div className="flex w-full flex-col gap-4">
								<div className=" h-[55px]">
									<PhoneInputComponent
										control={control}
										// label="Номер телефона"
									/>
								</div>

								<Select
									placeholder={t("Forma.select1")}
									options={options}
									registration={register("mySelect", {
										required: "Please select an option",
									})}
									error={errors.mySelect?.message?.toString()}
								/>

								<Select
									placeholder={t("Forma.select2")}
									options={options}
									registration={register("mySelect", {
										required: "Please select an option",
									})}
									error={errors.mySelect?.message?.toString()}
								/>

								<Select
									placeholder={t("Forma.select3")}
									options={options}
									registration={register("mySelect", {
										required: "Please select an option",
									})}
									error={errors.mySelect?.message?.toString()}
								/>

								<Select
									placeholder={t("Forma.select4")}
									options={options}
									registration={register("mySelect", {
										required: "Please select an option",
									})}
									error={errors.mySelect?.message?.toString()}
								/>
							</div>
							<div className="flex w-full h-f flex-col gap-4">
								<Select
									placeholder={t("Forma.select5")}
									options={options}
									registration={register("mySelect", {
										required: "Please select an option",
									})}
									error={errors.mySelect?.message?.toString()}
								/>

								<InputComponent
									placeholder={t("Forma.code")}
									type="text"
									registration={register("text")}
								/>

								<FileUpload
									onChange={(files) => setValue("images", files)}
									multiple
								/>

								<TextareaComponent
									placeholder={t("Forma.textare")}
									registration={register("description")}
								/>
							</div>
						</div>
						<button className="bg-[#111218] text-white rounded-[50px]  w-full mt-6 md:py-4 py-3 flex items-center justify-center gap-2 text-[18px]">
							{t("Forma.btn")}{" "}
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
