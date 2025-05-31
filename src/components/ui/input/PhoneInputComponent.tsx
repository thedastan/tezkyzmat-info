import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { twMerge } from "tailwind-merge";
import { FieldsProps } from "./fields.types";

interface Props<T extends FieldValues> extends FieldsProps {
  control?: Control<T>;
  required?: boolean;
  name?: Path<T>; // Используем Path<T> вместо string
}

const PhoneInputComponent = <T extends FieldValues>({ control, required = true, name = "phone" as Path<T>, margin }: Props<T>) => {
  return (
    <div className={twMerge("mb-5", margin)}>
      <Controller
        name={name}
        control={control}
        rules={
          control && {
            required: required ? "Введите номер телефона" : required,
            validate: (value) =>
              value && value.length < 13
                ? "Введите корректный номер телефона"
                : true,
          }
        }
        render={({ field, fieldState }) => (
          <>
            <PhoneInput
              defaultCountry="kg"
              value={field.value || ""}
              onChange={field.onChange}
              className="phoneInput"
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PhoneInputComponent;
