/* eslint-disable @next/next/no-img-element */
import { Collapse, SideDrawer } from "@/components/common";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiMenuAlt1, HiOutlineShoppingCart } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/router";
import { useAuth, useSwr } from "@/hooks";
import { MdClose } from "react-icons/md";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: cartData, isValidating: cartValidating } = useSwr(
    user?._id ? `cart` : ``
  );
  const MENU_ARR = [
    {
      id: "1",
      name: "Home",
      path: "/",
      haveList: false,
    },
    {
      id: "2",
      name: "All Category",
      haveList: true,
      path: "/categories",
      list: [
        {
          id: 1,
          name: "Sambalpuri Silk Saree",
          image: "/category/1.jpg",
          path: "/categories",
        },
        {
          id: 2,
          name: "Cotton Saree",
          image: "/category/2.jpg",
          path: "/categories",
        },
        {
          id: 3,
          name: "Casual Saree",
          image: "/category/3.jpg",
          path: "/categories",
        },

        {
          id: 4,
          name: "Party Wear",
          image: "/category/4.webp",
          path: "/categories",
        },
        {
          id: 5,
          name: "Khandua Patto",
          image: "/category/5.jpeg",
          path: "/categories",
        },
        {
          id: 6,
          name: "Manibandh Cotton",
          image: "/category/6.jpg",
          path: "/categories",
        },
        {
          id: 7,
          name: "Sambalpuri Kurta",
          image: "/category/7.jpg",
          path: "/categories",
        },
        {
          id: 8,
          name: "Sambalpuri Shirt",
          image: "/category/8.jpg",
          path: "/categories",
        },
        {
          id: 9,
          name: "Sambalpuri Kurti",
          image: "/category/9.avif",
          path: "/categories",
        },
        {
          id: 10,
          name: "Sambalpuri Suite Piece",
          image: "/category/10.jpg",
          path: "/categories",
        },
      ],
    },
    {
      id: "3",
      name: "Sarees",
      haveList: true,
      path: "/products",
      list: [
        {
          id: 1,
          name: "Sambalpuri Silk",
          path: "/products",
        },
        {
          id: 2,
          name: "Cotton Saree",
          path: "/products",
        },
        {
          id: 3,
          name: "Casual Saree",
          path: "/products",
        },
        {
          id: 4,
          name: "Khandua Patto",
          path: "/products",
        },
        {
          id: 5,
          name: "Manibandh Cotton",
          path: "/products",
        },
      ],
    },
    {
      id: "4",
      name: "Sambalpuri-Cloth",
      haveList: true,
      path: "/products",
      list: [
        {
          id: 1,
          name: "Mens Kurta",
          path: "/products",
        },
        {
          id: 2,
          name: "Mens Shirt",
          path: "/products",
        },
        {
          id: 3,
          name: "Kurti",
          path: "/products",
        },
        {
          id: 4,
          name: "Suit Piece",
          path: "/products",
        },
      ],
    },
    {
      id: "5",
      name: "Contact Us",
      haveList: false,
      path: "/contact",
    },
    // {
    //   id: "6",
    //   name: "My Account",
    //   haveList: false,
    //   path: user ? "/my-account" : "/login",
    // },
    {
      id: "7",
      name: user?._id ? "My Account" : "Sign Up",
      haveList: false,
      path: user ? "/my-account" : "/register",
    },
  ];

  return (
    <>
      <Search open={searchOpen} close={setSearchOpen} />
      <section className="block lg:hidden main-container py-4 bg-white text-black">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <p
              onClick={() => setOpen(true)}
              className="w-10 h-10 rounded-lg  cursor-pointer p-1 bg-gray-700/5 flex items-center justify-center"
            >
              <HiMenuAlt1 className="text-2xl text-gray-700" />
            </p>
            <Link href="/" className=" flex items-center">
              <img src="/logo.png" alt="Shreyan" className="w-32 md:w-40" />
            </Link>
          </div>
          <ul className="flex items-center gap-6">
            <span
              onClick={() => setSearchOpen(true)}
              className=" cursor-pointer"
            >
              <BiSearch className=" text-secondary text-2xl hover:text-primary duration-300" />
            </span>
            <span
              onClick={() => {
                if (user?._id && user?.role !== "ADMIN") {
                  router.push(`/my-account`);
                } else if (user?._id && user?.role === "ADMIN") {
                  router.push(`/admin`);
                } else {
                  router.push(`/login`);
                }
              }}
              className="cursor-pointer"
            >
              <AiOutlineUser className=" !text-secondary text-xl hover:text-primary  duration-300" />
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
                <HiOutlineShoppingCart className=" text-secondary text-xl hover:text-primary duration-300" />
              </p>
            )}
          </ul>
        </div>
        <SideDrawer
          open={open}
          onClose={() => setOpen(false)}
          anchor={"left"}
          drawerStyle="w-4/5 md:w-4/6 bg-green-400 h-screen"
        >
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-[15%] justify-between items-center flex bg-gray-800 p-4">
              <img
                src="/logo.png"
                className="w-48 md:w-40 h-fit object-contain"
                alt=""
              />
              <p
                onClick={() => setOpen(false)}
                className="w-10 h-10 md:w-14 md:h-14 rounded-lg  ] duration-300  cursor-pointer p-1 flex items-center justify-center"
              >
                <AiOutlineClose className="text-2xl md:text-3xl text-[#E1CAB7] cursor-pointer" />
              </p>
            </div>
            <div className="w-full h-full overflow-y-auto">
              <div className="w-full h-full flex flex-col gap-[0.5] py-3 px-4">
                {MENU_ARR.map((item) =>
                  item?.haveList ? (
                    <Collapse key={item?.id} title={item?.name}>
                      <ul className="w-full flex flex-col gap-1 ">
                        {item?.list?.map((data: any) => (
                          <div
                            onClick={() =>
                              router.push(`/products?search=${data?.name}`)
                            }
                            key={data?.id}
                          >
                            <ul className="w-full flex items-center gap-5  hover:bg-white duration-300 rounded-lg p-3">
                              {/* {data?.image && (
                              <img
                                src={data?.image}
                                className="w-8 h-8 object-fill rounded-lg"
                                alt=""
                              />
                            )} */}
                              <p className="font-semibold text-gray-800">
                                {data?.name}
                              </p>
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </Collapse>
                  ) : (
                    <Link href={item?.path} key={item?.id}>
                      <span className="flex items-center gap-5 w-full rounded-lg bg-white cursor-pointer hover:bg-gray-700/5 duration-300 p-4">
                        <p className="text-lg font-semibold text-gray-800">
                          {item?.name}
                        </p>
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="w-full bg-gray-700 flex items-center">
              <div className="w-full py-3 px-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={user?._id ? user?.avatar : "userDefaultImage.png"}
                    className="w-12 h-12 rounded-lg object-cover"
                    alt=""
                  />
                  <p className="flex flex-col">
                    <span className="text-lg  font-bold text-[#e1cab7]">
                      {user?._id ? user?.name : "Guest"}
                    </span>
                    {user?._id ? (
                      <span className="text-xs md:text-lg text-[#e1cab7]">
                        {user?.email}
                      </span>
                    ) : null}
                  </p>
                </div>
                {user?._id ? (
                  <div onClick={() => logout()}>
                    <TbLogout2 className="text-3xl md:text-5xl cursor-pointer text-[#e1cab7]" />
                  </div>
                ) : (
                  <Link href="/login">
                    <AiOutlineUser className="text-3xl md:text-5xl cursor-pointer text-[#e1cab7]" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SideDrawer>
      </section>
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
export default MobileNavbar;
