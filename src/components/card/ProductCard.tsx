/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart, MdStarBorder } from "react-icons/md";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth, useMutation, useSwr } from "@/hooks";

const ProductCard = ({
  item,
  key,
  i,
  mutate,
  isValidating,
}: {
  item: any;
  i: number;
  key: any;
  mutate?: () => void;
  isValidating?: boolean;
}) => {
  const router = useRouter();
  const { mutation, isLoading } = useMutation();
  const { user } = useAuth();
  const [size, setSize] = useState<string>(item?.size?.[0]);
  const {
    data: cartData,
    mutate: mutateCart,
    isValidating: isValidatingCart,
  } = useSwr(`cart`);

  const addToCart = async (id: string) => {
    try {
      const findFirst = cartData?.data?.filter(
        (pre: any) => pre?.product?._id === id
      );
      if (findFirst?.length > 0) {
        return router.push("/cart");
      }
      const res = await mutation(`cart`, {
        method: "POST",
        isAlert: true,
        body: {
          productId: id,
          size: size,
        },
      });
      if (res?.status === 200) {
        mutate && mutate();
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };

  const {
    data: wishlistData,
    mutate: mutateWishlist,
    isValidating: isValidatingWishlist,
  } = useSwr(`wishlist`);

  const addToWishlist = async (id: string) => {
    try {
      const findFirst = wishlistData?.filter(
        (pre: any) => pre?.product?._id === id
      );
      if (findFirst?.length > 0) {
        return router.push("/wishlist");
      }
      const res = await mutation(`wishlist/${item?._id}`, {
        method: "POST",
        isAlert: true,
        body: {
          productId: id,
        },
      });
      if (res?.status === 200) {
        mutate && mutate();
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return (
    <motion.div
      key={item?._id}
      initial={{ scale: 1, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }} // Animation state (visible)
      transition={{ duration: 0.5, delay: i * 0.1 }}
      exit={{ scale: 1, opacity: 0, y: 20 }}
      viewport={{ once: false }}
      className="relative h-full group overflow-hidden  w-full flex flex-col gap-2 justify-between items-center  bg-white shadow-[0px_0px_4px_0px_#00000024] rounded-lg p-4"
    >
      <p className=" absolute z-10 top-2 left-2 text-xs bg-green-500/70 text-white font-medium px-4 py-1 rounded-md">
        {item?.discount}% off
      </p>
      <div onClick={() => addToWishlist(item?._id)}>
        <p className="absolute z-10 top-2 group-hover:right-2 -right-14 duration-200 w-8 h-8 cursor-pointer rounded-lg flex items-center justify-center bg-primary/70 hover:bg-primary">
          <AiFillHeart className="hover:scale-125 duration-200 text-white" />
        </p>
      </div>

      <Link href="#">
        <p className=" absolute z-10 top-12  group-hover:right-2 -right-16  duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-primary/70 hover:bg-primary ">
          <AiFillEye className=" hover:scale-125 duration-200 text-white" />
        </p>
      </Link>

      <div className=" w-full flex  flex-col gap-4 overflow-hidden rounded-lg">
        <Link
          href={`/products/${item?._id}?variantId=${item?.variantId}`}
          className="py-2"
        >
          <img
            src={item?.images?.[0]?.imageUrl || "/NotImage.jpg"}
            className="w-full object-cover md:h-40 h-20  rounded-lg cursor-pointer group-hover:scale-105 duration-200 "
            alt=""
          />
        </Link>
        <div className=" flex w-full flex-col gap-2 relative">
          {item?.stocks !== 0 ? (
            <p className=" md:block hidden absolute md:top-0 -top-[0.2rem] md:right-1 -right-2 text-xs font-medium md:px-4 px-2 py-1  text-green-500 rounded-md">
              InStock
            </p>
          ) : (
            <p className=" md:block hidden absolute md:top-0 -top-[0.2rem] md:right-1 -right-2 text-xs font-medium md:px-4 px-2 py-1  text-red-500 rounded-md">
              Out Of Stock
            </p>
          )}

          <p className=" flex flex-col gap-1 w-full">
            <span className="uppercase text-primary font-medium md:text-sm text-xs">
              Category:
            </span>
            <span className=" text-xs capitalize md:text-gray-600 text-gray-900  md:font-normal font-medium">
              {item?.category?.name}
            </span>
          </p>

          <p className="  md:font-semibold font-medium md:text-base text-xs  text-gray-700 capitalize">
            {item?.name}
          </p>
          <p className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Fragment key={index}>
                {item?.star >= index + 1 ? (
                  <FaStar className=" text-amber-400" />
                ) : (
                  <MdStarBorder fontSize="inherit" color="inherit" />
                )}
              </Fragment>
            ))}
          </p>
          <p className="w-full  items-center gap-2 md:flex hidden">
            {item?.size?.map((pre: any, index: any) => (
              <span
                key={index}
                onClick={() => setSize(pre)}
                className={`text-xs font-semibold py-1 px-2 cursor-pointer rounded-md
              ${
                size === pre
                  ? `bg-primary text-white`
                  : `border-gray-500 text-gray-900 border`
              }
              `}
              >
                {pre}
              </span>
            ))}
          </p>
          <div className=" flex justify-between items-center  ">
            <p className=" flex flex-col sm:flex-row items-center gap-1">
              <span className="text-gray-800 font-semibold">
                ₹{item?.price}
              </span>
              <span className="line-through text-xs  text-gray-400">
                ₹{item?.mrp}
              </span>
            </p>
            <div
              onClick={() => {
                if (!user?._id) {
                  router.push("/");
                } else {
                  addToCart(item?._id);
                }
              }}
            >
              {" "}
              <p className=" w-10 h-10 rounded-md cursor-pointer  group-hover:bg-primary border duration-300 border-primary flex items-center justify-center">
                {isLoading ? (
                  <div
                    className="w-3 h-3 rounded-full animate-spin
                            border-y border-solid border-primary group-hover:border-white border-t-transparent shadow-md"
                  ></div>
                ) : (
                  <MdOutlineShoppingCart className=" text-primary group-hover:text-white text-xl" />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
