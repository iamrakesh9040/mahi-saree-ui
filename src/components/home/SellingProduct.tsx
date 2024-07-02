import Link from "next/link";
import { useSwr } from "@/hooks";
import { ProductCard } from "../card";
import { Skelton } from "@/core";
interface IProduct {
  id: string;
  image: string;
  name: string;
  categoryName: string;
  sold: boolean;
}

const SellingProduct = () => {
  const { data, isValidating, mutate } = useSwr(
    `product/getAll?pageNumber=1&limit=10`
  );

  return (
    <section className=" main-container w-full top-spacing">
      <div className=" main-container flex flex-col gap-10 w-full h-fit border border-primary rounded-lg  md:px-5 p-3 md:pb-5 pb-3 md:pt-10 pt-6 relative">
        <p className=" absolute -top-4 left-10 px-5  bg-white sub-title ">
          Browse Our Products
        </p>
        <div className=" w-full h-full grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-5 ">
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
              <Skelton />
              <Skelton />
            </>
          ) : (
            data?.length > 0 &&
            data?.map((curEle: any, i: number) => (
              <ProductCard
                item={curEle}
                key={curEle.id}
                i={i}
                mutate={mutate}
                isValidating={isValidating}
              />
            ))
          )}
        </div>
        <article className="flex items-center justify-center">
          <Link
            href="/products"
            className="rounded-full px-6 py-3 overflow-hidden relative group cursor-pointer border-2 font-medium bg-primary text-white"
          >
            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gradient-to-r from-primary/10  to-primary/30 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-white transition duration-300 group-hover:text-white ease font-semibold">
              View All Products
            </span>
          </Link>
        </article>
      </div>
    </section>
  );
};

export default SellingProduct;
