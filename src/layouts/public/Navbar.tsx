/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiHandbagBold } from "react-icons/pi";
import MobileNavbar from "./MobileNavbar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth, useSwr } from "@/hooks";

const MENU_ARR = [
  {
    id: 1,
    title: "Sarees",
    subMenu: [
      {
        id: 1,
        title: "Sambalpuri Silk",
      },
      {
        id: 1,
        title: "Cotton Saree",
      },
      {
        id: 1,
        title: "Casual Saree",
      },
      {
        id: 1,
        title: "Khandua Patto",
      },
      {
        id: 1,
        title: "Manibandh Cotton",
      },
    ],
  },
  {
    id: 1,
    title: "Sambalpuri-Cloth",
    subMenu: [
      {
        id: 1,
        title: "Mens Kurta",
      },
      {
        id: 1,
        title: "Mens Shirt",
      },
      {
        id: 1,
        title: "Kurti",
      },
      {
        id: 1,
        title: "Suit Piece",
      },
    ],
  },
  {
    id: 1,
    title: "All-Products",
    link: "/products",
  },
  {
    id: 1,
    title: "Testimonials",
    link: "/#testimonial",
  },
  {
    id: 1,
    title: "About Us",
    link: "/about-us",
  },
  {
    id: 1,
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const { data, mutate, isValidating } = useSwr(`category`);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { data: cartData, isValidating: cartValidating } = useSwr(
    user?._id ? `cart` : ``
  );
  const { data: Alert } = useSwr(`alert`);
  return (
    <>
      <Search open={open} close={setOpen} />


      <nav className="bg-white w-full  flex flex-col gap-1 items-center sticky top-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-[999] ">
        <section className="w-full main-container  items-center justify-between py-3 lg:flex hidden">
          <Link
            href="/"
            className=" font-medium text-secondary tracking-wider cursor-pointer text-2xl border-b border-primary font-sans"
          >
            Mahi-Sareekngnxng
          </Link>
          <img
            src="/"
            className="w-52 h-fit object-fill"
            alt="mahisareelogi"
          />
          <ul className="flex items-center gap-6">
            <span onClick={() => setOpen(true)} className=" cursor-pointer">
              <IoSearch className=" text-secondary text-2xl hover:text-primary duration-300" />
            </span>
            <span
              onClick={() => {
                if (user?._id && user?.role === "USER") {
                  router.push(`/my-account`);
                } else if (user?._id && user?.role === "ADMIN") {
                  router.push(`/admin`);
                } else {
                  router.push(`/login`);
                }
              }}
              className="cursor-pointer"
            >
              <FaRegUser className=" text-secondary text-xl hover:text-primary duration-300" />
            </span>
            {user?.role !== "ADMIN" && (
              <p
                onClick={() => {
                  if (user?._id) {
                    router.push(`/cart`);
                  } else {
                    router.push(`/login`);
                  }
                }}
                className="cursor-pointer relative"
              >
                <span className=" absolute z-10 -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium p-1">
                  {user?._id ? cartData?.data?.length : 0}
                </span>
                <PiHandbagBold className=" text-secondary text-xl hover:text-primary duration-300" />
              </p>
            )}
          </ul>
        </section>
        <hr className="w-full h-[0.06rem] bg-secondary lg:block hidden" />
        <section className="w-full main-container  items-center justify-center py-3 gap-10 lg:flex hidden">
          <div className="font-semibold group font-sans text-secondary text-[1.1rem] flex items-center gap-2 cursor-pointer hover-slide-border relative">
            <span className="cursor-pointer"> All Category</span>
            <MdOutlineKeyboardArrowDown className=" duration-200 group-hover:-rotate-180" />
            <div className="absolute top-6 z-[999] w-fit group-hover:flex bg-white hidden xl:h-fit h-[10rem] overflow-y-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl  flex-col gap-2 items-start p-3">
              <div className="w-[16rem] flex flex-col gap-2">
                {isValidating ? (
                  <article className="flex flex-col gap-3 justify-center py-1">
                    <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                    <aside className="w-full py-6 rounded-lg bg-gray-400 animate-pulse">
                      {" "}
                    </aside>
                  </article>
                ) : (
                  data?.map((item: any, i: number) => (
                    <div
                      onClick={() =>
                        router.push(`/category/${item?.name}?id=${item?._id}`)
                      }
                      key={i}
                      className={`flex items-center gap-4 bg-gray-100  duration-200 rounded-md p-3 ${router?.query?.name === item?.name
                        ? `bg-primary/40`
                        : `hover:bg-primary/40`
                        }`}
                    >
                      <img
                        src={item?.image}
                        className="w-8 h-8 object-fill rounded-lg"
                        alt="categoryLogo"
                      />
                      <p className=" text-secondary font-medium">
                        {item?.name}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {MENU_ARR.map((item: any) => (
            <div
              key={item.id}
              className="font-semibold group font-sans text-secondary text-[1.1rem] flex items-center gap-2 cursor-pointer hover-slide-border relative"
            >
              <span
                onClick={() => {
                  if (item?.link) {
                    router.push(item.link);
                  }
                }}
                className="cursor-pointer"
              >
                {" "}
                {item?.title}
              </span>
              {item?.subMenu && (
                <MdOutlineKeyboardArrowDown className=" duration-200 group-hover:-rotate-180" />
              )}

              {item?.subMenu && (
                <div className=" absolute top-7  z-[999] w-fit group-hover:flex bg-white hidden h-fit shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl  flex-col gap-2 items-start p-5 ">
                  {item?.subMenu?.map((data: any, i: number) => (
                    <p
                      onClick={() =>
                        router.push(`/products?search=${data?.title}`)
                      }
                      key={i}
                      className="w-[8.5rem]"
                    >
                      <span className="text-secondary font-medium text-[0.95rem] font-sans w-fit flex items-center hover-slide-border">
                        {data?.title}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
        <MobileNavbar />
      </nav>
    </>
  );
};
const Search = ({ open, close }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  let url = ``;
  searchText && (url += `product/getAll?search=${searchText}`);
  const { data: productData, isValidating: productValidating } = useSwr(url);
  const router = useRouter();
  const handleSearch = (text: string) => {
    setSearchText(text);
    // if (debounceTimeout.current) {
    //   clearTimeout(debounceTimeout.current);
    // }
    // debounceTimeout.current = setTimeout(() => {
    //   setSearchText(text);
    // }, 1000);
  };

  // useEffect(() => {
  //   return () => {
  //     if (debounceTimeout.current) {
  //       clearTimeout(debounceTimeout.current);
  //     }
  //   };
  // }, []);
  return (
    <>
      {open && (
        <dialog className="w-full flex items-center justify-center">
          <div className="fixed inset-0 flex justify-center z-[9999] bg-black bg-opacity-80  ">
            <div className="p-4 rounded-md  flex flex-col gap-5 md:w-[60%] w-full">
              <div
                className="bg-white  items-center justify-between w-full flex rounded-2xl pl-3 shadow-lg p-2 "
                style={{ top: 5 }}
              >
                <input
                  autoFocus
                  className="font-semibold tracking-wider  rounded-full w-full py-4 pl-6 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                  type="text"
                  placeholder="Search Products"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                <div
                  onClick={() => {
                    close(false);
                    setSearchText("");
                  }}
                  className="bg-gray-600 p-2 hover:bg-theme duration-300 cursor-pointer mx-2 rounded-full"
                >
                  <MdClose className=" text-xl text-white" />
                </div>
              </div>

              {searchText && (
                <div className="overflow-hidden w-full h-[27rem]  overflow-y-auto scroll rounded-xl border border-gray-200  text-center bg-white p-5">
                  <div className=" w-full flex flex-col gap-5 ">
                    {productValidating ? (
                      <>
                        <div className="w-full h-20 px-5 rounded-xl bg-slate-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <p className="w-12 h-12 rounded-lg bg-slate-300 animate-pulse"></p>
                            <p className="w-44 p-3 rounded-md bg-slate-300 animate-pulse"></p>
                          </div>
                          <p className="w-20 p-4 rounded-lg bg-slate-300 animate-pulse"></p>
                        </div>
                        <div className="w-full h-20 px-5 rounded-xl bg-slate-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <p className="w-12 h-12 rounded-lg bg-slate-300 animate-pulse"></p>
                            <p className="w-44 p-3 rounded-md bg-slate-300 animate-pulse"></p>
                          </div>
                          <p className="w-20 p-4 rounded-lg bg-slate-300 animate-pulse"></p>
                        </div>
                        <div className="w-full h-20 px-5 rounded-xl bg-slate-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <p className="w-12 h-12 rounded-lg bg-slate-300 animate-pulse"></p>
                            <p className="w-44 p-3 rounded-md bg-slate-300 animate-pulse"></p>
                          </div>
                          <p className="w-20 p-4 rounded-lg bg-slate-300 animate-pulse"></p>
                        </div>
                        <div className="w-full h-20 px-5 rounded-xl bg-slate-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <p className="w-12 h-12 rounded-lg bg-slate-300 animate-pulse"></p>
                            <p className="w-44 p-3 rounded-md bg-slate-300 animate-pulse"></p>
                          </div>
                          <p className="w-20 p-4 rounded-lg bg-slate-300 animate-pulse"></p>
                        </div>
                      </>
                    ) : productData?.length > 0 ? (
                      productData?.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            // href={`products/productId=${item.id}`}
                            className="w-full flex  bg-slate-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  justify-between  p-3 items-center rounded-xl  duration-500"
                          >
                            <div
                              onClick={() =>
                                router.push(
                                  `/products/${item?._id}?variantId=${item?.variantId}`
                                )
                              }
                              className="flex gap-5 items-center"
                            >
                              <img
                                src={item.images?.[0]?.imageUrl}
                                alt="productImage"
                                className=" w-20 h-20 rounded-lg object-contain"
                              />

                              <ul className=" flex flex-col gap-1 items-start">
                                <span className=" text-lg font-medium text-gray-600">
                                  {item?.name}
                                </span>
                                <p className=" text-sm font-medium text-gray-500">
                                  <span className="md:block hidden">
                                    {" "}
                                    Category :
                                  </span>{" "}
                                  {item?.category?.name}
                                </p>
                              </ul>
                            </div>
                            <Link
                              href={`/products/${item?._id}?variantId=${item?.variantId}`}
                              className=" font-medium px-5 py-2 md:block hidden  bg-gradient-to-bl from-rose-400 to-orange-600 text-white rounded-md "
                            >
                              View Details
                            </Link>
                          </div>
                        );
                      })
                    ) : (
                      <div className="w-full flex flex-col items-center p-4 ">
                        <img
                          src="/emptyProduct.webp" // Replace with your image path
                          alt="No Results"
                          className=" w-[16rem] h-[16rem] object-contain"
                        />
                        <h1 className=" font-bold text-lg text-center">
                          Product Not Available
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
export default Navbar;
