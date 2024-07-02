/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion } from "framer-motion";
import { useSwr } from "@/hooks";
import { Skelton } from "@/core";
import { useEffect, useState } from "react";

const NewArrival = () => {
  const { data, mutate, isValidating } = useSwr(`product/getAll`);
  const findData = data?.filter((pre: any) => pre?.isNewArrival === true);

  return (
    <section className=" bg-white w-full top-spacing">
      <div className=" main-container flex flex-col gap-5 ">
        <div className=" flex items-center justify-between">
          <p className=" flex flex-col gap-1">
            <span className="sub-title">New Arrivals</span>
            <span className="w-16 md:w-24 h-0.5 rounded-2xl bg-gradient-to-r  from-primary/90 to-primary/70"></span>
          </p>
          <Link href="/products">
            <p className="bg-primary rounded-lg text-white px-2 sm:px-3 md:px-10 py-1 sm:py-2 text-sm sm:text-base">
              View All
            </p>
          </Link>
        </div>
        {isValidating ? (
          <div className="w-full h-fit grid lg:grid-cols-6 md:grid-cols-3  grid-cols-2 gap-4">
            <NewArrivalSkeleton />
            <NewArrivalSkeleton />
            <NewArrivalSkeleton />
            <NewArrivalSkeleton />
            <NewArrivalSkeleton />
            <NewArrivalSkeleton />
          </div>
        ) : (
          <div className=" w-full h-fit grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 bg-white rounded-xl shadow-[0px_0px_2px_0px_#00000024] p-4">
            {findData?.map((item: any, i: number) => (
              <Link href={`/products/${item?.id}`} key={item?.id}>
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }} // Initial state (hidden)
                  animate={{ opacity: 1, y: 0 }} // Animation state (visible)
                  transition={{ duration: 0.5, delay: i * 0.1 }} // Transition effect
                  className=" w-full flex flex-col gap-1"
                >
                  <div className=" w-full h-44 group overflow-hidden relative flex items-center justify-center">
                    <p className=" absolute top-0 left-0 w-full h-full group-hover:bg-black/40  duration-300 rounded-xl cursor-pointer z-10"></p>
                    <img
                      src={item?.images?.[0]?.imageUrl || "/NotImage.jpg"}
                      className=" w-full h-full object-cover rounded-lg z-0"
                      alt=""
                    />
                  </div>

                  <p className=" text-gray-800  text-lg capitalize">
                    {item?.name}
                  </p>
                  <p className=" text-primary">₹{item?.price}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;

export const NewArrivalSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-2">
      <div className="w-full h-44 relative flex items-center justify-center">
        <div className=" absolute top-0 left-0 w-full h-full bg-gray-400 animate-pulse rounded-lg" />
      </div>

      <div className=" bg-gray-400 w-full h-4 animate-pulse" />
      <div className=" bg-gray-400 w-1/2 h-4 animate-pulse" />
    </div>
  );
};
