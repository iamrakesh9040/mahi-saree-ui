/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { PublicLayout } from "@/layouts";
import { HiMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MdStarBorder } from "react-icons/md";
import { FaArrowDown, FaStar } from "react-icons/fa";
import { useAuth, useMutation, useSwr } from "@/hooks";
import { Button } from "@/core";

const Cart = () => {
  const { user, isUserLoading, logout } = useAuth();
  const { data, isValidating, mutate } = useSwr(`cart`);
  const cartData = data?.data;
  const router = useRouter();
  useEffect(() => {
    if (!isUserLoading) {
      if (!user?._id) {
        router.push("/");
      }
      if (user?.role !== "USER") {
        logout();
        router.push("/login");
      }
    }
  }, [isUserLoading, user, router]);
  const isCartEmpty = cartData?.length === 0;

  return (
    <PublicLayout title="Cart | Shree Odisha Handloom">
      <section className="main-container py-10 ">
        <main className=" w-full flex flex-col gap-2">
          <h1 className=" text-gray-800 text-2xl font-semibold px-2">
            My Cart ({cartData?.length})
          </h1>
          {isCartEmpty ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-600 text-lg font-semibold">
                Cart Is Empty
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col md:flex-row md:gap-10 gap-5 items-start ">
              {/* Left Part */}
              <div className="lg:w-[70%] md:w-[80%] w-full md:hidden flex flex-col gap-3">
                <hr />
                {cartData?.length > 0 ? (
                  cartData?.map((curEle: any, index: number) => {
                    return (
                      <Fragment key={curEle?._id}>
                        <CartMobileViewCard item={curEle} mutate={mutate} />
                        <hr />
                      </Fragment>
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="/emptyProduct.webp"
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                )}
              </div>

              <div className="lg:w-[70%] md:w-[80%] w-full hidden md:flex flex-col gap-3">
                <hr />
                {cartData?.length > 0 ? (
                  cartData?.map((curEle: any, index: number) => {
                    return (
                      <Fragment key={curEle?._id}>
                        <CartCard item={curEle} mutate={mutate} />
                        <hr />
                      </Fragment>
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="/emptyProduct.webp"
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                )}
              </div>

              <div className="md:w-[50%] w-full  sticky top-40 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg p-4">
                <div className=" flex flex-col gap-4">
                  <div className=" w-full flex items-center justify-between gap-2">
                    <h2 className="text-2xl text-gray-500 font-semibold uppercase">
                      Price Details
                    </h2>

                    <p className="lg:px-6 px-2.5 py-1 lg:text-base text-xs rounded-md bg-green-400 text-white font-medium">
                      {data?.amountDetails?.totalDiscount}% Off
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Total Price</span>
                    <span>₹{data?.amountDetails?.totalMrp}</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>Discount</span>
                    <span className=" font-medium text-green-500 ">
                      ₹{data?.amountDetails?.totalDiscountValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-500 font-normal">
                      FREE Delivery
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-600">
                      Total Amount
                    </span>
                    <span className="font-semibold">
                      ₹{data?.amountDetails?.totalPrice}
                    </span>
                  </div>
                  <hr />
                  <div className="text-green-600 font-medium ">
                    You will save ₹{data?.amountDetails?.totalDiscountValue} on
                    this order
                  </div>
                  <hr />
                  <div
                    onClick={() => router.push(`/checkout`)}
                    className=" flex justify-end"
                  >
                    <Button
                      // loading={isLoading}
                      type="submit"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </section>
    </PublicLayout>
  );
};

export default Cart;
const CartCard = ({ item, mutate }: { item: any; mutate: () => void }) => {
  const { isLoading, mutation } = useMutation();
  const router = useRouter();
  const handleRemoveProductFromCart = async (id: string) => {
    try {
      const res = await mutation(`cart/${id}`, {
        method: "DELETE",
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
    <article className="w-full flex flex-col gap-3 md:items-start items-center justify-start  lg:px-10">
      <div className="flex flex-col md:flex-row md:gap-7 gap-5 items-center ">
        <div className="flex flex-col gap-3 items-center">
          <Link
            href={`/products/${item?.product?._id}?variantId=${item?.product?.variantId}`}
            className="md:h-36 h-fit md:w-30 w-40 rounded-lg bg-slate-100 p-2"
          >
            <img
              src={
                item?.product?.images?.[0]?.imageUrl ||
                "/home/productimgenotavailable.jpg"
              }
              className=" h-full w-full object-cover rounded-lg"
              alt=""
            />
          </Link>

          <CartQuantity item={item} mutate={mutate} />
        </div>
        <div className=" flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xl text-gray-800 font-semibold">
              {item?.product?.name}
            </span>
            <span className="text-sm">{item?.categoryName}</span>
            <span className="text-xs text-gray-400 font-light capitalize">
              Pack of {item?.quantity}, {item?.product?.color?.name} ,{" "}
              {item?.product?.category?.name}
            </span>
            <p className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  {item?.product?.star >= index + 1 ? (
                    <FaStar className=" text-amber-500" />
                  ) : (
                    <MdStarBorder fontSize="inherit" color="inherit" />
                  )}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <p className=" text-sm"> Size:</p>
            <p className="text-sm border  rounded-md w-fit py-1  px-3">
              {" "}
              {item?.productSize}
            </p>
          </div>

          <p className="flex flex-row md:items-center gap-2">
            <span className="text-sm line-through font-semibold text-gray-400">
              ₹{item?.product?.mrp}
            </span>
            <span className="text-gray-800 font-semibold text-lg">
              ₹{item?.product?.price}
            </span>
            <span className="text-center px-5 py-1 text-white bg-green-500 rounded-md text-xs font-semibold">
              {item?.product?.discount}% Off
            </span>
          </p>
          <div className="w-full flex items-center gap-5">
            <div
              onClick={() => handleRemoveProductFromCart(item?._id)}
              className="px-5 py-1 cursor-pointer rounded-md bg-red-500 text-white font-medium text-xs"
            >
              {isLoading ? (
                <div
                  className="w-5 h-5 rounded-full animate-spin
                      border-y border-solid border-white border-t-transparent shadow-md"
                ></div>
              ) : (
                `Remove`
              )}
            </div>
            <div
              onClick={() => router.push(`/checkout/${item?._id}`)}
              className="px-5 cursor-pointer py-1 rounded-md bg-yellow-500 text-white font-medium text-xs"
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const CartMobileViewCard = ({
  item,
  mutate,
}: {
  item: any;
  mutate: () => void;
}) => {
  const router = useRouter();
  const { isLoading, mutation } = useMutation();
  const handleRemoveProductFromCart = async (id: string) => {
    try {
      const res = await mutation(`cart/${id}`, {
        method: "DELETE",
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
    <div className="w-full h-fit flex  items-center gap-3 rounded-md bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-3">
      <div className="flex flex-col gap-2 items-center">
        <img
          onClick={() =>
            router?.push(
              `/products/${item?.product?._id}?variantId=${item?.product?.variantId}`
            )
          }
          src={item?.product?.images?.[0]?.imageUrl}
          className="w-32 h-36  object-fill rounded-lg"
          alt=""
        />
        <CartMobileViewQuantity item={item} />
      </div>
      <div className="w-full flex items-start flex-col gap-2">
        <p className="text-gray-900 text-lg font-semibold">
          {item?.product?.name}
        </p>
        <p className="text-xs text-gray-400 font-light capitalize">
          Pack of {item?.quantity}, {item?.product?.color?.name} ,
          {item?.category?.name}
        </p>
        <p className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              {item?.product?.star >= index + 1 ? (
                <FaStar className=" text-amber-500" />
              ) : (
                <MdStarBorder fontSize="inherit" color="inherit" />
              )}
            </Fragment>
          ))}
        </p>
        <div className="flex gap-1 items-center">
          <p className=" text-sm"> Size:</p>
          <p className="text-sm border rounded-md w-fit py-1  px-3">
            {" "}
            {item?.productSize}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="flex items-center">
            <FaArrowDown className="text-green-500" />
            <span className="font-semibold text-green-500">
              {item?.product?.discount}%
            </span>
          </p>
          <p className=" font-semibold text-gray-400  line-through">
            ₹{item?.product?.mrp}
          </p>
          <p className=" font-semibold text-lg text-gray-900  ">
            ₹{item?.product?.price}
          </p>
        </div>
        <div className="w-full flex items-center justify-evenly gap-2">
          <div
            onClick={() => handleRemoveProductFromCart(item?._id)}
            className="px-4 py-1 cursor-pointer rounded-md bg-red-500 text-white font-medium text-sm"
          >
            {isLoading ? (
              <div
                className="w-5 h-5 rounded-full animate-spin
                      border-y border-solid border-white border-t-transparent shadow-md"
              ></div>
            ) : (
              `Remove`
            )}
          </div>
          <div
            onClick={() => router.push(`/checkout/${item?._id}`)}
            className="px-4 py-1 cursor-pointer rounded-md bg-yellow-400 text-white font-medium text-sm"
          >
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
};

const CartQuantity = ({ item, isValidating, mutate }: any) => {
  const { isLoading: increaseLoading, mutation: increaseMutation } =
    useMutation();
  const { isLoading: decreaseLoading, mutation: decreaseMutation } =
    useMutation();
  const handleIncreaseQuantity = async (id: string) => {
    try {
      const res = await increaseMutation(`cart/increase/${id}`, {
        method: "PUT",
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
  const handleDecreaseQuantity = async (id: string) => {
    try {
      const res = await decreaseMutation(`cart/decrease/${id}`, {
        method: "PUT",
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
    <p className=" flex  items-center gap-8 bg-slate-100 p-1 rounded-full">
      <HiMinusSmall
        onClick={() => handleDecreaseQuantity(item?._id)}
        className="p-2 bg-white rounded-full text-orange-600 text-4xl cursor-pointer"
      />

      {decreaseLoading || increaseLoading ? (
        <div
          className="w-3 h-3 rounded-full animate-spin
                    border-y border-solid border-green-500 border-t-transparent shadow-md"
        ></div>
      ) : (
        <span>{item?.quantity}</span>
      )}
      <HiMiniPlusSmall
        onClick={() => handleIncreaseQuantity(item?._id)}
        className="p-2 bg-white rounded-full text-orange-600 text-4xl cursor-pointer"
      />
    </p>
  );
};
const CartMobileViewQuantity = ({ item, isValidating, mutate }: any) => {
  const { isLoading: increaseLoading, mutation: increaseMutation } =
    useMutation();
  const { isLoading: decreaseLoading, mutation: decreaseMutation } =
    useMutation();
  const handleIncreaseQuantity = async (id: string) => {
    try {
      const res = await increaseMutation(`cart/increase/${id}`, {
        method: "PUT",
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
  const handleDecreaseQuantity = async (id: string) => {
    try {
      const res = await decreaseMutation(`cart/decrease/${id}`, {
        method: "PUT",
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
    <p className="flex items-center gap-5 bg-slate-100 p-1 rounded-full">
      <HiMinusSmall
        onClick={() => handleDecreaseQuantity(item?._id)}
        className="p-2 bg-white rounded-full text-orange-600 text-3xl cursor-pointer"
      />

      {decreaseLoading || increaseLoading ? (
        <div
          className="w-3 h-3 rounded-full animate-spin
                    border-y border-solid border-green-500 border-t-transparent shadow-md"
        ></div>
      ) : (
        <span>{item?.quantity}</span>
      )}
      <HiMiniPlusSmall
        onClick={() => handleIncreaseQuantity(item?._id)}
        className="p-2 bg-white rounded-full text-orange-600 text-3xl cursor-pointer"
      />
    </p>
  );
};
