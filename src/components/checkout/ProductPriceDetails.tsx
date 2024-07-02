/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductPriceDetails = ({ data, couponAmount, setCouponAmount }: any) => {
  const { data: couponData } = useSwr(`coupon`);
  const { data: userCoupon } = useSwr(`coupon/user-coupon`);
  const [check, setCheck] = useState<string>("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [voucher, setVoucher] = useState<any>({});
  const applyCoupon = (item: any) => {
    setCouponAmount(item?.amount);
    setCheck(item?._id);
  };
  function validate(data: any, categoryId: string, value: number) {
    if (data?.amountDetails?.totalPrice >= value) {
      for (let i = 0; i < data?.data?.length; i++) {
        if (data?.data?.[i]?.product?.category?._id !== categoryId) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-10 pb-5">
      <div className=" w-full flex items-center justify-between gap-2 p-5 border-b">
        <h2 className="text-2xl text-gray-500 font-semibold uppercase">
          Price Details
        </h2>

        <p className="lg:px-6 px-2.5 py-1 lg:text-base text-xs rounded-md bg-green-400 text-white font-medium">
          {data?.amountDetails?.totalDiscount}% Off
        </p>
      </div>

      <div className="flex flex-col gap-5 border-b-2 border-dashed pb-5">
        <p className=" w-full justify-between flex items-center px-5  text-gray-500">
          <span>{`Price (1 Items)`}</span>
          <span>₹{data?.amountDetails?.totalMrp}</span>
        </p>
        <p className=" w-full justify-between flex items-center px-5 text-[1rem] font-semibold text-green-600">
          <span>You Save</span>
          <span>₹{data?.amountDetails?.totalDiscountValue}</span>
        </p>
        <p className=" w-full justify-between flex items-center px-5  text-gray-500">
          <span>Delivery Charges</span>
          <span>₹25</span>
        </p>
        <div
          className={`w-full justify-between flex items-center px-5 text-gray-500 cursor-pointer ${
            couponOpen ? "border-t border-dashed pt-3" : ""
          }`}
          onClick={() => setCouponOpen(!couponOpen)}
        >
          <div className="flex items-center gap-3">
            <p>Apply Coupon</p>
            <p>
              {couponOpen ? (
                <FaChevronUp className="text-gray-800 text-xs" />
              ) : (
                <FaChevronDown className="text-gray-800 text-xs" />
              )}
            </p>
          </div>
          <span>- ₹{couponAmount}</span>
        </div>
        {couponOpen && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full px-4 animate-collapse ease-in-out duration-300"
          >
            <div className="border-2 rounded p-2 w-full flex gap-3 items-center">
              <input
                type="text"
                placeholder="Enter Voucher Code"
                className="w-full outline-none ring-1 ring-gray-300 rounded py-1.5 px-4 text-sm"
                value={voucher?.couponCode || ""}
              />
              <p className="text-green-600 cursor-pointer">Apply</p>
            </div>
            <div className="w-full flex flex-col gap-3 py-2 px-2">
              <p className="text-lg font-semibold text-gray-900 font-sans flex items-center gap-5">
                Offers
                {String(couponAmount)?.length > 1 && (
                  <span
                    onClick={() => {
                      setCouponAmount(0);
                      setCheck("");
                      setVoucher({});
                    }}
                    className="text-xs font-medium text-white bg-red-500 px-2 py-1 cursor-pointer rounded"
                  >
                    Remove
                  </span>
                )}
              </p>
              <div className="w-full grid grid-cols-2 items-center gap-2">
                {couponData?.map((item: any, index: number) => (
                  <div
                    onClick={() => {
                      if (
                        validate(data, item?.category?._id, item?.minAmount)
                      ) {
                        applyCoupon(item);
                      }
                    }}
                    key={index}
                    className={`border border-dashed  w-full p-2 h-fit flex flex-col gap-2 rounded-lg cursor-pointer
                  ${
                    validate(data, item?.category?._id, item?.minAmount)
                      ? check === item?._id
                        ? `bg-green-100 border-green-500`
                        : `bg-primary/10 border-primary`
                      : `bg-gray-200 border-gray-400`
                  }
                 
                  `}
                  >
                    <div className="flex items-center w-full gap-2">
                      <img
                        src="/discount.png"
                        className="w-6 h-6 object-cover"
                        alt=""
                      />
                      <p className=" text-sm font-semibold">
                        ₹{item?.amount} Off |{" "}
                        {item?.category?.name?.slice(0, 10)}...
                      </p>
                    </div>
                    <p className="text-xs font-medium text=gray-500 px-2 text-start">
                      {" "}
                      ₹{item?.amount} Off on {item?.category?.name} on above ₹
                      {item?.minAmount} rupees.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-900 font-sans flex flex-col gap-4 pl-3">
              Vouchers
              <div className="w-full grid grid-cols-1 items-center gap-2 relative">
                {userCoupon?.map((item: any, index: number) => (
                  <div
                    onClick={() => {
                      setVoucher(item);
                      applyCoupon(item);
                    }}
                    key={item?._id}
                    className="flex w-72 justify-between cursor-pointer "
                  >
                    <div className="bg-red-700 h-[8rem] w-[40%] rounded-md flex flex-col items-center justify-center p-3 relative">
                      <p className="text-white">₹{item?.amount}</p>
                      <p className="text-xs font-medium text-gray-200 px-2 text-start">
                        {" "}
                        off {item?.category?.name} on above ₹{item?.minAmount}{" "}
                        rupees.
                      </p>
                    </div>
                    <img
                      className="w-6 bottom-1 left-1 absolute"
                      src="/gift.png"
                      alt="gift"
                    />
                    <img
                      className="w-6 top-1 left-1 absolute"
                      src="/gift.png"
                      alt="gift"
                    />

                    <div className="bg-white h-4 w-4 rounded-full absolute -top-1 left-[6.7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-4 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-6 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-8 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-10 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-12 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute top-14 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute  top-16 left-[7rem]"></div>
                    <div className="bg-gray-100 h-[8rem] w-[60%] rounded-md flex flex-col gap-1 p-2">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-sm">Coupon Code</p>
                        <p className="border border-red-700 bg-white overflow-hidden w-fit flex items-center rounded-md px-2 py-1 pl-2">
                          <p className="text-sm text-black">
                            {item?.couponCode}
                          </p>
                        </p>
                      </div>
                      <p className="text-sm flex">
                        Start Date:
                        <p>{dayjs(item?.startDate).format("MMMM DD, YYYY")}</p>
                      </p>
                      <p className="text-sm flex gap-1">
                        End Date:
                        <p>{dayjs(item?.endDate).format("MMMM DD, YYYY")}</p>
                      </p>
                    </div>
                    <div className="bg-white h-1 w-1 rounded-full absolute bottom-[3.3rem] left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute bottom-11 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute bottom-9 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute bottom-7 left-[7rem]"></div>
                    <div className="bg-white h-1 w-1 rounded-full absolute bottom-5 left-[7rem]"></div>
                    <div className="bg-white h-4 w-4 rounded-full absolute -bottom-1 left-[6.7rem]"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <p className=" w-full justify-between flex items-center px-5 text-lg font-semibold text-gray-800">
        <span>Total Amount</span>
        <span>₹{data?.amountDetails?.totalPrice - couponAmount}</span>
      </p>
    </div>
  );
};

export default ProductPriceDetails;
