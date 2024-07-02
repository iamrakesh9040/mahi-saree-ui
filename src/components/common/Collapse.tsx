// components/Accordion.tsx
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: JSX.Element;
}

const Collapse: React.FC<AccordionProps> = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full flex flex-col">
      <div
        className="w-full  text-gray-800 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-full p-5 common-transition  capitalize font-semibold tracking-wide flex items-center justify-between
        ${
          isOpen
            ? "bg-gray-700/5 bg-opacity-70 text-gray-700 rounded-t-xl"
            : "text-gray-600 rounded-xl bg-white hover:bg-gray-700/5"
        }
        `}
        >
          <div className="flex items-center gap-5 text-lg font-semibold text-gray-800">
            {icon}
            {title}
          </div>

          {isOpen ? (
            <MdOutlineKeyboardArrowUp className=" text-xl text-gray-800 common-transition duration-500" />
          ) : (
            <MdOutlineKeyboardArrowDown className=" text-xl text-gray-800 common-transition duration-500" />
          )}
        </div>
        <div
          className={`animate-collapse grid common-transition ease-in-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] "
          }`}
        >
          <div className="overflow-hidden description text-sm md:text-base">
            <div className="group hover:text-gray-500/30  flex items-center gap-1  p-4 hover:bg-gray-500/5  text-sm common-transition border border-t-0 rounded-b-xl  ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collapse;
