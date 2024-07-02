import { Counter } from "@/core";
import { useAuth, useMutation, useSwr } from "@/hooks";
import { Dialog } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import ReviewAndRating from "./ReviewAndRating";
import { FiMinus } from "react-icons/fi";
import { HiOutlinePlusSm } from "react-icons/hi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LuLink } from "react-icons/lu";
import { BsCheck2All } from "react-icons/bs";
interface Image {
  id: string;
  image: string;
}

const CustomerProductDetails = ({
  productUrl,
  onClose,
  data,
  mutate,
}: {
  productUrl: any;
  onClose: () => void;
  data: any;
  mutate: () => void;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading, mutation } = useMutation();
  const { data: variants, isValidating } = useSwr(
    `product/getAll-variant/${router?.query?.variantId}`
  );
  const { data: cartData, mutate: cartMutate } = useSwr(
    user?._id ? `cart` : ``
  );
  const checkCart = cartData?.data?.filter(
    (item: any) => item?.product?._id === router?.query?.id
  );
  const [cartValue, setCartValue] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 5000,
          pauseOnHover: true,
        },
      },
    ],
  };
  const [activeImg, setActiveImg] = useState(0);
  const handleActiveImage = (id: number) => {
    setActiveImg(id);
  };

  const [selectedSize, setSelectedSize] = useState<string>("");
  const handleSizeSelect = (size: any) => {
    setSelectedSize(size);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const addToCart = async () => {
    try {
      if (selectedSize?.length === 0) return toast.info("Size Not Selected");
      if (cartValue === 0) return toast.info("Quantity Not Selected");
      const res = await mutation(`cart/create`, {
        method: "POST",
        isAlert: true,
        body: {
          quantity: cartValue,
          productId: router?.query?.id,
          size: selectedSize,
        },
      });
      if (res?.status === 200) {
        mutate();
        cartMutate();
      }
    } catch (error) {
      Swal.fire(
        "Info",
        "Server not available, Please try after sometime!",
        "info"
      );
    }
  };
  const addToCartAndBuy = async () => {
    try {
      if (selectedSize?.length === 0) return toast.info("Size Not Selected");
      if (cartValue === 0) return toast.info("Quantity Not Selected");
      const res = await mutation(`cart/create`, {
        method: "POST",
        isAlert: true,
        body: {
          quantity: cartValue,
          productId: router?.query?.id,
          size: selectedSize,
        },
      });
      if (res?.status === 200) {
        mutate();
        cartMutate();
        router.push(`/checkout/${res?.results?.data}`);
      }
    } catch (error) {
      Swal.fire(
        "Info",
        "Server not available, Please try after sometime!",
        "info"
      );
    }
  };
  return (
    <>
      <section className="main-container py-6 w-full">
        <article className="w-full flex flex-col lg:flex-row gap-8">
          <aside className="md:w-[40%] h-full lg:sticky lg:top-40">
            <div className="w-full flex flex-col  items-center gap-4  p-2 rounded-lg ">
              <div className="w-full h-[26rem] overflow-hidden border-2 p-2 rounded-lg relative">
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeImg === 0) {
                      setActiveImg(data?.images?.length - 1);
                    } else {
                      setActiveImg((pre) => pre - 1);
                    }
                  }}
                  className=" absolute z-10 top-1/2 -translate-y-1/2 -left-5 w-14 md:h-20 h-16  rounded-lg bg-slate-200 bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer text-black/20 hover:text-black/60 flex items-center justify-center pl-5"
                >
                  <MdArrowBackIos />
                </p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeImg === data?.images?.length - 1) {
                      setActiveImg(0);
                    } else {
                      setActiveImg((pre) => pre + 1);
                    }
                  }}
                  className=" absolute z-10  top-1/2 -translate-y-1/2 -right-5 w-14 md:h-20 h-16  rounded-lg bg-slate-200 bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer text-black/20 hover:text-black/60 flex items-center justify-center pr-5"
                >
                  <MdArrowForwardIos />
                </p>
                {isValidating ? (
                  <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                ) : (
                  <img
                    src={data?.images?.[activeImg]?.imageUrl}
                    className="w-full h-full object-contain z-10"
                    alt=""
                  />
                )}
              </div>

              <div className="h-20 ">
                {data?.images?.length > 5 ? (
                  <div className="w-full category-slick-slider image-slider">
                    <Slider {...settings}>
                      {data?.images?.map((item: any, index: number) => (
                        <article
                          className="mx-auto !flex items-center w-full "
                          key={index}
                        >
                          <img
                            src={item?.imageUrl}
                            className={`w-24 h-20 object-contain border-2 p-2 cursor-pointer rounded-lg `}
                            onClick={() => setActiveImg(index)}
                            alt=""
                          />
                        </article>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-5 gap-4 justify-center">
                    {data?.images?.map((item: any, index: number) => (
                      <article
                        onClick={() => handleActiveImage(index)}
                        className="mx-auto !flex items-center  w-full  "
                        key={index}
                      >
                        <img
                          src={item?.imageUrl}
                          className={`w-20 h-20 object-contain border-2  cursor-pointer rounded-lg ${
                            activeImg === index ? "border-cyan-500" : ""
                          }`}
                          // onClick={() => setActiveImg(images[`img${index}`])}
                          alt=""
                        />
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
          <aside className="md:w-[60%] h-full py-1 scroll">
            <div className=" w-full flex flex-col gap-4">
              <div className="hidden lg:flex gap-1 items-center">
                <Link href="/" className="flex gap-2 items-center">
                  <span className=" text-[0.75rem] hover:text-primary  text-gray-400">
                    Home
                  </span>
                  <FaChevronRight className=" text-[0.5rem]" />
                </Link>
                <Link href="/products" className="flex gap-2 items-center">
                  <span className=" text-[0.75rem] hover:text-primary  text-gray-400">
                    Products
                  </span>
                  <FaChevronRight className=" text-[0.5rem]" />
                </Link>
                <Link
                  href={`/category/${data?.category?.name}`}
                  className="flex gap-2 items-center"
                >
                  <span className=" text-[0.75rem] hover:text-primary capitalize  text-gray-400">
                    {data?.category?.name}
                  </span>
                  <FaChevronRight className=" text-[0.5rem]" />
                </Link>

                <p className="flex gap-2 items-center">
                  <span className=" text-[0.6rem] flex gap-2 items-center capitalize  text-gray-400">
                    {data?.name}{" "}
                    <FaChevronRight className=" text-[0.5rem] text-black" />{" "}
                    {data?._id}
                  </span>
                </p>
              </div>
              <div className=" flex justify-between items-center">
                <h2 className="text-xl font-semibold capitalize">
                  {data?.name}
                </h2>
                <span
                  className="mr-4 cursor-pointer w-9 h-9 text-primary bg-primary/10 rounded-full flex justify-center items-center "
                  onClick={() => setIsOpen(true)}
                >
                  <IoIosShareAlt size={28} />
                </span>
              </div>

              <Link href="#ReviewAndRating" className="flex items-center gap-2">
                <p className="flex items-center gap-1 text-sm font-bold px-2 py-0.5 text-white bg-green-600 rounded-md">
                  <span>{data?.star}</span>
                  <AiFillStar />
                </p>
                <p className="text-sm font-semibold text-gray-400">
                  {data?.totalRating} ratings and reviews
                </p>
              </Link>
              <p className="text-green-600 text-sm font-semibold">
                Extra {data?.discount}% off
              </p>
              <p className="flex items-end gap-2">
                <span className="font-semibold text-2xl">₹{data?.price}</span>
                <span className="font-semibold text-gray-600  line-through justify-end">
                  ₹{data?.mrp}
                </span>
                <span className="text-green-600 font-semibold">
                  {data?.discount}% off
                </span>
              </p>
              <div className="flex font-semibold text-base items-center cursor-pointer">
                <div className="flex flex-col gap-2">
                  Size :
                  <div className="uppercase flex gap-2">
                    {data?.size?.map((item: any) => (
                      <div
                        key={item}
                        className={`flex border-2 border-gray-300 w-fit px-3 py-1 rounded-md items-center justify-center text-black 
                        ${selectedSize === item ? "bg-gray-300" : ""}`}
                        onClick={() => handleSizeSelect(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <p>Color : </p>
                {variants?.map((item: any, index: any) => (
                  <p
                    key={index}
                    className={`border-2  rounded-full p-1 ${
                      data?._id === item?._id
                        ? `border-blue-500`
                        : `border-gray-300`
                    }`}
                  >
                    <p
                      onClick={() =>
                        router.push(
                          `/products/${item?._id}?variantId=${item?.variantId}`
                        )
                      }
                      style={{ backgroundColor: item?.color?.colorCode }}
                      className="cursor-pointer w-6 h-6 rounded-full"
                    ></p>
                  </p>
                ))}
              </div>
              {/* <Counter /> */}
              {checkCart?.length > 0 ? null : (
                <p className="w-fit flex items-center gap-8 bg-slate-100 p-2 rounded-full">
                  <span
                    onClick={() =>
                      setCartValue((pre: any) => {
                        if (pre === 0) {
                          return 0;
                        }
                        return pre - 1;
                      })
                    }
                    className=" text-secondary rounded-full bg-white p-2  flex items-center justify-center cursor-pointer"
                  >
                    <FiMinus size={18} />
                  </span>
                  <span>{cartValue}</span>
                  <span
                    onClick={() => setCartValue((pre: any) => pre + 1)}
                    className=" text-secondary rounded-full bg-white p-2  flex items-center justify-center cursor-pointer"
                  >
                    <HiOutlinePlusSm size={18} />
                  </span>
                </p>
              )}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    if (!user?._id) {
                      router.push("/login");
                    } else {
                      if (checkCart?.length > 0) {
                        router.push(`/cart`);
                      } else {
                        addToCart();
                      }
                    }
                  }}
                >
                  <span className=" cursor-pointer font-semibold border border-primary text-primary hover:text-white hover:bg-primary rounded-full px-5 py-2  overflow-hidden group">
                    {isLoading
                      ? "Loading..."
                      : checkCart?.length > 0
                      ? `Go to Cart`
                      : `Add to Cart`}
                  </span>
                </div>

                <div
                  onClick={() => {
                    if (!user?._id) {
                      router.push("/login");
                    } else {
                      if (checkCart?.length > 0) {
                        router.push(`/checkout/${checkCart?.[0]?._id}`);
                      } else {
                        addToCartAndBuy();
                      }
                    }
                  }}
                  // href={`/checkout?productId=#`}
                  className="rounded-full btn-primary py-2 md:px-10 px-5 overflow-hidden  group cursor-pointer border-2 font-medium bg-primary text-white"
                >
                  <span className="  w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20  group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className=" text-white transition duration-300 group-hover:text-white ease font-semibold">
                    Buy Now
                  </span>
                </div>
              </div>
              <div className=" grid grid-cols-2 md:grid-cols-4  items-center gap-3 py-2">
                <p className="flex flex-col items-center gap-1 p-3 rounded-2xl shadow h-full">
                  <img src="/asset/best-product.png" alt="" className=" w-12" />
                  <span className="text-center font-medium text-sm text-gray-800">
                    100% Genuine Products
                  </span>
                </p>
                <p className="flex flex-col items-center gap-1 p-3 rounded-2xl shadow h-full">
                  <img
                    src="/asset/secure-payment.png"
                    alt=""
                    className=" w-12"
                  />

                  <span className="text-center font-medium text-sm text-gray-800">
                    100% Secure Payments
                  </span>
                </p>
                <p className="flex flex-col items-center gap-1 p-3 rounded-2xl shadow h-full">
                  <img src="/asset/shield.png" alt="" className=" w-12" />
                  <span className="text-center font-medium text-sm text-gray-800">
                    Manufacture Warranty
                  </span>
                </p>
                <p className="flex flex-col items-center gap-1 p-3 rounded-2xl shadow h-full">
                  <img src="/asset/cashback.png" alt="" className=" w-12" />
                  <span className="text-center font-medium text-sm text-gray-800">
                    Easy Returns
                  </span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-10 py-3 w-full ">
                <div className="flex flex-col gap-4 w-full items-start">
                  <h2 className="text-sm font-bold text-gray-700">
                    Product Details
                  </h2>
                  <p className="flex flex-col gap-2">
                    <span>{data?.description}</span>
                  </p>
                  <span className="flex flex-col gap-2">
                    <h3 className="flex items-center gap-3">
                      <p className="p-[0.2rem] bg-gray-400 rounded-full"></p>
                      <p className="text-sm">
                        <b>Material:</b> {data?.type}
                      </p>
                    </h3>
                  </span>
                </div>
              </div>

              {/* <ProductSpecification/> */}
              <ReviewAndRating
                productId={data?._id}
                rating={data?.rating}
                mutate={mutate}
                star={data?.star}
              />
            </div>
          </aside>
        </article>
      </section>

      <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
        <div className=" bg-white p-8 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <header className="flex justify-between pb-2">
            <div className="flex flex-col ">
              <span className="text-xl font-semibold">Share Product</span>
              <p className="text-sm">
                Spread the word by sharing with your loved once
              </p>
            </div>
            <span className="cursor-pointer" onClick={onCloseModal}>
              <IoCloseSharp size={26} className="text-red-500" />
            </span>
          </header>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              {/* <p className="text-gray-700">Share this product via</p> */}
              <ul className="flex items-center gap-4 ">
                <div
                  title="facebook"
                  className="border-blue-400 rounded-full w-10 h-10 border-2 flex items-center justify-center"
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      productUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                </div>
                <div
                  title="twitter"
                  className="border-black rounded-full w-10 h-10 border-2 flex items-center justify-center"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      productUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/80"
                  >
                    <FaXTwitter size={20} />
                  </a>
                </div>
                <div
                  title="what's app"
                  className="border-green-400 rounded-full w-10 h-10 border-2 flex items-center justify-center"
                >
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      productUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whatsapp"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>
                <div
                  title="copy link"
                  className="gap-2 border-primary rounded-full w-10 h-10 border-2 flex items-center justify-center"
                >
                  <div className="flex items-center gap-2">
                    {/* <i className="url-icon uil uil-link text-gray-600"></i>
                <input
                  id="copyInput"
                  type="text"
                  readOnly
                  value={productUrl}
                  className="flex-grow "
                /> */}
                    <button
                      className={`${
                        isCopied ? "" : ""
                      } text-white px-4 py-2 rounded transition-all duration-200`}
                      onClick={handleCopyClick}
                    >
                      {isCopied ? (
                        <>
                          <BsCheck2All className=" text-2xl text-green-500" />
                        </>
                      ) : (
                        <>
                          <LuLink className=" text-2xl text-primary" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CustomerProductDetails;
