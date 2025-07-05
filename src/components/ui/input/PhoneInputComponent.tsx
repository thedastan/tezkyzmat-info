"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { twMerge } from "tailwind-merge";
import { FieldsProps } from "./fields.types";
import { useTranslations } from "next-intl";

interface Props<T extends FieldValues> extends FieldsProps {
	control?: Control<T>;
	required?: boolean;
	name?: Path<T>; // Используем Path<T> вместо string
}

const PhoneInputComponent = <T extends FieldValues>({
	control,
	required = true,
	name = "phone" as Path<T>,
	margin,
}: Props<T>) => {
	const t = useTranslations("PhoneInput");

	return (
		<div className={twMerge(margin)}>
			<Controller
				name={name}
				control={control}
				rules={
					control && {
						required: required ? "Введите номер телефона" : required,
						validate: (value) => {
							if (!value || value.trim() === "") {
								return required ? "Введите номер телефона" : true;
							}
							const digitsOnly = value.replace(/\D/g, "");
							return digitsOnly.length < 9 ? t("message") : true;
						},
					}
				}
				render={({ field, fieldState }) => {
					// Отладка
					// console.log("PhoneInput value:", field.value);

					return (
						<>
							<PhoneInput
								defaultCountry="kg"
								value={field.value || ""}
								onChange={field.onChange}
								onBlur={field.onBlur}
								className="phoneInput"
							/>
							{fieldState.error && (
								<p className="mt-1 text-sm text-red-500">
									{fieldState.error.message}
								</p>
							)}
						</>
					);
				}}
			/>
		</div>
	);
};

export default PhoneInputComponent;
