// "use client";

// import { ImCamera } from "react-icons/im";
// import { IoAdd } from "react-icons/io5";
// import { useState } from "react";
// import { useTranslations } from "next-intl";

// interface Props {
// 	onChange?: (files: FileList | null) => void;
// 	error?: string;
// 	multiple?: boolean;
// }

// export function FileUpload({ onChange, error, multiple = false }: Props) {
// 	const [images, setImages] = useState<string[]>([]);

 
// 	const t = useTranslations("Forma");

	 

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const files = e.target.files;
// 		if (!files || files.length === 0) return;
	
// 		console.log("Файлы выбраны:", files);
// 		console.log("Количество файлов:", files.length);
	
// 		const fileURLs = Array.from(files).map((file) => URL.createObjectURL(file));
// 		setImages((prev) => [...prev, ...fileURLs]);
	
// 		onChange?.(files);
// 	};

// 	return (
// 		<div className="flex gap-1 flex-wrap">
// 			{images.map((img, index) => (
// 				<div key={index} className="relative w-[55px] h-[55px] overflow-hidden">
// 					<img
// 						src={img}
// 						alt="preview"
// 						className="rounded w-full h-full object-cover absolute"
// 					/>
// 				</div>
// 			))}

// 			{images.length === 0 ? (
// 				<label className="flex flex-col justify-center items-center w-full h-[55px] bg-[#F2F2F2] text-gray-600 text-sm rounded-[14px] cursor-pointer hover:opacity-80 transition">
// 					<div className="flex items-center gap-3 text-[#8F8F95]">
// 						<ImCamera size={20} />
// 						<span className="text-[#8F8F95]">{t("add")}</span>
// 					</div>

// 					<input
// 						type="file"
// 						accept="image/*"
// 						multiple={multiple}
// 						onChange={handleChange}
// 						className="hidden"
// 					/>
// 				</label>
// 			) : (
// 				<label className="flex flex-col justify-center items-center w-[55px] h-[55px] bg-[#F2F2F2] text-gray-600 text-sm rounded-[10px] cursor-pointer hover:opacity-80 transition">
// 					<IoAdd size={28} />
// 					<input
// 						type="file"
// 						accept="image/*"
// 						multiple={multiple}
// 						onChange={handleChange}
// 						className="hidden"
// 					/>
// 				</label>
// 			)}

// 			{error && <p className="text-red-500 text-sm">{error}</p>}
// 		</div>
// 	);
// }

import { useEffect, useState } from "react";
import { ImCamera } from "react-icons/im";
import { IoAdd, IoCloseCircleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";

interface Props {
  onChange?: (files: FileList | null) => void;
  onRemove?: (file: File) => void;
  error?: string;
  multiple?: boolean;
  files?: File[];
}

export function FileUpload({ onChange, onRemove, error, multiple = false, files = [] }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const t = useTranslations("Forma");

  // Обновляем локальный массив URL при изменении files (пропса)
  useEffect(() => {
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImages(fileURLs);

    // Очистка URL при размонтировании или изменении
    return () => {
      fileURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    console.log("Файлы выбраны:", selectedFiles);
    console.log("Количество файлов:", selectedFiles.length);

    onChange?.(selectedFiles);

    // Сбросить значение input, чтобы можно было выбрать те же файлы повторно
    e.target.value = "";
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {images.map((img, index) => (
        <div key={index} className="relative w-[55px] h-[55px] overflow-hidden rounded">
          <img
            src={img}
            alt="preview"
            className="rounded w-full h-full object-cover absolute"
          />
          {/* Кнопка удаления */}
          <button
            type="button"
            onClick={() => onRemove && onRemove(files[index])}
            className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition"
            aria-label="Удалить изображение"
          >
            <IoCloseCircleOutline size={18} />
          </button>
        </div>
      ))}

      {/* Кнопка добавления файлов */}
      <label
        className={`flex flex-col justify-center items-center ${
          images.length === 0 ? "w-full h-[55px]" : "w-[55px] h-[55px]"
        } bg-[#F2F2F2] text-gray-600 text-sm rounded cursor-pointer hover:opacity-80 transition`}
      >
        {images.length === 0 ? (
          <div className="flex items-center gap-3 text-[#8F8F95]">
            <ImCamera size={20} />
            <span className="text-[#8F8F95]">{t("add")}</span>
          </div>
        ) : (
          <IoAdd size={28} />
        )}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
