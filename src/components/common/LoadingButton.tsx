// import { CircularProgress } from "@mui/material";

import { FaArrowRightLong } from "react-icons/fa6";

const LoadingButton = ({
  title,
  className,
  loading,
  handleClick,
  icon,
  type = "submit",
  isDisabled,
  circleClassName,
  circleSize,
}: {
  title?: string;
  className?: string;
  loading?: boolean;
  icon?: JSX.Element;
  handleClick?: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  circleClassName?: string;
  circleSize?: number;
}) => {
  return (
    <>
      {/* <button
      type={type}
      onClick={handleClick}
      className={`${className} ${
        loading
          ? "bg-secondary !py-2.5 cursor-not-allowed text-base text-primary flex items-center justify-center"
          : "bg-primary text-base text-white flex items-center justify-center"
      } common-transition`}
      disabled={loading}
    >
      {loading ? (
        <span className="w-full flex items-center justify-center">
          Loading.......
        </span>
      ) : (
        <span>
          {icon} {title}
        </span>
      )}
    </button> */}
      <button
        type={type}
        onClick={handleClick}
        className={`rounded-lg px-6 py-2 text-lg overflow-hidden relative group cursor-pointer border-2 font-medium  text-white
        ${loading ? " bg-primary/80" : "bg-primary"}
        `}
      >
        <span
          className={`absolute btn-primary w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20  top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease
        ${loading ? "bg-primary/80" : "bg-primary/80"}
        `}
        ></span>
        <p className="relative text-white transition duration-300 group-hover:text-white ease font-semibold ">
          {loading ? (
            <span className="flex items-center gap-5 text-center w-full">
              <span>Loading....</span>
              <span>
                <div
                  className="w-5 h-5 rounded-full animate-spin
                    border-y border-solid border-white border-t-transparent shadow-md "
                ></div>
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {title}
              <FaArrowRightLong className="text-sm" />
            </span>
          )}
        </p>
      </button>
    </>
  );
};

export default LoadingButton;
