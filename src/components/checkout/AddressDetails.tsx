import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AddressCard } from "../card";
import { Button } from "@/core";
interface AddressDetailsProps {
  orderSummaryOpen: boolean;
  addressOpen: boolean;
  setOrderSummaryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressDetails = ({
  addressOpen,
  orderSummaryOpen,
  setOrderSummaryOpen,
  setAddressOpen,
  AllAddress,
  mutate,
  checkedAddress,
  setCheckedAddress,
  addressValidate,
}: any) => {
  return (
    <div
      className="w-full bg-white h-full rounded 
    flex flex-col gap-2 justify-center  "
    >
      <div>
        <span
          onClick={() => setAddressOpen(true)}
          className="flex items-center justify-between w-full p-5 font-medium text-left border-b-2"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <p className=" flex gap-2 items-center">
            <span className="font-semibold text-gray-800 uppercase">
              DELIVERY ADDRESS
            </span>
            {/* {
              checkAddress && (
                <BsCheck2 className=" text-2xl text-blue-500" />
              )
            } */}
          </p>
          {addressOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {addressOpen && (
        <div className=" w-full h-full  scroll  flex flex-col gap-2 p-1">
          {addressValidate ? (
            <div className="relative flex flex-col gap-3 w-full px-4 font-semibold ring-1 outline-none p-2 rounded-md ring-gray-300 bg-gray-50">
              <div className="flex justify-between items-center ">
                <div className=" flex items-center gap-5">
                  <p className="bg-gray-200 h-5 w-20 animate-pulse py-1 px-2 text-xs rounded-md text-white font-sub font-semibold uppercase"></p>

                  <p className="bg-gray-200 h-5 w-20 animate-pulse py-1 px-2 text-xs rounded-md text-gray-500 font-sub font-semibold uppercase"></p>
                </div>

                <div className=" flex flex-col gap-1">
                  <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                  <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                  <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                </div>
              </div>
              <span className="flex gap-4 ">
                <p className="font-semibold font-props w-40 h-8 bg-gray-200 animate-pulse rounded-md"></p>
                <p className="font-sub font-normal w-40 h-8 bg-gray-200 animate-pulse rounded-md"></p>
              </span>
              <span className="flex gap-4 ">
                <p className="font-semibold font-props w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
                <p className="font-sub font-normal w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
                <p className="font-sub font-normal w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
              </span>
            </div>
          ) : (
            AllAddress?.map((item: any) => (
              <article key={item?._id} className=" flex flex-col py-1">
                <div className=" flex gap-3 items-start p-2">
                  <input
                    onClick={() => {
                      setCheckedAddress(item?._id);
                    }}
                    type="radio"
                    name=""
                    id=""
                    checked={item?._id === checkedAddress}
                    className=" cursor-pointer w-6 h-6"
                  />

                  <AddressCard mutate={mutate} item={item} key={item?._id} />
                </div>
              </article>
            ))
          )}

          <div className=" w-full flex items-center justify-end ">
            <Button
              onClick={() => {
                setOrderSummaryOpen(!orderSummaryOpen);
                setAddressOpen(!addressOpen);
              }}
              disabled={checkedAddress?.length === 0}
            >
              Continue
            </Button>
          </div>

          <hr />
        </div>
      )}
    </div>
  );
};

export default AddressDetails;
