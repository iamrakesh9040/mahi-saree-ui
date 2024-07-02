import { HiOutlinePlusSm } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";

const Counter = () => {
  return (
    <p className="w-fit flex items-center gap-8 bg-slate-100 p-2 rounded-full">
      <span className=" text-secondary rounded-full bg-white p-2  flex items-center justify-center cursor-pointer">
        <FiMinus size={18} />
      </span>
      <span>0</span>
      <span className=" text-secondary rounded-full bg-white p-2  flex items-center justify-center cursor-pointer">
        <HiOutlinePlusSm size={18} />
      </span>
    </p>
  );
};

export default Counter;
