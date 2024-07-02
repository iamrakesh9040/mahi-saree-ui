import { FormikProps } from "formik";
import { ChangeEvent, FocusEvent, Dispatch, SetStateAction } from "react";
import FileUpload from "./FileUpload";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  type?:
    | "text"
    | "select"
    | "date"
    | "file"
    | "number"
    | "email"
    | "autocomplete"
    | "string"
    | any;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  defaultImage?: string;
  id?: string | number;
  key?: string | number;
  helperText?: any;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  options?: { label: string | number; value: string | number }[];
  checked?: boolean;
  labelClass?: string;
  image?: File | null | string;
  styleContact?: string;
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  defaultValue?: string;
  label?: string;
  setIsImage?: any;
  formik?: FormikProps<any>;
  setId?: Dispatch<SetStateAction<number>>;
  fileAccept?:
    | ".csv"
    | ".xls"
    | ".xlsx"
    | "text/plain"
    | "image/*"
    | "text/html"
    | "video/*"
    | "audio/*"
    | ".pdf";
}

const InputField = ({
  type,
  value,
  label,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  name,
  disabled,
  labelClass,
  defaultImage,
  options,
  styleContact,
  onFileChange,
  id,
  key,
  rows,
  setIsImage,
  image,
  defaultValue,
  setId,
  fileAccept,
  formik,
}: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (formik) {
      formik.setFieldValue(name!, selectedValue);
    } else if (onChange) onChange(event as any);
  };

  switch (type) {
    case "text":
    case "password":
    case "number":
    case "date":
    case "email":
    case "time":
    case "autocomplete":
    case "string":
      return (
        <div className="flex flex-col font-[Poppins] gap-1">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            placeholder={placeholder}
            key={id}
            defaultValue={defaultValue}
            className={`${styleContact} ${
              error ? "border-red-500" : "border-quaternary"
            } input font-[Poppins] outline-none text-sm w-full border p-3`}
          />
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
    case "select":
      return (
        <div id={String(key) || String(id)} className="font-[Poppins] ">
          <select
            defaultValue={value || placeholder}
            onChange={handleSelectChange}
            className="select w-full font-[Poppins] outline-none border-quaternary font-normal border p-3"
          >
            {placeholder ? (
              <option disabled hidden selected>
                {placeholder}
              </option>
            ) : null}
            {options?.map((_, i) => (
              <option key={i} className="p-2 font-[Poppins]" value={_.value}>
                {_.label}
              </option>
            ))}
          </select>
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
    case "text_area":
      return (
        <div className="font-[Poppins]">
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange as any}
            onBlur={handleInputBlur as any}
            disabled={disabled}
            placeholder={placeholder}
            key={id}
            rows={rows}
            defaultValue={defaultValue}
            className={`${styleContact} ${
              error ? "border-red-500" : "border-quaternary"
            } input outline-none  font-[Poppins] text-sm border p-3 textarea textarea-bordered textarea-lg w-full`}
          />
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
    case "file":
      return (
        <div className={styleContact}>
          <FileUpload
            image={image}
            defaultImage={defaultImage}
            onChange={onFileChange}
            className={styleContact}
            id={id!}
            setIsImage={setIsImage}
          />
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
    case "file-no-preview":
      return (
        <div
          id={String(id)}
          className="font-[Poppins] relative w-full h-fit overflow-hidden"
        >
          {image ? (
            <div className="absolute right-0 overflow-hidden rounded-r-lg h-full w-10">
              <button
                onClick={() => {
                  setIsImage(null), setId && setId((prev) => prev + 1);
                  // formik && formik.setFieldError(name!, helperText);
                  formik?.resetForm();
                }}
                className="text-xl h-full w-full text-white flex items-center justify-center bg-secondary"
              >
                <AiFillDelete />
              </button>
            </div>
          ) : null}
          <input
            type="file"
            name={name}
            // value={image}
            onChange={onFileChange}
            disabled={disabled}
            placeholder={placeholder}
            key={id}
            accept={fileAccept}
            defaultValue={defaultValue}
            className={`${styleContact} ${
              error ? "border-red-500" : "border-quaternary"
            } file-input file-input-bordered outline-none text-sm border w-full`}
          />
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-1 font-[Poppins] ">
          <label className={labelClass}>{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={`${styleContact} ${
              error ? "!border-red-500" : "border border-quaternary"
            } custom_input_field_r outline-none w-full p-2  rounded-md bg-transparent`}
          />
          {error && (
            <span className="text-xs px-2 text-red-400 tracking-wider">
              {helperText}
            </span>
          )}
        </div>
      );
  }
};

export default InputField;
