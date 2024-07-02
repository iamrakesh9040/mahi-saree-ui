import { Dispatch, SetStateAction, useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import Brands from "./Brands";
import Categories from "./Categories";
import Discount from "./Discount";
import PriceRangeSlider from "./PriceRangeSlider";
export const CUSTOMER_RATING = [
  {
    id: "1",
    value: "1",
  },
  {
    id: "2",
    value: "2",
  },
  {
    id: "3",
    value: "3",
  },
  {
    id: "4",
    value: "4",
  },
  {
    id: "5",
    value: "5",
  },
];
const SideMenu = ({
  category,
  setCategory,
  startPrice,
  setStartPrice,
  endPrice,
  setEndPrice,
  discount,
  setDiscount,
  ratings,
  setRatings,
  setPageNo,
  sortBy,
  setSortBy,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  startPrice: string;
  setStartPrice: Dispatch<SetStateAction<string>>;
  endPrice: string;
  setEndPrice: Dispatch<SetStateAction<string>>;
  discount: string;
  setDiscount: Dispatch<SetStateAction<string>>;
  ratings: string;
  setRatings: Dispatch<SetStateAction<string>>;
  setPageNo: Dispatch<SetStateAction<number>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [value, setValue] = useState<number[]>([0, 20000]);
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleBrand = () => {
    setIsBrandOpen(!isBrandOpen);
  };

  const handleRatingChange = (value: any) => {
    setRatings(value);
    setPageNo(1);
  };

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  };
  const handleRemoveFilter = () => {
    setCategory("");
    setDiscount("");
    setStartPrice("");
    setEndPrice("");
    setRatings("");
    setValue([0, 20000]);
    setPageNo(1);
    setIsCategoriesOpen(false);
    setSortBy("desc");
  };
  return (
    <>
      <aside className="hidden md:flex md:w-2/5  lg:w-1/4 gap-5 w-full h-full  flex-col  justify-center   bg-white ">
        <div className="">
          <p className="w-full flex justify-between  items-center ">
            <span className="uppercase font-semibold text-black text-lg">
              Filters
            </span>
            {category?.length > 0 ||
            String(startPrice).length > 0 ||
            String(endPrice).length > 0 ||
            String(discount).length > 0 ||
            String(ratings).length > 0 ? (
              <span
                onClick={handleRemoveFilter}
                className="text-sm py-1 px-2 rounded-md bg-primary text-white cursor-pointer"
              >
                Clear all
              </span>
            ) : null}
          </p>
        </div>
        <article className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-2 p-4  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <div
              className="flex justify-between gap-4 cursor-pointer"
              onClick={toggleCategories}
            >
              <p className="uppercase  font-medium tracking-wider text-[1rem]">
                Categories
              </p>
              <MdKeyboardArrowDown
                className={`transition-transform transform  text-xl group-hover:-rotate-180 duration-200 text-primary ${
                  isCategoriesOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isCategoriesOpen && (
              <Categories
                category={category}
                setCategory={setCategory}
                setPageNo={setPageNo}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <p className="uppercase  font-medium tracking-wider text-[1rem]">
              Price
            </p>
            <PriceRangeSlider
              setStartPrice={setStartPrice}
              setEndPrice={setEndPrice}
              value={value}
              setValue={setValue}
              setPageNo={setPageNo}
            />
          </div>

          <div className="flex flex-col gap-4 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <p className="uppercase  font-medium tracking-wider text-[1rem]">
              Discount
            </p>
            <Discount
              discount={discount}
              setDiscount={setDiscount}
              setPageNo={setPageNo}
            />
          </div>
          <div className="flex flex-col gap-4 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <p className="uppercase  font-medium tracking-wider text-[1rem] ">
              CUSTOMER RATINGS
            </p>
            <div className="flex flex-col gap-2 justify-center px-5">
              {CUSTOMER_RATING?.map((item) => {
                return (
                  <div key={item?.id} className="flex gap-3 items-center ">
                    <input
                      type="checkbox"
                      name=""
                      id={item?.value}
                      className=" w-4 h-4"
                      checked={ratings === item?.value}
                      onChange={() => handleRatingChange(item?.value)}
                    />
                    <label
                      htmlFor={item?.value}
                      className="flex items-center gap-1 cursor-pointer text-sm"
                    >
                      {item?.value}{" "}
                      <FaStar className=" text-amber-400 text-sm" /> & above
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </aside>
      <aside className="md:hidden flex flex-col  bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-3 rounded-md">
        <div className="w-full flex justify-between items-center py-2">
          <p className="w-full flex justify-between items-center ">
            <span className="uppercase font-semibold text-black text-xl">
              Filters
            </span>
            {category?.length > 0 ||
            String(startPrice).length > 0 ||
            String(endPrice).length > 0 ||
            String(discount).length > 0 ||
            String(ratings).length > 0 ? (
              <span
                onClick={handleRemoveFilter}
                className="text-sm py-1 px-2 rounded-md bg-primary text-white cursor-pointer"
              >
                Clear all
              </span>
            ) : null}
            <span
              onClick={toggleMenu}
              className="text-4xl cursor-pointer text-primary"
            >
              <BsFilterRight />
            </span>
          </p>
        </div>
        {sideMenu && (
          <article className="flex flex-col gap-5 justify-center py-2 border-t-2">
            <div className="flex flex-col gap-3  rounded-md">
              <div
                className="flex justify-between gap-4"
                onClick={toggleCategories}
              >
                <p className="uppercase  font-medium tracking-wider text-[1rem]">
                  Categories
                </p>
                <MdKeyboardArrowDown
                  className={`transition-transform transform  text-xl group-hover:-rotate-180 duration-200 text-primary ${
                    isCategoriesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {isCategoriesOpen && (
                <Categories
                  category={category}
                  setCategory={setCategory}
                  setPageNo={setPageNo}
                />
              )}
              <hr />
            </div>
            <div className="flex flex-col gap-3 ">
              <div className="flex justify-between gap-4" onClick={toggleBrand}>
                <p className="uppercase  font-medium tracking-wider text-[1rem]">
                  Brand
                </p>
                <MdKeyboardArrowDown
                  className={`transition-transform transform  text-xl group-hover:-rotate-180 duration-200 text-primary ${
                    isBrandOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {isBrandOpen && <Brands />}
              <hr />
            </div>
            <div className="flex flex-col gap-4 ">
              <p className="uppercase  font-medium tracking-wider text-[1rem]">
                Price
              </p>
              <PriceRangeSlider
                setStartPrice={setStartPrice}
                setEndPrice={setEndPrice}
                value={value}
                setValue={setValue}
                setPageNo={setPageNo}
              />
              <hr />
            </div>
            <div className="flex flex-col gap-4 ">
              <p className="uppercase  font-medium tracking-wider text-[1rem]">
                Discount
              </p>
              <Discount
                discount={discount}
                setDiscount={setDiscount}
                setPageNo={setPageNo}
              />
              <hr />
            </div>
            <div className="flex flex-col gap-4 ">
              <p className="uppercase  font-medium tracking-wider text-[1rem] ">
                CUSTOMER RATINGS
              </p>
              <div className="flex flex-col gap-2 justify-center px-5">
                {CUSTOMER_RATING.map((item) => {
                  return (
                    <div key={item?.id} className="flex gap-3 items-center ">
                      <input
                        type="checkbox"
                        name=""
                        id={item?.value}
                        className=" w-4 h-4"
                        checked={ratings === item.value}
                        onChange={() => handleRatingChange(item.value)}
                      />
                      <label
                        htmlFor={item?.value}
                        className="flex items-center gap-1 cursor-pointer text-sm"
                      >
                        {item?.value}{" "}
                        <FaStar className=" text-amber-400 text-sm" /> & above
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        )}
      </aside>
    </>
  );
};

export default SideMenu;
