import { Congratulation, PageLoader } from "@/core";
import { useMutation } from "@/hooks";
import { PublicLayout } from "@/layouts";
import { getLocalStorageItem, removeFromLocalStorage } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PaymentVerification = () => {
  const { query, push } = useRouter();
  const { mutation, isLoading } = useMutation();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const storedObject = getLocalStorageItem("orderDetails");
  const [orderId, setOrderId] = useState<string>("");
  const handleOrderSubmit = async () => {
    try {
      let order = { ...storedObject };
      order.paymentId = query?.paymentId;
      const res = await mutation(`order`, {
        method: "POST",
        isAlert: true,
        body: order,
      });
      if (res?.status === 200) {
        setOrderConfirmed(true);
        setOrderId(res?.results?.data);
        removeFromLocalStorage("orderDetails");
      }
    } catch (error) {
      Swal.fire(
        "Info",
        "Server not available, Please try after sometime!",
        "info"
      );
    }
  };
  useEffect(() => {
    if (query?.paymentId) {
      handleOrderSubmit();
    }
  }, [query?.paymentId]);
  return (
    <PublicLayout
      title="Shree Odisha Handloom"
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      {isLoading && <PageLoader />}
      <div className="w-full h-full flex items-center justify-center">
        <Congratulation
          open={orderConfirmed}
          close={setOrderConfirmed}
          response={orderId}
        />
      </div>
    </PublicLayout>
  );
};

export default PaymentVerification;
