import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { HiMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";
interface ProductReviewProps {
  productReviewOpen: boolean;
  setProductReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paymentOpen: boolean;
  setPaymentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  capturedScreenshots: any;
  setCapturedScreenshots: any;
}
const ProductReview = ({
  productReviewOpen,
  setProductReviewOpen,
  paymentOpen,
  setPaymentOpen,
  capturedScreenshots,
  setCapturedScreenshots,
}: ProductReviewProps) => {
  return (
    <div
      className="w-full bg-white h-full rounded 
  flex flex-col gap-2 justify-center  "
    >
      <div>
        <span
          onClick={() => setProductReviewOpen(!productReviewOpen)}
          className="flex items-center justify-between w-full p-5 font-medium text-left border-b-2 "
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <p className=" flex gap-2 items-center">
            <span className="font-semibold text-gray-800 uppercase">
              Product Review
            </span>
            {/* {
            paymentOpen && (
              <BsCheck2 className=" text-2xl text-blue-500" />
            )
          }
          <BsCheck2 className=" text-2xl text-blue-500" /> */}
          </p>
          {productReviewOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {productReviewOpen && (
        <div className=" w-full h-full  scroll flex flex-col gap-2 py-3">
          <article className=" w-full flex flex-col gap-3 items-start justify-start py-2 px-10">
            <div className=" flex gap-5 items-center justify-center">
              {capturedScreenshots.map((item: any, index: any) => {
                return (
                  <span key={item.id} className="h-32 w-24 bg-slate-100 p-2">
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-fill"
                    />
                  </span>
                );
              })}

              <span className=" flex flex-col gap-3">
                <p className="flex flex-col">
                  <span className="text-xl text-gray-800 font-semibold">
                    Rounded Neck T-shirt
                  </span>
                  <span className="text-sm">Size: XL</span>
                  <span className="text-sm">Color: PolarWhite</span>
                </p>
                <p className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className="text-sm line-through">₹599</span>
                  <span className="text-gray-800 font-semibold text-lg">
                    ₹461
                  </span>
                  <span className="text-center px-4 py-1 text-white bg-orange-600 rounded-md text-sm font-semibold">
                    23% Off
                  </span>
                </p>
                <p className=" font-semibold text-orange-600 uppercase cursor-pointer">
                  Remove
                </p>
              </span>
            </div>
            {/* <div className="flex items-center gap-8 bg-slate-100 p-1 rounded-full">
            <HiMinusSmall className="p-2 bg-white rounded-full text-orange-600 text-4xl cursor-pointer"/>
            <span>1</span>
            <HiMiniPlusSmall className="p-2 bg-white rounded-full text-orange-600 text-4xl cursor-pointer"/>
          </div> */}
            <p className="w-full h-[0.11rem] bg-gray-300"></p>
            <p className=" w-full flex justify-end ">
              <span
                onClick={() => {
                  setPaymentOpen(!paymentOpen);
                  setProductReviewOpen(!productReviewOpen);
                }}
                className="rounded-md py-3  px-10 uppercase overflow-hidden relative group cursor-pointer border-2 font-medium bg-primary text-white"
              >
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gradient-to-r from-cyan-500 to-blue-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-300 group-hover:text-white ease font-semibold">
                  Continue
                </span>
              </span>
            </p>
          </article>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
