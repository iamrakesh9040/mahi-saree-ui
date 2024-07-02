/* eslint-disable @next/next/no-img-element */
import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderById = () => {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const { mutation, isLoading } = useMutation();
  const { data, isValidating, mutate } = useSwr(
    router?.query?.id ? `order/${router?.query?.id}` : ``
  );

  const shippingAddress = data ? data.location : null;

  const handleOperation = async (id: any) => {
    try {
      const res = await mutation(`order/${id}`, {
        method: "PUT",
        body: {
          status: status,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        mutate();
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return (
    <AdminLayout title="Order Details | Shree Odisha Handloom">
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-2xl text-gray-900">
          Order Details
        </p>

        <div className="w-full h-fit bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-6 rounded-lg flex flex-col gap-5">
          <article className="flex md:items-center md:justify-between flex-col md:flex-row gap-6">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <span>Order ID :</span>
              <span className=" text-gray-800">{data?.orderId}</span>
            </p>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <span>Placed On :</span>
              <span className=" text-gray-800">
                {moment(data?.createdAt).format("lll")}
              </span>
            </p>
            <Button
              loading={isLoading}
              onClick={() => handleOperation(data?._id)}
              disabled={data?.orderStatus === "COMPLETED"}
            >
              Update
            </Button>
          </article>
          <div className="w-full flex md:items-center gap-6 border-b border-dashed py-2 flex-col md:flex-row">
            <div className="w-full flex items-center gap-3">
              <img
                src={
                  data?.user?.avatar
                    ? data?.user?.avatar
                    : "/userDefaultImage.png"
                }
                className="w-16 h-16 object-fill rounded-full"
                alt=""
              />
              <p className="flex flex-col">
                <span className=" text-sm font-medium text-gray-700">
                  {data?.user?.name}
                </span>
                <span className=" text-sm font-medium text-gray-700">
                  {data?.user?.email}
                </span>
                <span className=" text-sm font-medium text-gray-700">
                  {data?.user?.mobileNo}
                </span>
              </p>
            </div>
            <div className="w-full">
              <CustomInputField
                key="1"
                name="OrderStatus"
                type="select"
                value={data?.status}
                options={[
                  {
                    label: "INITIATE",
                    value: "INITIATE",
                  },
                  {
                    label: "PICKED",
                    value: "PICKED",
                  },
                  {
                    label: "TRANSITS",
                    value: "TRANSITS",
                  },
                  {
                    label: "PROCESSING",
                    value: "PROCESSING",
                  },
                  {
                    label: "COMPLETED",
                    value: "COMPLETED",
                  },
                  {
                    label: "RETURNED",
                    value: "RETURNED",
                  },
                  {
                    label: "CANCELLED",
                    value: "CANCELLED",
                  },
                ]}
                onChange={(e: any) => {
                  setStatus(e?.target?.value);
                }}
                fullWidth
                label="Order Status"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {data?.product?.map((pre: any) => (
              <div
                key={pre?.id}
                className="w-full flex md:items-center md:flex-row flex-col"
              >
                <div className="w-full flex items-center gap-4">
                  <img
                    src={pre?.image ? pre?.image : "/NotImage.jpg"}
                    className=" w-16 h-16 object-fill"
                    alt=""
                  />
                  <div className=" flex flex-col gap-1">
                    <p className="text-lg font-semibold capitalize">
                      {pre?.name}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className=" text-sm font-medium text-gray-500">
                        ₹{pre?.price}
                      </span>
                      <span className=" text-sm font-medium text-gray-500">
                        *
                      </span>
                      <span className=" text-sm font-medium text-gray-500">
                        {pre?.quantity}
                      </span>
                      <span className=" text-sm font-medium text-gray-500">
                        =
                      </span>
                      <span className=" text-sm font-medium text-gray-500">
                        ₹{pre?.price}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <p className=" font-medium text-gray-600">
                    Product Details :
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-500">
                      {pre?.description}
                    </p>
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {pre?.category}, {pre?.color}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-6 h-fit">
          <div className="w-full bg-white p-5 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] flex flex-col gap-5 h-full">
            <div className="w-full">
              <CustomInputField
                key="1"
                disabled={true}
                name="orderCancel"
                type="select"
                value={data?.status === "CANCELLED" ? "YES" : "NO"}
                options={[
                  {
                    label: "Order Cancelled",
                    value: "YES",
                  },
                  {
                    label: "Not Cancelled",
                    value: "NO",
                  },
                ]}
                onChange={(e: any) => {}}
                fullWidth
                label="Order Cancelled"
              />
            </div>
            <div className="w-full">
              <CustomInputField
                key="1"
                name="address"
                type="textarea"
                value={
                  shippingAddress
                    ? `${shippingAddress.name}, ${shippingAddress?.landmark},${shippingAddress?.city}, ${shippingAddress?.state},${shippingAddress.pincode}, Phone: ${shippingAddress.phone}`
                    : ""
                }
                multiline={true}
                rows={4}
                onChange={(e: any) => {}}
                fullWidth
                label="Shipping Address"
              />
            </div>
          </div>
          <div className="w-full bg-white px-5 py-4 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] flex flex-col gap-3 h-full">
            <p className=" font-semibold ">Total Order Summery</p>
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500">Total MRP :</span>
              <span className="text-sm text-gray-800">₹{data?.totalMrp}</span>
            </p>
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500">Discount on MRP:</span>
              <span className="text-sm text-green-500">
                -₹{data?.totalDiscountValue}
              </span>
            </p>
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500">Quantity :</span>
              <span className="text-sm text-gray-800">
                {data?.totalQuantity}
              </span>
            </p>
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500">Discount Price(%)</span>
              <span className="text-sm text-green-500">
                {data?.totalDiscount} %
              </span>
            </p>
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500">Coupon</span>
              <span className="text-sm text-gray-800">{data?.coupon}</span>
            </p>
            <hr className=" w-full border border-dashed" />
            <p className=" w-full flex justify-between">
              <span className="text-sm text-gray-500 ">Payment Method :</span>
              <span className="text-sm text-gray-900 font-medium ">
                {data?.paymentMode}
              </span>
            </p>
            <hr className="w-full border border-dashed" />
            <p className="w-full flex justify-between">
              <span className="text-sm text-gray-900 font-semibold">Total</span>
              <span className="text-sm text-gray-900 font-semibold">
                ₹{data?.totalPrice}
              </span>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderById;
