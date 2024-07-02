/* eslint-disable @next/next/no-img-element */
import CustomerRatings from "@/components/common/CustomerRatings";
import useSwr from "@/hooks/useSwr";
import { PublicLayout } from "@/layouts";
import { Dialog } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronForwardSharp } from "react-icons/io5";
import { MdStarBorder } from "react-icons/md";

const Orders = () => {
  const router = useRouter();
  const [ratingOpen, setRatingOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const [orderId, setOrderId] = useState<string>("");
  const { data: orderData, isValidating, mutate } = useSwr(`order/user`);
  const [rating, setRating] = useState(false);
  const [productId, setProductId] = useState<string>("");
  return (
    <PublicLayout>
      <RatingsModal
        open={ratingOpen}
        close={setRatingOpen}
        item={value}
        mutate={mutate}
        orderId={orderId}
      />
      <CustomerRatings
        open={rating}
        close={() => setRating(false)}
        productId={productId}
        mutate={mutate}
        orderId={orderId}
      />
      <section className="bg-slate-50">
        <main className="main-container py-10">
          {/* Desktop View */}
          <div className=" md:flex hidden flex-col w-full gap-3 relative h-full  ">
            <div className="flex gap-1 items-center p-1 text-xs text-gray-500 font-semibold font-sub ">
              <Link
                href="#"
                className="flex items-center gap-1 hover:text-blue-500"
              >
                Home
              </Link>
              <IoChevronForwardSharp />
              <Link
                href={"/my-account"}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                My Account
              </Link>
              <IoChevronForwardSharp />
              <p>My orders</p>
            </div>

            {isValidating ? (
              <>
                <OrderLoading />
                <OrderLoading />
                <OrderLoading />
              </>
            ) : (
              orderData?.map((item: any, index: number) => {
                return (
                  <article
                    key={index}
                    className="bg-white rounded-md shadow-[0px_0px_2px_1px_#00000024]  py-4 px-6 w-full h-full flex flex-col gap-5"
                  >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-5 ">
                      <p className="flex flex-col md:flex-row md:items-center items-start md:gap-6 gap-3">
                        <span className="py-3 text-gray-800 px-5 bg-gray-200 rounded-2xl font-medium md:text-[1rem] text-sm">
                          Order Id:{" "}
                          <span className=" text-primary font-medium tracking-wider">
                            {item?.orderId}
                          </span>
                        </span>
                        <span className="text-gray-800  font-semibold">
                          Order Placed:{" "}
                          <span className=" text-sm">
                            {" "}
                            {moment(item?.createdAt).format("lll")}
                          </span>
                        </span>
                      </p>
                      <Link
                        href={`/my-account/orders/${item._id}`}
                        className="flex items-center gap-2 bg-primary px-8 py-2  text-white font-medium rounded-md "
                      >
                        <BiCurrentLocation />
                        <span className=" uppercase"> Track order</span>
                      </Link>
                    </div>
                    <hr />
                    <div className=" flex flex-col gap-5  lg:flex-row items-start justify-between w-full">
                      <div className="lg:w-[50%] w-full flex flex-col gap-4">
                        {item?.product?.map((pre: any) => (
                          <div
                            key={pre?.id}
                            className=" flex items-center gap-5  w-full"
                          >
                            <Link
                              href={`/products/${pre?.id}?variantId=${pre?.variantId}`}
                              className="md:w-28 w-24 h-16 md:h-20 md:p-2 p-1 bg-slate-100 rounded-md shadow-[0px_0px_3px_1px_#00000024]"
                            >
                              <img
                                src={pre?.image}
                                className=" w-full h-full  object-contain"
                                alt=""
                              />
                            </Link>
                            <div className="flex flex-col gap-1">
                              <p className=" font-semibold text-gray-800 md:text-[1.3rem] text-[1rem]">
                                {pre?.name}
                              </p>
                              {/* <span className="md:text-sm text-xs text-gray-600">
                                <ExpandText limit={4} text={pre?.description} />
                              </span> */}
                              {item?.status === "COMPLETED" && (
                                <span className="md:text-sm text-xs text-gray-600">
                                  <p className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, index) => (
                                      <Fragment key={index}>
                                        {pre?.star >= index + 1 ? (
                                          <FaStar className=" text-amber-400 text-lg" />
                                        ) : (
                                          <MdStarBorder
                                            fontSize="inherit"
                                            color="inherit"
                                            className="text-lg"
                                          />
                                        )}
                                      </Fragment>
                                    ))}
                                  </p>
                                </span>
                              )}
                              <span className=" flex items-center md:gap-5 gap-2">
                                <p className="flex items-center gap-2 ">
                                  <span className=" font-normal text-gray-800 text-sm ">
                                    Category
                                  </span>
                                  <span className=" font-normal text-gray-800 text-xs">
                                    {pre?.category}
                                  </span>
                                </p>
                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                <p>Qty: {pre?.quantity}</p>
                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                <p className=" capitalize">
                                  Color : {pre?.color}
                                </p>
                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                <p className=" text-gray-800 font-semibold text-lg">
                                  Rs.{pre?.price}
                                </p>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="lg:w-[25%] w-full flex flex-col gap-1 ">
                        <p className="text-[1.3rem] font-semibold text-gray-500 text-left">
                          Status
                        </p>
                        <span className=" flex items-center gap-2">
                          <p className=" p-1.5 rounded-full bg-green-500"></p>
                          <p className=" text-gray-800 font-semibold text-left">
                            {item?.status}
                          </p>
                        </span>

                        <p className=" text-gray-800  capitalize  text-left">
                          Your items has been{" "}
                          <span className=" capitalize">{item?.status}</span>
                        </p>
                        {item?.status === "COMPLETED" && (
                          <p
                            onClick={() => {
                              setRatingOpen(!ratingOpen);
                              setValue(item?.product);
                              setOrderId(item?._id);
                            }}
                            className="cursor-pointer flex items-center gap-2 text-blue-600 font-semibold"
                          >
                            <AiOutlineStar />
                            <span>Review & Ratings</span>
                          </p>
                        )}
                      </span>
                      <span className="flex flex-col lg:w-[20%] w-full lg:items-end ">
                        <p className="text-gray-600 text-[1rem]">
                          Delivery Expected By:
                        </p>
                        <p className=" text-gray-800 font-semibold text-xl">
                          {item?.deliveryDate
                            ? moment(item?.deliveryDate).format("ll")
                            : `Not Available`}
                        </p>
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </div>
          {/* Mobile View */}
          <div className=" flex md:hidden flex-col w-full gap-3 relative h-full  ">
            <div className="flex gap-1 items-center p-1 text-xs text-gray-500 font-semibold font-sub ">
              <Link
                href="#"
                className="flex items-center gap-1 hover:text-blue-500"
              >
                Home
              </Link>
              <IoChevronForwardSharp />
              <Link
                href={"/my-account"}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                My Account
              </Link>
              <IoChevronForwardSharp />
              <p>My orders</p>
            </div>
            {orderData?.map((item: any, index: number) => (
              <div
                key={index}
                className=" w-full rounded-xl bg-white shadow-[0px_0px_5px_0px_#00000024] py-4 flex flex-col gap-4"
              >
                <div className=" w-full flex items-center justify-between px-5">
                  <div className="flex items-center gap-3">
                    <p
                      className={`w-14 h-14  rounded-full flex items-center justify-center p-1
                                                ${
                                                  item?.status === "INITIATE" ||
                                                  item?.status === "PICKED"
                                                    ? `bg-blue-50`
                                                    : item?.status ===
                                                      "TRANSITS"
                                                    ? `bg-yellow-50`
                                                    : item?.status ===
                                                      "PROCESSING"
                                                    ? `bg-purple-50`
                                                    : `bg-green-50`
                                                }
                                            `}
                    >
                      <FaBoxesPacking
                        className={`${
                          item?.status === "INITIATE" ||
                          item?.status === "PICKED"
                            ? `text-blue-400`
                            : item?.status === "TRANSITS"
                            ? `text-yellow-400`
                            : item?.status === "PROCESSING"
                            ? `text-purple-400`
                            : `text-green-400`
                        }  text-3xl `}
                      />
                    </p>
                    <p className="flex flex-col gap-1">
                      <span className="text-gray-900 font-semibold uppercase">
                        Order {item?.status}
                      </span>
                      <span className=" text-xs font-normal text-gray-500">
                        Last Update : {moment(item?.createdAt).format("lll")}
                      </span>
                    </p>
                  </div>
                  <p
                    className=" cursor-pointer"
                    onClick={() =>
                      router.push(`/my-account/orders/${item._id}`)
                    }
                  >
                    <IoIosArrowForward className=" text-gray-500 text-3xl" />
                  </p>
                </div>
                <hr className=" bg-gray-200" />
                {item?.product?.map((pre: any) => (
                  <>
                    <div
                      key={pre?.id}
                      className="w-full flex items-center gap-4 px-5"
                    >
                      <img
                        src={pre?.image}
                        className="w-20 h-20 rounded-xl object-fill"
                        alt=""
                      />
                      <div className="flex w-full flex-col gap-2">
                        <p className=" font-medium text-gray-900">
                          {pre?.name}
                        </p>
                        <p className=" font-medium text-sm text-gray-500">
                          Category: {pre?.category}
                        </p>
                      </div>
                    </div>
                    <div className=" w-full flex flex-col gap-2 px-5 relative">
                      <span className=" absolute -top-2 right-2 font-medium text-xs  px-3 py-1.5 rounded-md bg-orange-300 text-white ">
                        Discount : {pre?.discount}%
                      </span>

                      <p className="font-medium text-gray-900 border-b border-dashed w-fit">
                        Product Details
                      </p>
                      <div className="w-full flex items-center justify-between">
                        <p className=" flex items-end gap-1">
                          <span className=" font-semibold text-gray-900">
                            Price : ₹{pre?.price}
                          </span>
                          <span className=" font-medium text-sm text-gray-500 line-through">
                            ₹{pre?.mrp}
                          </span>
                        </p>
                        <p className=" font-medium text-gray-900">
                          Quantity : {pre?.quantity}{" "}
                        </p>
                      </div>

                      <p className="w-full flex items-center justify-between">
                        <span className=" font-medium text-sm text-gray-500">
                          Color : {pre?.color}
                        </span>
                        <span className=" font-medium text-sm text-gray-500">
                          Size : XL
                        </span>
                      </p>
                      {item?.status === "COMPLETED" && (
                        <div className=" flex items-center justify-between">
                          <p className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, index) => (
                              <Fragment key={index}>
                                {pre?.star >= index + 1 ? (
                                  <FaStar className=" text-amber-400" />
                                ) : (
                                  <MdStarBorder
                                    fontSize="inherit"
                                    color="inherit"
                                  />
                                )}
                              </Fragment>
                            ))}
                          </p>
                          <p
                            onClick={() => {
                              setProductId(pre?.id);
                              setOrderId(item?._id);
                              setRating(true);
                            }}
                            className="text-blue-500  rounded-md text-sm font-medium  cursor-pointer"
                          >
                            Give Review
                          </p>
                        </div>
                      )}
                      <p className="flex items-center gap-2">
                        <span className=" font-medium text-gray-900">
                          Delivery Expected By:
                        </span>
                        <span className=" font-semibold text-gray-700 text-sm">
                          23 March 2024
                        </span>
                      </p>
                    </div>
                    <hr className=" bg-gray-200" />
                  </>
                ))}

                <div className="px-5 flex items-center justify-between w-full gap-7">
                  <p className="w-full flex items-center justify-center py-2  rounded-lg font-semibold text-red-400 cursor-pointer bg-red-50">
                    Cancel
                  </p>
                  <p
                    onClick={() =>
                      router.push(`/my-account/orders/${item._id}`)
                    }
                    className="w-full flex items-center justify-center py-2  rounded-lg font-semibold text-blue-500 cursor-pointer bg-blue-50"
                  >
                    Track
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </PublicLayout>
  );
};

export default Orders;

const RatingsModal = ({ open, close, item, mutate, orderId }: any) => {
  const [rating, setRating] = useState(false);
  const [productId, setProductId] = useState<string>("");
  return (
    <>
      <CustomerRatings
        open={rating}
        close={() => setRating(false)}
        productId={productId}
        mutate={mutate}
        orderId={orderId}
      />
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={() => close(false)}
        PaperProps={{
          style: {
            borderRadius: 18, // Adjust the value according to your preference
          },
        }}
      >
        <div className="w-[40rem] h-fit p-7 flex flex-col gap-5 items-center">
          <p className=" font-semibold text-xl">Review And Ratings</p>
          <div className="w-full flex flex-col gap-3">
            {item?.map((data: any) => (
              <div
                key={data?._id}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={data?.image}
                    className="w-16 h-16 rounded-xl object-fill"
                    alt=""
                  />
                  <p className="flex flex-col">
                    <span className="text-gray-900 font-semibold">
                      {data?.name}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {data?.category}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {data?.description}
                    </span>
                  </p>
                </div>
                <p
                  onClick={() => {
                    setProductId(data?.id);
                    setRating(true);
                  }}
                  className=" cursor-pointer text-sm px-4 py-1.5 rounded-lg bg-primary text-white font-medium"
                >
                  Give Rating
                </p>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};

const OrderLoading = () => {
  return (
    <article className=" bg-slate-100  rounded-xl  py-4 px-6 w-full h-full flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-5 ">
        <p className="flex flex-col md:flex-row md:items-center items-start md:gap-6 gap-3">
          <span className="bg-slate-300 animate-pulse w-36 p-3 rounded-md"></span>
          <span className="bg-slate-300 animate-pulse w-36 p-3 rounded-md"></span>
        </p>
        <div className="bg-slate-300 animate-pulse w-32 p-4 rounded-lg"></div>
      </div>
      <hr />
      <div className=" flex flex-col gap-5  lg:flex-row items-start justify-between w-full">
        <div className="lg:w-[50%] w-full flex flex-col gap-4">
          <div className=" flex items-center gap-5  w-full">
            <div className="w-16 h-16 bg-slate-300 animate-pulse p-5 rounded-md"></div>
            <div className="flex flex-col gap-1">
              <p className="bg-slate-300 animate-pulse w-36 p-2 rounded"></p>
              <span className="bg-slate-300 animate-pulse w-36 p-2 rounded"></span>

              <span className=" flex items-center md:gap-5 gap-2">
                <p className="bg-slate-300 animate-pulse w-36 p-2 rounded"></p>
                <p className="w-[0.02rem] h-6 bg-black "></p>
                <p className="bg-slate-300 animate-pulse w-36 p-2 rounded"></p>
                <p className="w-[0.02rem] h-6 bg-black "></p>
                <p className=" capitalize bg-slate-300 animate-pulse w-36 p-2 rounded"></p>
              </span>
            </div>
          </div>
        </div>
        <span className="lg:w-[25%] w-full flex flex-col gap-2 ">
          <p className="bg-slate-300 animate-pulse w-36 p-2.5 rounded"></p>
          <span className="bg-slate-300 animate-pulse w-36 p-2.5 rounded"></span>

          <p className=" bg-slate-300 animate-pulse w-36 p-2.5 rounded"></p>
        </span>
        <span className="flex flex-col lg:w-[20%] w-full lg:items-end gap-2 ">
          <p className=" bg-slate-300 animate-pulse w-28 p-3 rounded-md"></p>
          <p className="bg-slate-300 animate-pulse w-36 p-3 rounded-md"></p>
        </span>
      </div>
    </article>
  );
};
