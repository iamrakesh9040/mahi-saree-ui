import { useSwr } from "@/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import FooterEditFormModal from "./FooterEditFormModal";

const ShowData = () => {
  const [open, setOpen] = useState(false);
  const { data, mutate } = useSwr(`footer`);
  const [value, setValue] = useState<any>();

  return (
    <motion.div layout className=" w-full">
      <FooterEditFormModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        item={value}
      />

      <div className="flex items-center justify-end">
        <button
          // onClick={() => {
          //   setOpen(true);
          //   setValue(data);
          // }}
          className=" text-2xl text-green-500"
        >
          <BsPencilSquare />
        </button>
      </div>
      <div className="w-full pt-5 bottom-spacing lg:grid hidden">
        <div className="grid grid-cols-3">
          <p className="w-1/2  text-semibold text-lg">Logo:</p>
          <p className=" w-1/2 text-semibold text-lg">Title:</p>
          <p className="w-1/2  text-semibold text-lg">Description:</p>
        </div>
        {data?.map((item: any, index: any) => (
          <div key={index} className="grid grid-cols-3">
            <div className="w-full  flex items-center">
              <p className="w-32 h-24">
                <img src={item?.image} className="w-40 object-contain" alt="" />
              </p>
            </div>

            <div className="w-full flex items-center ">
              <p className=" font-semibold  ring-1 outline-none p-2  rounded-md ring-primary">
                {item?.title}
              </p>
            </div>
            <div className="w-full flex items-center ">
              <p className=" font-semibold  ring-1 outline-none p-2 rounded-md ring-primary">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:hidden flex">
        {data?.map((item: any, index: any) => (
          <div key={index} className="flex flex-col pt-3 gap-5">
            <p className="flex justify-between items-center gap-2">
              LOGO:{" "}
              <p className="w-28 h-24">
                <img src={item?.image} className="w-40 object-contain" alt="" />
              </p>
            </p>
            <p className="flex justify-between  items-center">
              TITLE:
              <p className="font-semibold  ring-1 outline-none p-2  rounded-md ring-primary">
                {item?.title}
              </p>
            </p>
            <p className="flex justify-between items-center">
              DESCRIPTION:{" "}
              <p className="pl-2  ring-1 outline-none p-1 rounded-md ring-primary">
                {item?.description}
              </p>
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ShowData;
