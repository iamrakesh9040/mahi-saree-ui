import { Button, Congratulation, PageLoader } from "@/core";
import { useAuth, useMutation, useSwr } from "@/hooks";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
interface PaymentProps {
  paymentOpen: boolean;
  setPaymentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productData: any;
  checkedAddress: string;
  couponAmount: number;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}
const Payment: React.FC<PaymentProps> = ({
  paymentOpen,
  setPaymentOpen,
  productData,
  checkedAddress,
  couponAmount,
}) => {
  const { user } = useAuth();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const { isLoading, mutation } = useMutation();
  const [selectedOption, setSelectedOption] = useState("");
  const [confirmPaymentOption, setConfirmPaymentOption] = useState(false);
  const { data: addressData } = useSwr(
    checkedAddress?.length > 0 ? `address/${checkedAddress}` : ``
  );
  const handelOrderPlaced = async () => {
    await Swal.fire({
      title: "Confirmations !",
      text: "Are you sure you want to order ...",
      icon: "info",
      showCancelButton: true,
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Yes, order",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        if (selectedOption === "COD") {
          try {
            let product: any = [];
            productData?.data?.map((item: any) =>
              product.push({
                id: item?.product?._id,
                image: item?.product?.images?.[0]?.imageUrl,
                mrp: item?.product?.mrp,
                price: item?.product?.price,
                discount: item?.product?.discount,
                discountValue: item?.product?.discountValue,
                size: item?.productSize,
                name: item?.product?.name,
                category: item?.product?.category?.name,
                color: item?.product?.color?.name,
                star: item?.product?.star || 0,
                quantity: item?.quantity,
              })
            );
            const res = await mutation(`order`, {
              method: "POST",
              isAlert: true,
              body: {
                totalMrp: productData?.amountDetails?.totalMrp,
                totalPrice:
                  productData?.amountDetails?.totalPrice - couponAmount,
                coupon: couponAmount || 0,
                totalDiscount: productData?.amountDetails?.totalDiscount,
                totalDiscountValue:
                  productData?.amountDetails?.totalDiscountValue,
                paymentMode: selectedOption,
                paymentId: selectedOption,
                product: product,
                location: {
                  name: addressData?.name,
                  phone: addressData?.phone,
                  alternativePhoneNumber: addressData?.alternativePhoneNumber,
                  address: addressData?.address,
                  state: addressData?.state,
                  city: addressData?.city,
                  landmark: addressData?.landmark,
                  type: addressData?.type,
                  pincode: addressData?.pincode,
                },
                totalQuantity: productData?.amountDetails?.totalQuantity,
              },
            });
            if (res?.status === 200) {
              setOrderConfirmed(true);
              setOrderId(res?.results?.data);
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
        } else {
          try {
            const response = await mutation(`payment`, {
              method: "POST",
              body: {
                amount: productData?.amountDetails?.totalPrice - couponAmount,
              },
              isAlert: true,
            });
            if (response?.status === 200) {
              const options = {
                key: "rzp_test_5QepCC7yep9W2v", // Changed from 'key' to 'key_id'
                amount: response?.results?.data?.amount,
                currency: "INR",
                name: user?.name,
                description: "Online Transaction",
                image: user?.avatar,
                order_id: response?.results?.data?.id,
                callback_url:
                  "https://shreyan-api.yardhealth.in/api/v1/payment/paymentVerify",
                prefill: {
                  name: user?.name,
                  email: user?.email,
                  contact: user?.phone,
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#FF5733",
                },
              };

              const razor = new window.Razorpay(options);
              razor.open();
              let product: any = [];
              productData?.data?.map((item: any) => {
                product.push({
                  id: item?.product?._id,
                  image: item?.product?.images?.[0]?.imageUrl,
                  mrp: item?.product?.mrp,
                  price: item?.product?.price,
                  discount: item?.product?.discount,
                  discountValue: item?.product?.discountValue,
                  size: item?.productSize,
                  name: item?.product?.name,
                  category: item?.product?.category?.name,
                  color: item?.product?.color?.name,
                  star: item?.product?.star || 0,
                  quantity: item?.quantity,
                });
              });
              const data = {
                totalMrp: productData?.amountDetails?.totalMrp,
                totalPrice:
                  productData?.amountDetails?.totalPrice - couponAmount,
                coupon: couponAmount || 0,
                totalDiscount: productData?.amountDetails?.totalDiscount,
                totalDiscountValue:
                  productData?.amountDetails?.totalDiscountValue,
                paymentMode: selectedOption,
                paymentId: selectedOption,
                product: product,
                location: {
                  name: addressData?.name,
                  phone: addressData?.phone,
                  alternativePhoneNumber: addressData?.alternativePhoneNumber,
                  address: addressData?.address,
                  state: addressData?.state,
                  city: addressData?.city,
                  landmark: addressData?.landmark,
                  type: addressData?.type,
                  pincode: addressData?.pincode,
                },
                totalQuantity: productData?.amountDetails?.totalQuantity,
              };
              setLocalStorageItem("orderDetails", data);
            } else {
              Swal.fire("Info", response?.results?.msg, "info");
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };
  return (
    <>
      <Congratulation
        open={orderConfirmed}
        close={setOrderConfirmed}
        response={orderId}
      />
      {isLoading && (
        <div className=" absolute top-0 left-0 w-full h-screen flex items-center justify-center">
          <PageLoader />
        </div>
      )}
      <div
        className="w-full bg-white h-full rounded 
    flex flex-col gap-2 justify-center  "
      >
        <div>
          <span
            onClick={() => setPaymentOpen(!paymentOpen)}
            className="flex items-center justify-between w-full p-5 font-medium text-left border-b-2"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <p className=" flex gap-2 items-center">
              <span className="font-semibold text-gray-800 uppercase">
                Payment
              </span>
              {/* {confirmPaymentOption && (
              <BsCheck2 className=" text-2xl text-blue-500" />
            )} */}
            </p>
            {paymentOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        {paymentOpen && (
          <div className="w-full h-full scroll flex flex-col gap-2 py-3 px-4">
            <span id="selectoptionhere">Select Payment Method :</span>
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentOption"
                id="onlinepayment"
                className="w-4 h-4"
                checked={selectedOption === "ONLINE"}
                onChange={() => setSelectedOption("ONLINE")}
                onClick={() => setConfirmPaymentOption(!confirmPaymentOption)}
              />
              <label htmlFor="onlinepayment" className="cursor-pointer">
                Online Payment
              </label>
            </span>
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentOption"
                id="COD"
                className="w-4 h-4"
                checked={selectedOption === "COD"}
                onChange={() => setSelectedOption("COD")}
                onClick={() => setConfirmPaymentOption(!confirmPaymentOption)}
              />
              <label htmlFor="COD" className="cursor-pointer">
                Cash On Delivery
              </label>
            </span>
            <span className=" w-full flex justify-end">
              <Button
                loading={isLoading}
                onClick={handelOrderPlaced}
                disabled={selectedOption?.length === 0}
              >
                Continue
              </Button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
