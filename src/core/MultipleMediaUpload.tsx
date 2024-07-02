import { useMutation } from "@/hooks";
import { Delete } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "./Button";

type ImageUrlType = {
  url: string;
  type: string;
};
const MultipleMediaUpload = ({
  onClose,
  mutate,
  item,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  item: any;
}) => {
  const [images, setImages] = useState([] as any);
  const [imageURLS, setImageURLs] = useState([]);
  const { isLoading, mutation } = useMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const {} = useMutation();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push({ url: URL.createObjectURL(image), type: image.type })
    );
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }

  const handleDelete = (i: number) => {
    const newURLs = [...imageURLS];
    newURLs.splice(i, 1);
    setImageURLs(newURLs);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      images?.map((data: any) => formData?.append("productImage", data));
      const res = await mutation(`product/add-image/${item?.id}`, {
        method: "POST",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        mutate();
        setImageURLs([]);
        setImages([]);
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 h-full">
      {imageURLS.map((item: ImageUrlType, index) => (
        <>
          {item.type.split("/").includes("image") ? (
            <div className="relative shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden w-full h-52 border border-green-600">
              <img
                src={item.url}
                alt="not fount"
                className="h-full w-full object-cover"
              />
              <span
                className="text-red-500 absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <Delete />
              </span>
            </div>
          ) : (
            <div className="relative shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden">
              <video
                width="160px"
                height="160px"
                autoPlay
                muted
                loop
                className="rounded-md w-40 h-40 object-cover"
              >
                <source src={item.url} type="video/mp4" />
              </video>
              <span
                className="text-red-500 absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <Delete />
              </span>
            </div>
          )}
        </>
      ))}

      <div className="flex flex-col justify-center items-center gap-2 h-52">
        <div className="relative w-full h-full  grid place-items-center border border-black rounded-md">
          <button
            className="absolute w-full h-full bg-black/5 flex flex-col items-center justify-center gap-4 text-center text-black"
            onClick={() => inputRef.current?.click()}
          >
            <BiCloudUpload className="text-5xl" />
            <span className="text-xl">Upload Files</span>
          </button>
          <input
            className="opacity-0"
            type="file"
            multiple
            accept="image/* video/*"
            onChange={onImageChange}
            ref={inputRef}
          />
        </div>
        <Button loading={isLoading} onClick={handleSave}>
          Save Product
        </Button>
        {/* <button
          className="flex items-center justify-center gap-2  py-1.5 w-full rounded-md bg-black text-white font-medium tracking-wide text-lg"
          onClick={handleSave}
        >
          <Done /> Save
        </button> */}
      </div>
    </div>
  );
};

export default MultipleMediaUpload;
