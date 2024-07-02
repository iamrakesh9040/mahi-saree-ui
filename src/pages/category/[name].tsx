import { ProductCard } from "@/components/card";
import { PriceRangeSlider } from "@/components/products";
import { Skelton } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
interface IProduct {
  id: string;
  image: string;
  name: string;
  categoryName: string;
  sold: boolean;
}

const DynamicCategory = () => {
  const [value, setValue] = useState<number[]>([0, 20000]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [startPrice, setStartPrice] = useState<string>("");
  const [endPrice, setEndPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("desc");
  const { query } = useRouter();
  let url = query?.id
    ? `product/getAll?pageNumber=${pageNo}&limit=10&sortBy=desc&category=${query?.id}`
    : ``;
  startPrice && (url += `&minPrice=${Number(startPrice)}`);
  endPrice && (url += `&maxPrice=${Number(endPrice)}`);
  sortBy && (url += `&sortBy=${sortBy}`);
  const { data, isValidating } = useSwr(url);
  const handleRemoveFilter = () => {
    setStartPrice("");
    setEndPrice("");
    setValue([0, 20000]);
    setPageNo(1);
    setSortBy("desc");
  };
  return (
    <PublicLayout
      title={`${query?.name ? query?.name : `wait`} | Shree Odisha Handloom`}
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <div className="w-full flex flex-col gap-10">
        <div className="w-full h-[40vh] overflow-hidden relative">
          <div className="w-full h-full absolute left-0 bg-black/40 z-10 flex items-start"></div>
          <div className="w-full h-full absolute left-0 flex items-center justify-center z-20">
            <ul className="flex flex-col gap-2 w-full items-center">
              <p className="md:text-6xl text-3xl font-serif capitalize text-white font-medium">
                {query?.name}
              </p>
              <p className=" md:block hidden  text-white font-sans">{`Gift yourself and your loved ones with Shree Odisha Handloom's latest Essentials Collection, featuring a stunning array of handloom masterpieces. This collection promises elegance, comfort, and the rich heritage of traditional craftsmanship.`}</p>
              <p className="md:text-sm  text-xs text-center text-white font-sans">{`Indulge in hree Odisha Handloom's  Essentials Collection, where timeless elegance meets traditional craftsmanship.`}</p>
            </ul>
          </div>
          <ul className="flex items-center gap-2 md:left-32 left-24 top-10 z-30 absolute">
            <Link
              href="/"
              className="text-sm font-medium  hover-slide-border cursor-pointer text-white/80 hover:text-white duration-200 font-sans"
            >
              Home
            </Link>
            <span className="text-xs text-white">/</span>
            <p className="text-sm font-medium text-white/90 font-sans">
              {query?.name}
            </p>
          </ul>
          <img
            src="/Banner.png"
            className="w-full md:h-fit h-full object-cover"
            alt="Category Image"
          />
        </div>
        <div className="main-container flex items-start md:flex-row flex-col w-full gap-10 py-10">
          <div className=" md:w-[25%] w-full md:sticky md:top-48 flex flex-col gap-4 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <div className="uppercase  font-medium tracking-wider text-[1rem] w-full flex items-center justify-between">
              Price
              <p className="w-full flex justify-between items-center ">
                <span className="uppercase font-semibold text-black text-xl">
                  Filters
                </span>
                {String(startPrice).length > 0 ||
                String(endPrice).length > 0 ? (
                  <span
                    onClick={handleRemoveFilter}
                    className="text-sm py-1 px-2 rounded-md bg-primary text-white cursor-pointer"
                  >
                    Clear all
                  </span>
                ) : null}
              </p>
            </div>
            <PriceRangeSlider
              setStartPrice={setStartPrice}
              setEndPrice={setEndPrice}
              value={value}
              setValue={setValue}
              setPageNo={setPageNo}
            />
            {/* <hr /> */}
          </div>
          <div className="md:w-[75%] w-full flex flex-col gap-5">
            <article className="flex justify-between items-center p-3 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg font-semibold">
              <p className="flex items-center gap-5">
                <span className="md:block hidden">Filter results</span>
              </p>
              <div className="md:w-[15rem] w-[10rem]">
                <CustomInputField
                  key={1}
                  name="sorting"
                  type="select"
                  options={[
                    {
                      value: "desc",
                      label: "Default",
                    },
                    // {
                    //   label: "Sort By Popularity",
                    //   value: "sortByPopularity"
                    // },
                    {
                      label: "Sort By Latest",
                      value: "asc",
                    },
                    {
                      label: "Hight To Low",
                      value: "priceHighToLow",
                    },
                    {
                      label: "Low to High",
                      value: "priceLowToHigh",
                    },
                  ]}
                  value={sortBy}
                  onChange={(e: any) => {
                    setSortBy(e?.target?.value);
                  }}
                  fullWidth
                  label="Sort By"
                />
              </div>
            </article>
            <div className="w-full h-fit grid md:grid-cols-4 grid-cols-2 gap-5">
              {isValidating ? (
                <>
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                </>
              ) : data?.length > 0 ? (
                data?.map((curEle: IProduct, i: number) => (
                  <ProductCard
                    item={curEle}
                    key={curEle.id}
                    i={i}
                    isValidating={isValidating}
                  />
                ))
              ) : (
                <div className="w-full h-full col-span-5 flex items-center justify-center">
                  <div className="flex items-center gap-3 flex-col">
                    <img
                      src="/emptyProduct.webp"
                      className="w-full h-full rounded-xl"
                      alt=""
                    />
                    <p className="text-xl font-semibold text-gray-800">
                      Product Not Available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default DynamicCategory;
