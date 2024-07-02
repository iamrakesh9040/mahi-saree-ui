/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";

const Products = () => {
  const { data, isValidating, mutate } = useSwr(`category/productCount`);
  return (
    <section className="main-container top-spacing w-full flex flex-col gap-5 ">
      <p className="flex flex-col gap-1">
        <span className="sub-title">Categories</span>
        <span className="w-16 md:w-24 h-0.5 rounded-2xl bg-gradient-to-r  from-primary/90 to-primary/70"></span>
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 md:gap-10 gap-3 items-center pt-4">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full md:h-[20rem] h-[7rem] relative rounded-lg cursor-pointer group overflow-hidden"
          >
            <div className="z-10 duration-200 absolute w-full h-full left-0 bg-black/30 rounded-lg flex items-center justify-center">
              <p className=" flex flex-col gap-1 items-center">
                {item?.productCount > 0 && (
                  <span className=" text-white md:font-medium md:text-2xl text-base font-sans">
                    {item?.productCount} Products
                  </span>
                )}
                <span className=" font-semibold text-white cursor-pointer md:text-xl text-sm hover-slide-border">
                  View
                </span>
              </p>
            </div>
            <img
              src={item?.image}
              className="w-full h-full object-cover rounded-lg group-hover:scale-110 duration-300"
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
