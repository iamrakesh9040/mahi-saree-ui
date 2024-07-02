import Link from "next/link";
import React from "react";
import { BsCheck2, BsCheckAll } from "react-icons/bs";

const LoginDetails = () => {
  return (
    <div className="w-full bg-white h-full rounded  py-4 md:px-6 px-2 flex justify-between items-center">
      <div className="flex gap-4">
        {/* <span className="">
            <p className=" bg-gray-200 text-blue-500 rounded py-0.5 px-2 text-sm font-semibold">
              1
            </p>
          </span> */}
        <article className="flex flex-col gap-2">
          <p className=" flex gap-2 items-center ">
            <span className="font-semibold text-gray-800">LOGIN</span>
            <BsCheck2 className=" text-2xl text-blue-500" />
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[1rem] text-gray-800 font-semibold">
              Hello
            </span>
            <span className="text-gray-800">YardHeath</span>
            <span className="text-gray-800">+916290467488</span>
          </p>
        </article>
      </div>
      {/* <Link href="/login" className=" text-blue-500 border md:py-2 py-1 md:px-5 px-3 md:text-sm text-sx md:font-semibold cursor-pointer">CHANGE</Link> */}
      <Link
        href="/login"
        className=" rounded-md border-primary overflow-hidden relative group cursor-pointer text-blue-500 border md:py-2 py-1 md:px-5 px-3 md:text-sm text-sx md:font-semibold"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gradient-to-r from-cyan-500 to-blue-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-primary transition duration-300 group-hover:text-white ease font-semibold">
          CHANGE
        </span>
      </Link>
    </div>
  );
};

export default LoginDetails;
