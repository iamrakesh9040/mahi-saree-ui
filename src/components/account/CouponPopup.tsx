import { useEffect, useRef } from "react";
import { FaX } from "react-icons/fa6";

interface MessageCardProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title: string;
  activeDate: string;
  expireDate: string;
  code: string;
}

const CouponPopup: React.FC<MessageCardProps> = ({
  isOpen,
  onClose,
  message,
  title,
  activeDate,
  expireDate,
  code,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="bg-white p-6 rounded shadow-md w-[80%] lg:w-[40%]"
    >
      <FaX
        onClick={onClose}
        className=" absolute top-2 right-2  text-gray-600 cursor-pointer"
      />

      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-semibold  text-lime-600 text-center">
          {title}
        </p>
        <p className="text-xl font-semibold  text-gray-800 text-center">
          {code}
        </p>
        <p className="  text-gray-800 text-center">{message}</p>
        <p className=" font-semibold text-gray-800 text-lg">
          Active Date :{" "}
          <span className=" font-normal text-gray-600">{activeDate}</span>{" "}
        </p>
        <p className=" font-semibold text-gray-800 text-lg">
          Expire Date :{" "}
          <span className=" font-normal text-gray-600">{expireDate}</span>{" "}
        </p>
      </div>
    </dialog>
  );
};

export default CouponPopup;
