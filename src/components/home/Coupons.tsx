/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import moment from "moment";
import { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slider from "react-slick";

const Coupons = () => {
  const slider = useRef<any>(null);
  const sliderTwo = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, mutate, isValidating } = useSwr(`coupon`);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 700,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    beforeChange: (nextSlide: number) => setCurrentIndex(nextSlide),
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="main-container top-spacing">
      <div className="bg-white w-full gap-5 shadow-box lg:flex flex-col rounded-2xl overflow-hidden h-full hidden">
        <div className="flex justify-between">
          <article className="flex flex-col gap-1 px-2">
            <div className="w-full">
              <h2 className="sub-title">Offer Corner</h2>
            </div>
            <p className="h-0.5 w-48 bg-primary rounded-full"></p>
          </article>
        </div>
        <div className="flex flex-col gap-6">
          <div className="company-slick-slider overflow-hidden">
            {isValidating ? (
              <div className="w-full md:grid grid-cols-2 gap-4 ">
                <CouponSkeleton />
                <CouponSkeleton />
              </div>
            ) : (
              <Slider {...settings} ref={slider} className="our-store-dots">
                {data?.map((item: any, i: any) => (
                  <div key={i} className="w-full p-8">
                    <div className="flex w-full h-[18rem] relative overflow-hidden border-b-2 border-black rounded-md">
                      <div className="lg:flex flex-col lg:items-center lg:justify-center 2xl:pl-12 pl-2 rounded-b-md">
                        <p className="font-light">UP TO</p>
                        <div className="flex items-center">
                          <p className="text-6xl text-gray-700 ">
                            {item?.amount}
                          </p>
                          <div className="flex flex-col gap-0">
                            <p className="text-base">₹</p>
                            <p className="text-base">Off</p>
                          </div>
                        </div>
                        <div className="flex text-xs gap-2 items-center">
                          <p className="text-base">on min. purchase of</p>
                          <p className="text-base font-semibold text-gray-600">
                            ₹{item?.minAmount}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-gray-600 capitalize">
                          {item?.category?.name}
                        </p>
                        <div className="flex items-center gap-1 text-base">
                          <p>{moment(item?.startDate).format("DD MMM YYYY")}</p>
                          <p>-{moment(item?.endDate).format("DD MMM YYYY")}</p>
                        </div>
                      </div>
                      <div className="absolute left-0 bg-amber-300 md:w-[0.5rem] md:h-[20rem] -top-14 rotate-45 z-[999]"></div>
                      <div className="absolute md:left-8 bg-black md:w-[2rem] md:h-[18rem] -top-14 rotate-45 z-[99]"></div>
                      <div className="absolute -left-28 top-12 md:w-[25rem] md:h-[5rem] -rotate-45 text-white z-[1000]">
                        <p className="text-center md:text-xl md:font-medium">
                          {item?.couponCode}
                        </p>
                      </div>
                      <img
                        className="2xl:w-[25rem] lg:w-[19rem] md:w-[10rem] absolute 2xl:-right-4 2xl:bottom-2 rounded-md lg:-right-2 bottom-6 -right-4"
                        src={item?.imageUrl}
                        alt=""
                      />
                      <div className="border-2 border-black w-full 2xl:h-[18rem] absolute top-2 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
      <div className="w-full p-2 md:hidden gap-4 ">
        <Slider {...settings} ref={slider} className="our-store-dots">
          {isValidating ? (
            <div className="w-full">
              <MobileCouponSkeleton />
            </div>
          ) : (
            data?.map((item: any, i: any) => (
              <div
                key={i}
                className="relative w-full bg-white rounded-md shadow-lg"
              >
                <img
                  className="w-full h-[15rem] object-cover rounded-t-md"
                  src={item?.imageUrl}
                  alt=""
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div>
                        <p className="text-lg font-medium text-gray-600 capitalize">
                          {item?.category?.name}
                        </p>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <p>{moment(item?.startDate).format("DD MMM YYYY")}</p>
                        <p className="mx-1">-</p>
                        <p>{moment(item?.endDate).format("DD MMM YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="text-lg font-medium text-gray-600">
                      UP TO ₹{item?.amount}
                    </p>

                    <p className="text-sm font-medium text-gray-600">
                      Off on min. purchase of ₹{item?.minAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Coupons;

export const CouponSkeleton = () => (
  <div className="rounded-md bg-gray-100 p-4 animate-pulse">
    <div className="h-[15rem] bg-gray-200 rounded-t-md"></div>
  </div>
);

export const MobileCouponSkeleton = () => (
  <div className="rounded-md bg-gray-100 p-4 animate-pulse">
    <div className="h-[15rem] bg-gray-200 rounded-t-md"></div>
  </div>
);
