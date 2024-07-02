/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import { Pagination } from "@mui/material";
import ProductCard from "../card/ProductCard";
import { Skelton } from "@/core";

const AllProducts = ({
  data,
  pagination,
  pageNo,
  setPageNo,
  isValidating,
  mutate,
}: any) => {
  return (
    <main className="w-full flex flex-col justify-between items-center gap-10">
      <div className="w-full h-fit grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5">
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
          data?.map((curEle: any, i: number) => (
            <ProductCard
              item={curEle}
              key={curEle.id}
              i={i}
              mutate={mutate}
              isValidating={isValidating}
            />
          ))
        ) : (
          <div className="w-full h-full lg:col-span-4 2xl:col-span-4 col-span-2 flex items-center justify-center">
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
      <div className="flex items-center gap-5">
        <Pagination
          count={Math.ceil(
            Number(pagination?.totalCount || 1) / Number(pagination?.limit || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
          page={pageNo}
        />
      </div>
    </main>
  );
};

export default AllProducts;
