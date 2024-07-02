/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import { RiDoubleQuotesL } from "react-icons/ri";
import { SetStateAction, useRef, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useSwr } from "@/hooks";

const ClientTestimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current: any, next: SetStateAction<number>) => {
      setCurrentSlide(next);
    },
  };
  const navigationRef = useRef<any>(null);
  const handlePrev = () => {
    if (navigationRef.current && currentSlide > 0) {
      navigationRef.current.slickPrev();
    }
  };
  const { data: testimonialData, isValidating, mutate } = useSwr(`testimonial`);

  const handleNext = () => {
    if (navigationRef.current && currentSlide < testimonialData?.length - 1) {
      navigationRef.current.slickNext();
    }
  };
  return (
    <section
      id="testimonial"
      className=" main-container py-10 w-full scroll-mt-10"
    >
      <div className="w-full h-fit relative flex flex-col gap-10 ">
        <div className="w-full flex items-center justify-between">
          <p className=" flex flex-col gap-1 ">
            <span className="md:sub-title font-semibold text-sm">
              What Customers Say About Us
            </span>
            <span className=" w-32 h-0.5 bg-primary rounded-full"></span>
          </p>
          <div className="flex justify-end items-center gap-4">
            <p
              onClick={handlePrev}
              className={`cursor-pointer w-10 h-10 bg-primary/20 flex items-center justify-center rounded-full ${
                currentSlide === 0 ? "opacity-50" : ""
              }`}
            >
              <IoMdArrowRoundBack className="text-secondary text-xl" />
            </p>
            <p
              onClick={handleNext}
              className={`cursor-pointer w-10 h-10 bg-primary/20 flex items-center justify-center rounded-full ${
                currentSlide === testimonialData?.length - 1 ? "opacity-50" : ""
              }`}
            >
              <IoMdArrowRoundForward className="text-secondary text-xl" />
            </p>
          </div>
        </div>

        <aside className="w-full overflow-hidden feature-slick-slider z-0">
          {isValidating ? (
            <>
              <div className="md:flex gap-3 hidden ">
                <TestimonialCardSkeleton />
                <TestimonialCardSkeleton />
                <TestimonialCardSkeleton />
              </div>
              <div className="md:hidden grid grid-cols-1 w-full gap-3 ">
                <TestimonialCardSkeleton />
              </div>
            </>
          ) : (
            <Slider ref={navigationRef} {...settings}>
              {testimonialData?.map((item: any) => (
                <TestimonialCard item={item} key={item?._id} />
              ))}
            </Slider>
          )}
        </aside>
      </div>
    </section>
  );
};

const TestimonialCard = ({ item }: { item: any }) => {
  return (
    <article className="!flex !items-center justify-center" key={item?._id}>
      <div className="flex flex-col gap-3 rounded-lg p-4">
        <div className="relative lg:h-60 2xl:h-56 w-full">
          <span className="absolute -bottom-2 left-8 z-10 w-5 h-5 rotate-45 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            {/* <BiSolidDownArrow className="text-4xl text-gray-100" /> */}
          </span>
          <div className="relative z-20 h-full md:w-[25vw] w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex justify-center items-center text-center rounded-[30px] p-2">
            <span className="absolute -bottom-2 left-8 z-10 w-5 h-5 rotate-45 bg-white ">
              {/* <BiSolidDownArrow className="text-4xl text-white" /> */}
            </span>
            <p className="text-sm font-normal p-6">{item.msg}</p>
            <span className="absolute top-1 left-2">
              <RiDoubleQuotesL className="text-3xl md:text-4xl text-primary" />
            </span>
            <span className="absolute bottom-1 right-2">
              <RiDoubleQuotesL className="text-3xl md:text-4xl text-primary rotate-180" />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5 py-2">
          <span className="rounded-full h-20 w-20 min-w-[5rem] flex items-center justify-center overflow-hidden">
            <img
              src="/customer.png"
              className="w-full h-full object-contain"
              alt=""
            />
          </span>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <p className=" text-sm font-semibold text-gray- font-sans">
              Happy Customer
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ClientTestimonial;

export const TestimonialCardSkeleton = () => (
  <article className="!flex !items-center justify-center">
    <div className="flex flex-col gap-3 rounded-lg p-4">
      <div className="relative md:h-60 2xl:h-56  md:w-full w-80 h-40">
        <span className="absolute -bottom-2 left-8 z-10 w-5 h-5 rotate-45 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] animate-pulse"></span>
        <div className="relative z-20 h-full md:w-[25vw] w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex justify-center items-center text-center rounded-[30px] p-2 animate-pulse">
          <p className="text-sm font-normal p-6"></p>
          <span className="absolute top-1 left-2 animate-pulse"></span>
          <span className="absolute bottom-1 right-2 animate-pulse"></span>
        </div>
      </div>
      <div className="flex items-center gap-5 py-2 animate-pulse">
        <span className="rounded-full h-20 w-20 min-w-[5rem] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        </span>
        <div className="flex flex-col animate-pulse">
          <h3 className="text-base font-semibold animate-pulse"></h3>
          <p className="text-sm font-semibold text-gray- font-sans animate-pulse"></p>
        </div>
      </div>
    </div>
  </article>
);
