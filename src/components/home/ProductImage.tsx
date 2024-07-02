/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Slider from "react-slick";

const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 550,
    autoplay: true,
    cssEase: "linear",
    autoplaySpeed: 7000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const navigationRef = useRef<any>(null);
  const handlePrev = () => {
    navigationRef?.current?.slickPrev();
  };
  const handleNext = () => {
    navigationRef?.current?.slickNext();
  };

  const {
    data: categoryData,
    error,
    isValidating,
  } = useSwr(`category/productCount`);

  return (
    <section id="category" className="">
      <div className="main-container  flex flex-col  gap-10 pt-10 ">
        <div className=" flex items-center justify-between">
          <article className="flex flex-col gap-1 px-2">
            <div className="w-full ">
              <h2 className="sub-title ">Browse Our Categories</h2>
            </div>
            <p className="h-0.5  w-48 bg-primary rounded-full"></p>
          </article>
          <Link href="/products">
            <p className=" bg-primary rounded-lg text-white px-2 sm:px-3 md:px-10 py-1 sm:py-2 text-sm sm:text-base">
              View All
            </p>
          </Link>
        </div>

        <div className="w-full category-slick-slider industry-slider pt-8 lg:pt-16 relative">
          <p
            onClick={handlePrev}
            className="w-10 h-10 bg-primary rounded-full absolute top-[45%]  -left-2 z-10 cursor-pointer flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl text-white" />
          </p>
          <p
            onClick={handleNext}
            className="w-10 h-10 bg-primary rounded-full absolute top-[45%]  -right-2 z-10 cursor-pointer flex items-center justify-center"
          >
            <MdKeyboardArrowRight className="text-2xl text-white" />
          </p>
          {isValidating ? (
            <div className=" w-full h-full grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 place-items-center">
              <CategorySkeleton />
              <CategorySkeleton />
              <CategorySkeleton />
              <CategorySkeleton />
              <CategorySkeleton />
              <CategorySkeleton />
            </div>
          ) : (
            <Slider ref={navigationRef} {...settings}>
              {categoryData?.map((curElm: any, index: number) => (
                <article
                  className="mx-auto !flex items-center px-2 "
                  key={index}
                >
                  <div className="w-full">
                    <CategoryCard item={curElm} index={index} key={index} />
                  </div>
                </article>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};
const CategoryCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ scale: 1, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: index < 5 ? index * 0.18 : 0.1 }}
      exit={{ scale: 1, opacity: 0, y: 20 }}
      viewport={{ once: true }}
      className="group relative w-full overflow-hidden p-2 h-[21rem]"
    >
      <div className="w-full h-72 flex items-center justify-center duration-500 bg-white group-hover:shadow-xl rounded-xl shadow-[0px_0px_2px_1px_#00000024]">
        <p className="absolute w-full justify-center flex group-hover:bottom-5 -bottom-10 duration-500">
          <Link
            href={`/products?category=${item?.name}`}
            className=" p-3 bg-primary rounded-full flex justify-center items-center"
          >
            <FaArrowRight className=" text-white" />
          </Link>
        </p>
        <div className=" flex items-center flex-col gap-2">
          <img
            src={item?.image || "/NotImage.jpg"}
            className=" group-hover:scale-110 duration-500 w-44 h-44 rounded-lg object-cover"
            alt=""
          />
          <p className="text-sm uppercase font-semibold text-gray-800 flex w-full items-center justify-center">
            {item.categoryName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default Category;

export const CategorySkeleton = () => (
  <motion.div className="group relative w-full overflow-hidden p-2 h-[21rem] ">
    <div className="w-full h-72 flex items-center justify-center duration-500 bg-white group-hover:shadow-xl rounded-xl shadow-[0px_0px_2px_1px_#00000024]">
      <div className="flex items-center flex-col gap-2">
        <div className="animate-pulse h-44 w-44 rounded-lg bg-gray-300" />
        <p className="text-sm uppercase font-semibold text-gray-800 flex w-full items-center justify-center">
          <span className="animate-pulse w-1/2 h-5 rounded border border-gray-300" />
        </p>
      </div>
    </div>
  </motion.div>
);
