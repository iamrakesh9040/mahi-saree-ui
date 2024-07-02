/* eslint-disable @next/next/no-img-element */
import { Button } from "@/core";
import { useMutation, useSwr } from "@/hooks";
import Link from "next/link";
import { useState } from "react";
import {
  FaAngleRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { toast } from "react-toastify";
const category = [
  {
    id: 21,
    menuItem: "Sambalpuri Silk Sarees",
    path: "#",
  },
  {
    id: 22,
    menuItem: "Cotton Sarees",
    path: "#",
  },
  {
    id: 23,
    menuItem: "Casual Sarees",
    path: "#",
  },
  {
    id: 24,
    menuItem: "Party Wear",
    path: "#",
  },
  {
    id: 25,
    menuItem: "Khandua Patto",
    path: "#",
  },
  {
    id: 25,
    menuItem: "Maniabandh Cotton ",
    path: "#",
  },
  {
    id: 25,
    menuItem: "Boys Sambalpuri Kurta Shirt ",
    path: "#",
  },
  {
    id: 25,
    menuItem: "Sambalpuri Suit Piece And Kurti ",
    path: "#",
  },
];
const QUICKLINKS = [
  {
    id: "4",
    menuName: "Quick Links",
    subMenu: [
      {
        id: 1,
        name: "Home",
        link: "/",
      },
      {
        id: 2,
        name: "About Us",
        link: "/about-us",
      },
      {
        id: 3,
        name: "Products",
        link: "/products",
      },
      {
        id: 4,
        name: "Testimonials",
        link: "/#testimonial",
      },
    ],
  },
];
const CONNECT = [
  {
    id: "3",
    menuName: "Connect",
    subMenu: [
      {
        id: 1,
        name: "Contact Us",
        link: "/contact",
      },
      {
        id: 2,
        name: "Privacy Policy",
        link: "/privacy-policy",
      },
      {
        id: 3,
        name: "Terms & Condition",
        link: "/terms-and-conditions",
      },
      {
        id: 5,
        name: "FAQ",
        link: "/faq",
      },
    ],
  },
];

const Footer = () => {
  const { mutation, isLoading } = useMutation();
  const { data: footerData, isValidating } = useSwr(`footer`);
  const { data: facebookData } = useSwr(`socialMediaLinks/facebook`);
  const { data: whatsappData } = useSwr(`socialMediaLinks/whatsapp`);
  const { data: instagramData } = useSwr(`socialMediaLinks/instagram`);
  const { data: youtubeData } = useSwr(`socialMediaLinks/youtube`);
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  const handleEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };
  const handleSubscribe = async () => {
    try {
      const data = await mutation(`subscribe`, {
        method: "POST",
        body: {
          email: email,
        },
      });
      if (data?.status === 200) {
        toast.success("Subscribed Successfully");
      } else {
        toast.error(data?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-[40vh] flex items-center relative justify-center">
        <img
          src="/subscribe.png"
          className="w-full h-full  object-cover"
          alt="image"
        />
        <div className="w-fit  h-fit p-10 rounded-xl bg-white absolute top-1/2  -translate-y-1/2 md:right-48 md:flex hidden  flex-col gap-5">
          <p className="text-xl font-serif font-semibold text-gray-700">
            Subscribe to our Platform
          </p>
          <p className=" font-medium  text-gray-700 md:text-base text-sm">
            Promotions, new products and sales. Directly to your inbox.
          </p>
          <div className="w-full flex items-center gap-5">
            <div className="flex flex-col">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmail(e.target.value);
                }}
                name=""
                value={email}
                placeholder="Enter your email"
                className=" placeholder:text-gray-600 placeholder:font-light placeholder:text-sm  outline-none  border rounded-md p-3 hover:border-gray-900 border-gray-500"
                id="email"
              />
              {emailValidation && (
                <p className="text-red-500 text-sm mt-2">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <Button
              className="md:px-6 px-3 text-sm md:text-base cursor-pointer py-3 !bg-black font-semibold text-white rounded-lg"
              // onClick={() => {
              //   handleSubscribe(), setEmail("");
              // }}
              loading={isLoading}
              onClick={() => (emailValidation ? null : handleSubscribe())}
              disabled={emailValidation}
            >
              Subscribe
            </Button>
          </div>
        </div>
        <div className="w-full h-full absolute left-0 flex md:hidden items-center justify-center lg:p-8 p-4">
          <div className="w-full h-fit  rounded-xl bg-white md:right-48  flex-col flex justify-center px-8  py-4 gap-5">
            <p className="text-xl font-serif font-semibold text-gray-700">
              Subscribe to our Platform
            </p>
            <p className=" font-medium  text-gray-700 md:text-base text-sm">
              Promotions, new products and sales. Directly to your inbox.
            </p>
            <div className="w-full flex md:flex-row flex-col items-center gap-5">
              <div className="flex flex-col">
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleEmail(e.target.value);
                  }}
                  name=""
                  value={email}
                  placeholder="Enter your email"
                  className=" placeholder:text-gray-600 placeholder:font-light placeholder:text-sm  outline-none  border rounded-md p-3 hover:border-gray-900 border-gray-500"
                  id="email"
                />
                {emailValidation && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <Button
                onClick={() => handleSubscribe()}
                loading={isLoading}
                className="px-3 text-sm md:text-base cursor-pointer py-3 !bg-black font-semibold text-white rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 top-spacing">
        <section className="main-container pb-5 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center w-full">
            <div className="flex flex-col gap-5 w-full">
              {/* {footerData?.map((item: any) => {
                return (
                  <div key={item?._id} className="flex flex-col gap-1 w-full">
                    <img
                      src={item?.image}
                      alt="asd"
                      className="w-52 h-fit object-fill"
                    />
                    <p className="text-white font-semibold flex-col">
                      {item?.title}
                      <p className="flex flex-col">{item?.description}</p>
                    </p>
                  </div>
                );
              })} */}
              <div className="w-full flex gap-5 items-center">
                {facebookData?.map((item: any) => {
                  return (
                    <div
                      key={item?._id}
                      className="text-white p-2 bg-facebook text-xl rounded-full hover:bg-white hover:text-facebook duration-500"
                    >
                      <Link
                        href={item?.link || "#"} // Provide a default value like '#'
                      >
                        <FaFacebook />
                      </Link>
                    </div>
                  );
                })}

                {instagramData?.map((item: any) => {
                  return (
                    <div
                      key={item?._id}
                      className="text-white p-2  bg-instagram text-xl rounded-full hover:bg-white hover:text-instagram duration-500"
                    >
                      <Link href={item?.link}>
                        <FaInstagram />
                      </Link>
                    </div>
                  );
                })}

                {whatsappData?.map((item: any) => {
                  return (
                    <div
                      key={item?._id}
                      className="text-white p-2  bg-whatsapp text-xl rounded-full hover:bg-white hover:text-whatsapp duration-500"
                    >
                      <Link href={item?.link || "#"}>
                        <FaWhatsapp />
                      </Link>
                    </div>
                  );
                })}

                {youtubeData?.map((item: any) => {
                  return (
                    <div
                      key={item?._id}
                      className="text-white p-2  bg-youtube text-xl rounded-full hover:bg-white hover:text-youtube duration-500"
                    >
                      <Link href={item?.link || "#"}>
                        <FaYoutube />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            {QUICKLINKS.map((item, index) => {
              return (
                <div key={index} className="flex gap-4 flex-col">
                  <p className=" text-lg md:text-xl lg:text-2xl capitalize tracking-wide md:font-medium font-bold text-white">
                    {item.menuName}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {item.subMenu.map((subItem: any, index: number) => {
                      return (
                        // <Link key={index} className=" duration-500 text-gray-200  " href={subItem.link}>

                        // <li className="capitalize list-none w-fit text-gray-300 border-b border-transparent hover:border-secondary hover:text-white hover:pl-1.5 duration-500 common-transition">{subItem.name}</li>
                        // </Link>
                        <span key={index} className="flex items-center gap-1 ">
                          <FaAngleRight className="text-[1rem] text-white group-hover:text-violet-600" />
                          <Link
                            href={subItem.link}
                            className="group relative inline-block overflow-hidden  w-fit text-gray-300 py-1  hover:pl-2 duration-300   active:text-white"
                          >
                            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-300 group-hover:w-full"></span>

                            {subItem.name}
                          </Link>
                        </span>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            <div className="flex gap-4 flex-col">
              <p className=" text-lg md:text-xl lg:text-2xl capitalize tracking-wide md:font-medium font-bold text-white">
                Categories
              </p>
              <ul className="flex flex-col gap-2">
                {category.map((subItem: any, index: number) => {
                  return (
                    <span key={index} className="flex items-center gap-1 ">
                      <FaAngleRight className="text-[1rem] text-white group-hover:text-violet-600" />
                      <Link
                        href={`/products?category=${subItem?.name}`}
                        className="group relative inline-block overflow-hidden  w-fit text-gray-300 py-1  hover:pl-2 duration-300   active:text-white"
                      >
                        <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-300 group-hover:w-full"></span>

                        {subItem.menuItem}
                      </Link>
                    </span>
                  );
                })}
                <span className="flex items-center gap-1 ">
                  <FaAngleRight className="text-[1rem] text-white group-hover:text-violet-600" />
                  <Link
                    href="/#category"
                    className="group relative inline-block overflow-hidden  w-fit text-gray-300 py-1  hover:pl-2 duration-300   active:text-white"
                  >
                    <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-300 group-hover:w-full"></span>
                    View More
                  </Link>
                </span>
              </ul>
            </div>

            {CONNECT.map((item, index) => {
              return (
                <div key={index} className="flex gap-4 flex-col">
                  <p className=" text-lg md:text-xl lg:text-2xl capitalize tracking-wide md:font-medium font-bold text-white ">
                    {item.menuName}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {item.subMenu.map((subItem: any, index: number) => {
                      return (
                        // <Link key={index} className=" duration-500 text-gray-200  " href={subItem.link}>
                        // <li className="capitalize list-none w-fit text-gray-300 border-b border-transparent hover:border-secondary hover:text-white hover:pl-1.5 duration-500 common-transition">{subItem.name}</li>
                        // </Link>
                        <span key={index} className="flex items-center gap-1 ">
                          <FaAngleRight className="text-[1rem] text-white group-hover:text-violet-600" />
                          <Link
                            href={subItem.link}
                            className="group relative inline-block overflow-hidden  w-fit text-gray-300 py-1  hover:pl-2  active:text-white"
                          >
                            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-300 group-hover:w-full"></span>

                            {subItem.name}
                          </Link>
                        </span>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <hr className=" w-full bg-white" />
          <div className="flex items-center justify-between text-white font-semibold flex-col md:flex-row">
            <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
            <p className="text-center text-[1rem]">
              Designed And Developed by{" "}
              <span className=" text-sm text-gray-300 ">
                Rajesh Kumar Behera
              </span>
            </p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
