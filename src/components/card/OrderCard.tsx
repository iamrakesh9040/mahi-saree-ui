/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import RatingReviewForm from "../forms/RatingReviewForm";

interface IOrderData {
  id: number;
  imageUrl: string;
  productName: string;
  description: string[];
  price: string;
  delivery_date: string;
}
interface TextAreaProps {
  rows: number;
  cols: number;
  placeholder: string;
  className: any;
}
const TextArea: React.FC<TextAreaProps> = ({
  rows,
  cols,
  placeholder,
  className,
}) => {
  return (
    <textarea
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      className={className}
    ></textarea>
  );
};

const OrderCard = ({ item, mutate }: { item: any; mutate: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openRatingForm = () => {
    setIsOpen(true);
  };
  const [ratingOpen, setRatingOpen] = useState(false);
  return (
    <article className=" flex flex-col lg:flex-row justify-between  gap-4 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md p-4 lg:p-6">
      <RatingReviewForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {item?.product?.map((data: any, i: number) => (
        <div
          key={i}
          className="w-full flex flex-col lg:flex-row justify-between gap-4 "
        >
          <img
            src={data?.image}
            alt=""
            className="w-full lg:w-[20%] h-40 object-contain"
          />
          <div className="w-full lg:w-[40%] flex flex-col gap-2">
            <h4 className="font-medium">{data?.name}</h4>
            {item?.description?.map((data: any, i: number) => (
              <div className="space-y-1.5" key={i}>
                <p className="text-sm">{data}</p>
              </div>
            ))}
          </div>
          <p className="w-full lg:w-[10%]  font-medium">{item.price}</p>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="">Delivered on {item.delivery_date}</p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
            <Link href={`/my-account/orders/${item?.id}`}>
              <p className="flex items-center gap-2 btn-primary px-8 py-2  text-white font-medium rounded-md ">
                <span>
                  <BiCurrentLocation />{" "}
                </span>
                <span className=" uppercase"> Track order</span>
              </p>
            </Link>
            {/* <p
          onClick={() => setRatingOpen(!ratingOpen)}
          className=" cursor-pointer flex items-center gap-2 text-primary font-semibold"
        >
          <AiFillStar />
          <span>Rate & Review Product</span>
        </p> */}
            <p
              className="flex gap-2 items-center cursor-pointer group"
              onClick={openRatingForm}
            >
              <span className="text-primary/80 group-hover:text-primary">
                <AiFillStar size={20} />
              </span>
              <span className="font-semibold text-primary/80 cursor-pointer group-hover:text-primary">
                Rate & Review Product
              </span>
            </p>
            {/* Rating modals */}
            {/* {ratingOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-[9999]">
            <div className="p-4 rounded-md  w-[25rem] h-fit  relative">
              <p
                onClick={() => setRatingOpen(!ratingOpen)}
                className=" absolute md:-top-3 -top-8 md:-right-7 -right-0 cursor-pointer "
              >
                <FaX className=" font-bold p-2 rounded-full border-2 border-white text-white text-4xl" />
              </p>
              <div className=" w-full h-full bg-white   rounded-lg gap-4 flex flex-col overflow-y-auto scroll p-6">
                <p className=" text-gray-500 font-light ">
                  Required fields are marked{" "}
                  <span className=" text-red-600">*</span>{" "}
                </p>

                <p className=" text-gray-500 font-light ">
                  Your rating <span className=" text-red-600">*</span>{" "}
                </p>

                <form action="" className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      id="floating_outlined"
                      className="block p-4  w-full ring-1 ring-gray-400 rounded text-gray-900 bg-transparent appearance-none  focus:outline-none   peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-125 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                    >
                      Title
                    </label>
                  </div>
                  <TextArea
                    rows={4}
                    cols={0}
                    placeholder={"Your Review"}
                    className=" outline-none ring-1 rounded ring-gray-400 p-4"
                  />
                  <button className=" w-full bg-primary text-center text-white rounded-md p-3">
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        )} */}
          </div>
        </div>
      ))}
    </article>
  );
};

export default OrderCard;
