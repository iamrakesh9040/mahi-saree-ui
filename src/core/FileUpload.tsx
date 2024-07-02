/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler } from "react";
import { ImBin } from "react-icons/im";
import { BiCloudUpload } from "react-icons/bi";

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  image?: any;
  className?: string;
  defaultImage?: string;
  title?: string;
  setIsImage?: any;
  id: number | string;
};

const FileUpload = ({
  onChange,
  image,
  className,
  defaultImage,
  title,
  setIsImage,
  id,
}: Props) => {
  return (
    <div
      style={{
        border: image ? `1px solid ` : "1px solid",
      }}
      className={`${className} overflow-hidden w-full min-h-[12rem] relative grid place-content-center rounded-md cursor-pointer`}
    >
      {image ? (
        <div className="relative h-60 w-full object-cover">
          <img
            src={image ? URL?.createObjectURL(image) : ""}
            className="w-full object-cover h-full"
            alt="image"
          />
        </div>
      ) : defaultImage ? (
        <img
          className="relative h-60 w-full object-cover"
          src={defaultImage}
          alt="default-image"
        />
      ) : (
        <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
          <BiCloudUpload
            // style={{ color: globalBackgroundColor }}
            className={`text-5xl text-primary`}
          />
          <small className="text-primary">{title || "Upload Image"}</small>
        </div>
      )}

      {image && (
        <span className="absolute bottom-0 z-50 cursor-pointer left-0 right-0">
          <div
            // style={{ backgroundColor: globalBackgroundColor }}
            onClick={() => setIsImage(null)}
            className="w-full text-white h-8 flex gap-1 items-center justify-center font-semibold"
          >
            <ImBin />
            Delete
          </div>
        </span>
      )}

      <input
        key={id}
        type="file"
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0 "
        onChange={onChange}
      />
    </div>
  );
};

export default FileUpload;
