import AllProducts from "@/components/products/AllProducts";
import SideMenu from "@/components/products/SideMenu";
import CustomInputField from "@/core/CustomInputFiled";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import { useState } from "react";

const Home = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [startPrice, setStartPrice] = useState<string>("");
  const [endPrice, setEndPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [ratings, setRatings] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("desc");
  let url = `product/getAll?pageNumber=${pageNo}&limit=8`;
  category && (url += `&category=${category}`);
  startPrice && (url += `&minPrice=${Number(startPrice)}`);
  endPrice && (url += `&maxPrice=${Number(endPrice)}`);
  discount && (url += `&discount=${Number(discount)}`);
  ratings && (url += `&star=${Number(ratings)}`);
  sortBy && (url += `&sortBy=${sortBy}`);
  const { data, pagination, mutate, isValidating } = useSwr(url);

  let url2 = `product/getAll?sortBy=${sortBy}`;
  category && (url2 += `&category=${category}`);
  startPrice && (url2 += `&minPrice=${Number(startPrice)}`);
  endPrice && (url2 += `&maxPrice=${Number(endPrice)}`);
  discount && (url2 += `&discount=${Number(discount)}`);
  ratings && (url2 += `&star=${Number(ratings)}`);
  const { data: countData, isValidating: countLoading } = useSwr(url2);
  return (
    <PublicLayout
      title="Products | Shree Odisha Handloom"
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <section className="main-container py-10 w-full flex flex-col gap-5">
        <article className="flex justify-between items-center p-3 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg font-semibold">
          <div className="flex items-center gap-5">
            <span>Filter results</span>
            <span className=" tracking-wide font-medium md:text-base text-xs">
              Total{" "}
              {countLoading ? (
                <span className="px-3 py-[0.02rem] bg-gray-400 animate-pulse rounded-md"></span>
              ) : (
                `${countData?.length} `
              )}
              Product Found !
            </span>
          </div>
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
                {
                  label: "Sort By Latest",
                  value: "asc",
                },
                {
                  label: "High To Low",
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
        <main className="w-full lg:justify-between flex md:flex-row flex-col gap-10 lg:gap-4 ">
          <SideMenu
            category={category}
            setCategory={setCategory}
            startPrice={startPrice}
            setStartPrice={setStartPrice}
            endPrice={endPrice}
            setEndPrice={setEndPrice}
            discount={discount}
            setDiscount={setDiscount}
            ratings={ratings}
            setRatings={setRatings}
            setPageNo={setPageNo}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <AllProducts
            data={data}
            pagination={pagination}
            pageNo={pageNo}
            setPageNo={setPageNo}
            isValidating={isValidating}
            mutate={mutate}
          />
        </main>
      </section>
    </PublicLayout>
  );
};

export default Home;
