import { useSwr } from "@/hooks";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Slider from "react-slick";
import { ProductCard } from "../card";

const SimilarProduct = ({ data: productData, mutate, isValidating }: any) => {
  const { data: itemData } = useSwr(
    `product/getAll?category=${productData?.category?._id}`
  );

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 250,
    cssEase: "linear",
    pauseOnHover: false,
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
          slidesToShow: 2,
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
          slidesToShow: 1,
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
  return (
    <section className="main-container py-5">
      <main className="flex flex-col gap-5 bg-white rounded-md shadow-[0px_0px_7px_2px_#00000024] p-3">
        <div className=" w-full flex items-center justify-between">
          <article className="flex flex-col gap-1 ">
            <div className="w-full flex items-center justify-between">
              <h2 className=" text-gray-700 font-semibold text-2xl">
                Similar Products
              </h2>
            </div>

            <p className="h-0.5 w-24 bg-primary/60 hover:bg-primary duration-200 rounded-full"></p>
          </article>
          {itemData?.length > 5 && (
            <div className=" flex items-center gap-5">
              <p
                onClick={handlePrev}
                className=" w-10 h-10 p-2 cursor-pointer rounded-full bg-primary/60 hover:bg-primary duration-200 flex items-center justify-center"
              >
                <FaArrowLeft className="text-lg text-white" />
              </p>
              <p
                onClick={handleNext}
                className=" w-10 h-10 p-2 cursor-pointer rounded-full bg-primary/60 hover:bg-primary duration-200 flex items-center justify-center"
              >
                <FaArrowRight className="text-lg text-white" />
              </p>
            </div>
          )}
        </div>
        {itemData?.length > 5 ? (
          <article className="w-full category-slick-slider industry-slider">
            <Slider ref={navigationRef} {...settings}>
              {itemData?.map((curEle: any, i: number) => {
                return (
                  <article
                    className="mx-auto !flex items-center px-2 pb-4 pt-5"
                    key={i}
                  >
                    <ProductCard
                      item={curEle}
                      key={curEle.id}
                      i={i}
                      mutate={mutate}
                      isValidating={isValidating}
                    />
                  </article>
                );
              })}
            </Slider>
          </article>
        ) : (
          <>
            <article className="w-full lg:hidden block category-slick-slider industry-slider">
              <Slider ref={navigationRef} {...settings}>
                {itemData?.map((curEle: any, i: number) => {
                  return (
                    <article
                      className="mx-auto !flex items-center px-2 pb-4 pt-5"
                      key={i}
                    >
                      <ProductCard
                        item={curEle}
                        key={curEle.id}
                        i={i}
                        mutate={mutate}
                        isValidating={isValidating}
                      />
                    </article>
                  );
                })}
              </Slider>
            </article>
            <div className="w-full items-center lg:grid hidden grid-cols-5 gap-5 place-items-center">
              {itemData?.map((item: any, i: number) => (
                <ProductCard
                  item={item}
                  key={i}
                  i={i}
                  mutate={mutate}
                  isValidating={isValidating}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </section>
  );
};

export default SimilarProduct;
