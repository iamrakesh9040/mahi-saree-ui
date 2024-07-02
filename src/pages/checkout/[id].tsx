import {
  AddressDetails,
  OrderSummary,
  Payment,
  ProductPriceDetails,
} from "@/components/checkout";
import AddAddressForm from "@/components/forms/AddAddressForm";
import { PageLoader } from "@/core";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Checkout = () => {
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [couponAmount, setCouponAmount] = useState<number>(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(true);
  const [checkedAddress, setCheckedAddress] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const { query } = useRouter();
  const { data: productData, mutate } = useSwr(
    query?.id ? `cart/${query?.id}` : ``
  );
  const {
    data: address,
    mutate: addressMutated,
    isValidating: addressValidate,
  } = useSwr(`address`);
  return (
    <PublicLayout
      title="Checkout | Shree Odisha Handloom"
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <section className=" bg-gray-100">
        <main className="main-container py-6 w-full flex flex-col md:flex-row gap-5 items-start">
          <article className="md:w-[70%] rounded-lg w-full">
            <div className="w-full flex flex-col gap-5">
              <AddressDetails
                addressOpen={addressOpen}
                setAddressOpen={setAddressOpen}
                orderSummaryOpen={orderSummaryOpen}
                setOrderSummaryOpen={setOrderSummaryOpen}
                AllAddress={address}
                mutate={addressMutated}
                checkedAddress={checkedAddress}
                setCheckedAddress={setCheckedAddress}
                addressValidate={addressValidate}
              />
              {addressOpen && (
                <div className="flex flex-col gap-5">
                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="flex bg-white items-center gap-4 px-4 font-semibold w-full py-4  outline-none p-2 text-primary rounded-md ring-gray-300 "
                    >
                      <AiOutlinePlus />
                      Add New Address
                    </button>
                  ) : (
                    <AddAddressForm
                      setOpen={setShowForm}
                      mutate={addressMutated}
                    />
                  )}
                </div>
              )}

              <OrderSummary
                orderSummaryOpen={orderSummaryOpen}
                setOrderSummaryOpen={setOrderSummaryOpen}
                paymentOpen={paymentOpen}
                setPaymentOpen={setPaymentOpen}
                data={productData?.data}
                mutate={mutate}
              />
              <Payment
                paymentOpen={paymentOpen}
                setPaymentOpen={setPaymentOpen}
                productData={productData}
                checkedAddress={checkedAddress}
                couponAmount={couponAmount}
              />
            </div>
          </article>
          <article className="md:w-[40%] w-full bg-white">
            <ProductPriceDetails
              data={productData}
              couponAmount={couponAmount}
              setCouponAmount={setCouponAmount}
            />
          </article>
        </main>
      </section>
    </PublicLayout>
  );
};

export default Checkout;
