/* eslint-disable @next/next/no-img-element */
import { useMutation, useSwr } from "@/hooks";
import { useRouter } from "next/router";
import { Fragment, use, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdStarBorder } from "react-icons/md";
import { toast } from "react-toastify";
interface IWishList {
  [x: string]: any;
  id: number;
  imageUrl: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
}
interface Props {
  item: IWishList;
  mutate: () => void;
}
const WishListCard = ({ item, mutate }: Props) => {
  const { isLoading, mutation } = useMutation();
  const [size, setSize] = useState<string>(item?.product?.size?.[0]);
  const router = useRouter();
  const {
    data: cartData,
    mutate: mutateCart,
    isValidating: isValidatingCart,
  } = useSwr(`cart`);

  const removeProduct = async (id: string) => {
    try {
      const res = await mutation(`wishlist/${id}`, {
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

  const moveToCart = async (id: string) => {
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
    <div className="relative flex flex-col rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white w-full h-full">
      <div className="w-full rounded-lg">
        <img
          src={item?.product?.images?.[0]?.imageUrl}
          alt=""
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full flex flex-col p-4 gap-2">
        <h4 className="font-semibold">
          {item?.product?.name?.slice(0, 24).toUpperCase()}
        </h4>
        <p className="flex gap-2 items-center">
          <span className="font-medium">{item?.product?.price}</span>
          <span className="text-gray-400 text-xs font-normal line-through">
            {item?.product?.mrp}
          </span>
          <span className="text-secondary text-sm font-normal">
            ({item?.product?.discount}% OFF)
          </span>
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
        <p className="w-full items-center gap-4 ">
          {item?.product?.size?.map((pre: any, index: any) => (
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
      </div>

      <button
        onClick={() => moveToCart(item?.product?._id)}
        className="w-full border border-secondary/80 rounded-b-lg flex gap-2 justify-center items-center px-3 py-1.5 text-white bg-red-500 hover:bg-red-500/10 hover:text-black common-transition"
      >
        <HiOutlineShoppingCart size={20} className="" />
        {cartData?.data?.some(
          (pre: any) => pre?.product?._id === item?.product?._id
        ) ? (
          <p className="text-white text-sm 0 hover:text-black font-normal">
            View in Cart
          </p>
        ) : (
          <p className="text-white text-sm  0 hover:text-black font-normal">
            Add to Cart
          </p>
        )}
      </button>

      <button
        onClick={() => removeProduct(item?._id)}
        className="absolute top-3 right-3 hover:scale-125"
      >
        <FaHeart size={18} className="text-secondary" />
      </button>
    </div>
  );
};

export default WishListCard;
