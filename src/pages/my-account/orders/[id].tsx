/* eslint-disable @next/next/no-img-element */
import { CancelOrderForm } from "@/components/forms";
import ReturnOrderForm from "@/components/forms/ReturnOrderForm";
import { Button } from "@/core";
import useAuth from "@/hooks/useAuth";
import useMutation, { getAccessToken } from "@/hooks/useMutation";
import useSwr from "@/hooks/useSwr";
import { PublicLayout } from "@/layouts";
import { BASE_URL } from "@/utils";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaX } from "react-icons/fa6";
import { IoChevronForwardSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
interface statusProps {
  [x: string]: any;
  id: string;
  title: string;
  img: string;
  message?: boolean;
  status: string;
  destination: boolean;
  processing?: boolean;
}

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const MyOrder = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutation, isLoading: load } = useMutation();
  const { data, isValidating, mutate } = useSwr(
    !user?._id ? `` : `order/${router?.query?.id}`
  );

  const { data: retrieveData, mutate: cancelMutate } = useSwr(
    user?._id ? `retrieve/${router?.query?.id}` : ``
  );
  const item = data;
  const { data: supportData, mutate: supportMutate } = useSwr(
    `support/${data?._id}`
  );
  const quantity = item?.product?.map((pre: any) => pre?.quantity);
  const [cancel, setCancel] = useState(false);
  const [returnData, setReturnData] = useState(false);
  const statuses = [
    {
      id: "1",
      title: "Placed",
      destination: [
        "INITIATE",
        "PICKED",
        "CANCELLED",
        "TRANSITS",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      img: "/order/rcv.png",
      message: [
        "INITIATE",
        "PICKED",
        "CANCELLED",
        "TRANSITS",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      status: "Your order has been  Confirmed",
      processing: [
        "PICKED",
        "TRANSITS",
        "CANCELLED",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
    },

    {
      id: "2",
      title: "Picked",
      destination: [
        "PICKED",
        "TRANSITS",
        "CANCELLED",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      img: "/order/pick.png",
      message: [
        "PICKED",
        "TRANSITS",
        "CANCELLED",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      status: "Your order has been picked up by your courier partner",
      processing: [
        "TRANSITS",
        "PROCESSING",
        "CANCELLED",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
    },
    {
      id: "3",
      title: "Cancelled",
      destination: [
        "TRANSITS",
        "PROCESSING",
        "CANCELLED",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      img: "/order/cancel.png",
      message: [
        "TRANSITS",
        "PROCESSING",
        "CANCELLED",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      status: "Your order has been cancelled",
      isCancelled: item?.status === "CANCELLED" ? true : false,
    },

    {
      id: "4",
      title: "Transit",
      destination: [
        "TRANSITS",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
      ]?.includes(item?.status),
      img: "/order/transit.png",
      message: ["TRANSITS", "PROCESSING", "COMPLETED", "RETURNED"]?.includes(
        item?.status
      ),
      status: "Your order is on its way to customers address",
      processing: ["PROCESSING", "COMPLETED", "RETURNED"]?.includes(
        item?.status
      ),
      isCancelled: item?.status === "CANCELLED" ? false : true,
    },
    {
      id: "5",
      title: "Out For Delivery",
      destination: ["PROCESSING", "COMPLETED", "RETURNED"]?.includes(
        item?.status
      ),
      img: "/order/out.png",
      message: ["PROCESSING", "COMPLETED", "RETURNED"]?.includes(item?.status),
      status: "The courier executive  is on the way to your doorstep",

      processing: ["COMPLETED", "RETURNED"]?.includes(item?.status),
      isCancelled: item?.status === "CANCELLED" ? false : true,
    },
    {
      id: "6",
      title: "Reached Location",
      destination: ["COMPLETED", "RETURNED"]?.includes(item?.status),
      img: "/order/location.png",
      message: ["COMPLETED", "RETURNED"]?.includes(item?.status),
      status: "Your order has reached your Destination",
      processing: ["RETURNED"]?.includes(item?.status),
      isCancelled: item?.status === "CANCELLED" ? false : true,
    },
    {
      id: "7",
      title: "Returned",
      destination: ["RETURNED"]?.includes(item?.status),
      img: "/order/return.png",
      message: item?.status === "RETURNED",
      status: "Your order has been returned",
      isCancelled: item?.status === "RETURNED" ? true : false,
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      const res = await mutation(`support`, {
        method: "POST",
        body: {
          orderId: item?._id,
          name: item?.name,
          email: item?.email,
          title: values?.subject,
          description: values?.message,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        setHelpOpen(false);
        supportMutate();
        toast.success(res?.results?.msg);
        Swal.fire("Info", res?.results?.msg, "info");
      } else {
        Swal.fire("Info", res?.results?.msg, "info");
      }
    } catch (error) {
      Swal.fire(
        "Info",
        "Server not available, Please try after sometime!",
        "info"
      );
    }
  };

  const handelDownloadInvoice = async (orderId: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/order/pdfgenerate/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const data = await res.blob();
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Invoice.pdf";
      a.click();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };
  return (
    <PublicLayout title="Order Details | Shreyan">
      <CancelOrderForm
        item={data}
        orderId={item?._id}
        open={cancel}
        close={() => setCancel(false)}
        mutate={mutate}
        cancelMutate={cancelMutate}
      />
      <ReturnOrderForm
        item={data}
        orderId={item?._id}
        open={returnData}
        close={() => setReturnData(false)}
        mutate={mutate}
      />
      <section className="main-container py-10 w-full h-full flex flex-col gap-5 justify-center">
        <div className="flex gap-1 items-center p-1 text-xs text-gray-500 font-semibold font-sub ">
          <Link
            href={"/my-account"}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            My Account
          </Link>
          <IoChevronForwardSharp />
          <Link
            href={"/my-account/orders"}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            My Orders
          </Link>
          <IoChevronForwardSharp />
          <p>{item?._id}</p>
        </div>
        <article className="w-full bg-white rounded p-7 text-gray-800 font-semibold text-sm shadow-[0px_0px_4px_1px_#00000024] flex      md:items-center md:justify-between flex-col gap-5 md:flex-row">
          {isValidating ? (
            <span className="w-52 p-2.5 bg-slate-300 animate-pulse rounded-md"></span>
          ) : (
            <p className="text-[1rem]">Order id: {item?.orderId}</p>
          )}
          {isValidating ? (
            <span className="w-52 p-2.5 bg-slate-300 animate-pulse rounded-md"></span>
          ) : (
            <p className="flex items-center gap-2">
              <span>Last Update :</span>
              <span>{moment(item?.updatedAt).format("llll")}</span>
            </p>
          )}
        </article>
        <article className="flex lg:flex-row flex-col w-full  h-full bg-white shadow-[0px_0px_4px_1px_#00000024] rounded-md">
          <div className=" flex flex-col justify-center gap-3 lg:w-3/4  w-full p-6 md:border-r-[1px] border-b-2 h-full ">
            <p className="font-bold font-sub ">Delivery Address</p>
            {isValidating ? (
              <span className="w-52 p-2.5 bg-slate-300 animate-pulse rounded-md"></span>
            ) : (
              <p className=" text-gray-800 font-semibold text-[1rem]">
                {item?.location?.name}
              </p>
            )}
            {isValidating ? (
              <span className="w-full p-2 bg-slate-300 animate-pulse rounded"></span>
            ) : (
              <p className="font-sub text-gray-500">
                {item?.location?.landmark}, {item?.location?.address} ,
                {item?.location?.city} City - {item?.location?.pincode},{" "}
                {item?.location?.state}
              </p>
            )}
            <p className="flex flex-col ">
              <span className=" text-gray-800 font-semibold text-[1rem]">
                Phone number
              </span>
              {isValidating ? (
                <span className="w-52 p-2 bg-slate-300 animate-pulse rounded"></span>
              ) : (
                <span className="font-sub text-gray-500">
                  {item?.location?.phone}
                </span>
              )}
            </p>
            {item?.location?.altPhoneNumber && (
              <p className=" text-sm text-gray-400">
                This Order is also tracked by +91{" "}
                {item?.location?.altPhoneNumber}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-5 lg:w-1/2 w-full p-6 md:border-r-[1px] border-b-2  ">
            <p className="font-bold font-sub ">More actions</p>
            <map className="flex flex-col gap-3 items-center">
              <div className="flex gap-3 w-full justify-between items-center ">
                <span className="flex gap-3 items-center">
                  <img
                    src="/order/invoice.png"
                    className="object-contain w-8 h-8"
                    alt=""
                  />
                  <p className="text-sm font-sub">Download invoice</p>
                </span>
                <div
                  onClick={() => handelDownloadInvoice(item?._id)}
                  className="text-xs font-bold text-green-400 cursor-pointer py-2 px-8 border-2 border-green-400 bg-green-50 rounded-md"
                >
                  {isLoading ? (
                    <div
                      className="w-5 h-5 rounded-full animate-spin
                          border-y border-solid border-white border-t-transparent shadow-md"
                    ></div>
                  ) : (
                    `Download`
                  )}
                </div>
              </div>
              {["TRANSITS", "PROCESSING", "COMPLETED", "RETURNED"]?.includes(
                item?.status
              ) ? null : retrieveData?.type === "CANCELLED" ? (
                <div className="flex gap-3  w-full justify-between items-center">
                  <span className="flex gap-3 items-center">
                    <img
                      src="/order/cancel1.png"
                      className="object-contain w-8 h-8"
                      alt=""
                    />
                    <p className="text-sm font-sub">Cancel Order</p>
                  </span>

                  {retrieveData?.status === "PENDING" ? (
                    <p className="text-xs font-bold text-amber-500 cursor-pointer py-2 px-8 border-2 border-amber-400 bg-amber-100 rounded-md">
                      {retrieveData?.status}
                    </p>
                  ) : retrieveData?.status === "REJECTED" ? (
                    <p className="text-xs font-bold text-red-500 cursor-pointer py-2 px-8 border-2 border-red-400 bg-red-100 rounded-md">
                      {retrieveData?.status}
                    </p>
                  ) : retrieveData?.status === "APPROVED" ? (
                    <p className="text-xs font-bold text-green-500 cursor-pointer py-2 px-8 border-2 border-green-400 bg-green-100 rounded-md">
                      {retrieveData?.status}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="flex gap-3  w-full justify-between items-center">
                  <span className="flex gap-3 items-center">
                    <img
                      src="/order/cancel1.png"
                      className="object-contain w-8 h-8"
                      alt=""
                    />
                    <p className="text-sm font-sub">Cancel Order</p>
                  </span>
                  <p
                    onClick={() => {
                      setCancel(true);
                    }}
                    className="text-xs font-bold text-red-400 cursor-pointer py-2 px-8 border-2 border-red-400 bg-red-50 rounded-md"
                  >
                    Cancel
                  </p>
                </div>
              )}
              {["COMPLETED", "RETURNED"]?.includes(item?.status) ? (
                retrieveData?.type === "RETURNED" ? (
                  <div className="flex gap-3  w-full justify-between items-center">
                    <span className="flex gap-3 items-center">
                      <img
                        src="/order/return.png"
                        className="object-contain w-8 h-8"
                        alt=""
                      />
                      <p className="text-sm font-sub">Return Order</p>
                    </span>

                    {retrieveData?.status === "PENDING" ? (
                      <p className="text-xs font-bold text-amber-500 cursor-pointer py-2 px-8 border-2 border-amber-400 bg-amber-100 rounded-md">
                        {retrieveData?.status}
                      </p>
                    ) : retrieveData?.status === "REJECTED" ? (
                      <p className="text-xs font-bold text-red-500 cursor-pointer py-2 px-8 border-2 border-red-400 bg-red-100 rounded-md">
                        {retrieveData?.status}
                      </p>
                    ) : retrieveData?.status === "APPROVED" ? (
                      <p className="text-xs font-bold text-green-500 cursor-pointer py-2 px-8 border-2 border-green-400 bg-green-100 rounded-md">
                        {retrieveData?.status}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex gap-3  w-full justify-between items-center">
                    <span className="flex gap-3 items-center">
                      <img
                        src="/order/return.png"
                        className="object-contain w-8 h-8"
                        alt=""
                      />
                      <p className="text-sm font-sub">Return Order</p>
                    </span>
                    <p
                      onClick={() => {
                        setReturnData(true);
                      }}
                      className="text-xs font-bold text-red-400 cursor-pointer py-2 px-8 border-2 border-red-400 bg-red-50 rounded-md"
                    >
                      Return
                    </p>
                  </div>
                )
              ) : null}
            </map>
          </div>
        </article>
        {supportData?.length > 0 && (
          <article className="flex lg:flex-row flex-col w-full  h-full bg-white shadow-[0px_0px_4px_1px_#00000024] rounded-md">
            <div className="w-full flex flex-col gap-2 p-5">
              <p className="font-semibold text-xl font-sans">Support Created</p>
              {supportData?.map((pre: any) => (
                <div
                  key={pre?._id}
                  className="w-full flex flex-col gap-1 bg-white shadow-[0px_0px_4px_1px_#00000024] rounded-md p-4"
                >
                  <div className="w-full flex items-center justify-between">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold ">Support ID :</span>
                      <span className="text-xs font-semibold font-sans">
                        {pre?._id}
                      </span>
                      <span className="text-sm font-semibold">
                        Created At : {moment(pre?.createdAt).format("lll")}
                      </span>
                    </p>
                    <p
                      className={`${
                        pre?.status === "PENDING"
                          ? `bg-amber-100 text-amber-500 border-amber-500`
                          : pre.status === "PROCESS"
                          ? `bg-blue-100 text-blue-500 border-blue-500`
                          : `bg-green-100 text-green-500 border-green-500`
                      } font-medium text-sm rounded-md border px-4 py-2`}
                    >
                      {pre?.status}
                    </p>
                  </div>
                  <p className="flex items-center gap-3">
                    <span className=" font-semibold text-gray-900">
                      Issue Title :{" "}
                    </span>
                    <span>{pre?.title}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className=" font-semibold text-gray-900">
                      Message :{" "}
                    </span>
                    <span>{pre?.description}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className=" font-semibold text-gray-900">
                      Last Update :{" "}
                    </span>
                    <span>{moment(pre?.updatedAt).format("lll")}</span>
                  </p>
                  <p className=" flex flex-col gap-1">
                    <span className="font-semibold"> Reply :</span>
                    {pre?.reply?.length > 0 ? (
                      pre?.reply?.map((replayItems: any, i: number) => (
                        <span key={i} className="text-sm  text-gray-600 ">
                          {i + 1} : {replayItems?.msg}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm font-medium ">Not Provided</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </article>
        )}
        <article className="w-full bg-white rounded p-5 gap-5 md:gap-8 text-gray-800 font-semibold text-sm shadow-[0px_0px_4px_1px_#00000024] flex md:items-center md:justify-between flex-col md:flex-row ">
          <aside className="flex items-center gap-3 md:w-1/5">
            <span className="w-24 h-24">
              <img
                src="/order/out.png"
                className=" w-full h-full object-contain"
                alt=""
              />
            </span>
            <span className="flex flex-col gap-1">
              <p className=" font-semibold text-[1rem] text-gray-800">
                Order Info
              </p>
              <p className=" text-xs text-gray-500 font-normal">
                Shree Odisha Handloom Online Services !
              </p>
              <p className=" text-xs text-gray-500 font-normal">
                Total Quantity: {data?.totalQuantity}
              </p>
              {isValidating ? (
                <span className="w-20 p-2 bg-slate-300 animate-pulse rounded"></span>
              ) : (
                <p className="font-semibold text-sm text-gray-800">
                  Total: ₹{item?.totalPrice}
                </p>
              )}
            </span>
          </aside>

          <aside className="flex flex-col gap-5 md:w-[70%] w-full">
            <p className=" text-gray-800 font-semibold text-xl">Order Status</p>
            <div className=" w-full  h-full flex flex-col md:flex-row gap-5   items-start">
              {statuses.map((curEle: statusProps, index: number) => {
                return (
                  <ProductCard key={curEle.id} item={curEle} index={index} />
                );
              })}
            </div>
          </aside>
          {supportData?.[supportData?.length - 1]?.status === "RESOLVED" ||
          supportData?.length === 0 ? (
            <aside
              onClick={() => setHelpOpen(!helpOpen)}
              className="flex items-center justify-center gap-1 cursor-pointer text-primary md:w-[10%]"
            >
              <AiFillQuestionCircle className=" text-xl" />
              <span>Need Help?</span>
            </aside>
          ) : null}

          {/* help modal start */}
          {helpOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-[9999]">
              <div className="p-4 rounded-md  w-[38rem] h-fit  relative">
                <p
                  onClick={() => setHelpOpen(!helpOpen)}
                  className=" absolute md:-top-3 -top-8 md:-right-7 -right-0 cursor-pointer "
                >
                  <FaX className=" font-bold p-2 rounded-full border-2 border-white text-white text-4xl" />
                </p>
                <div className=" w-full h-full bg-white   rounded-lg mb-2 flex flex-col overflow-y-auto scroll p-5">
                  <Formik
                    initialValues={{
                      subject: "",
                      message: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ errors }) => (
                      <Form className="flex flex-col gap-3 w-full ">
                        <p className="text-[1rem] text-gray-600 pb-4 font-medium text-xl text-center">
                          Our Support Team Is Here To Help You 24 x 7
                        </p>

                        <Field
                          type="text"
                          name="subject"
                          className={`w-full rounded-md ring-1 outline-none p-4 font-light text-sm focus:ring-1 ${
                            errors.subject
                              ? "ring-red-500"
                              : "ring-gray-300 hover:ring-black"
                          }`}
                          placeholder="Enter subject"
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="text-red-500 font-light"
                        />
                        <Field
                          as="textarea"
                          type="text"
                          name="message"
                          className={`w-full rounded-md ring-1 outline-none p-4 font-light text-sm focus:ring-1 ${
                            errors.message
                              ? "ring-red-500"
                              : "ring-gray-300 hover:ring-black "
                          }`}
                          placeholder="Message"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 font-light"
                        />

                        {/* Repeat similar pattern for other fields */}

                        <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                          <Button loading={isLoading} type="submit">
                            Save Product
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
          {/* help modal End */}
        </article>
      </section>
    </PublicLayout>
  );
};
const ProductCard = ({ item, index }: { item: statusProps; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: index < 5 ? index * 0.1 : 0.5 }}
      exit={{ scale: 0, opacity: 0 }}
      viewport={{ once: true }}
      key={index}
      className={` ${
        item?.isCancelled === false ? `hidden` : `flex`
      } w-full justify-start  relative md:flex-col flex-row md:gap-3 gap-10`}
    >
      {item.processing && (
        <p className="top-4 md:w-full md:h-2 h-full w-1 md:border-b-2 border-l-2 z-30 border-dashed border-green-400 absolute  left-5"></p>
      )}

      <span className=" flex z-40">
        <img
          key={item.id}
          className="h-10 w-10 object-contain"
          src={item.img}
          alt=""
          style={{
            filter: item.destination ? "grayscale(0%)" : "grayscale(100%)",
          }}
        />
      </span>
      <span className="flex flex-col">
        <p className="  text-[0.8rem] font-bold">{item?.title}</p>
        <p className="text-[0.7rem] font-normal">
          {item.message && item?.status}
        </p>
      </span>
    </motion.div>
  );
};
export default MyOrder;
