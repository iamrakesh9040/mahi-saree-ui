/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import Link from "next/link";
import Slider from "react-slick";

type LogoSliderType = {
  id: string;
  imageUrl: string;
};

const LogoSlider = ({
  title,
  Arr,
  mutate,
  isValidating,
}: {
  title: string;
  Arr: any;
  mutate: any;
  isValidating: any;
}) => {
  const settings = {
    infinite: true,
    slidesToShow: 7,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <section className="main-container flex flex-col gap-10 py-6">
      <div className=" flex items-center justify-between">
        <article className="flex flex-col gap-1 px-2">
          <div className="w-full ">
            <h2 className="sub-title ">{title}</h2>
          </div>
          <p className="h-0.5  w-48 bg-primary rounded-full"></p>
        </article>
        <Link href="/products">
          <p className="bg-primary rounded-lg text-white px-2 sm:px-3 md:px-10 py-1 sm:py-2 text-sm sm:text-base">
            View All
          </p>
        </Link>
      </div>

      <div className="relative w-full overflow-hidden feature-slick-slider z-0 ">
        <div className="absolute bg-gradient-to-r from-white via-white/40 to-white/10 h-[10rem] w-[8rem] left-0 z-10"></div>
        <div className="absolute bg-gradient-to-l from-white via-white/40 to-white/10 h-[10rem] w-[8rem] right-0 z-10"></div>
        <>
          {isValidating ? (
            <div className="w-full h-full grid 2xl:grid-cols-8 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 place-items-center ">
              <Skelton />
              <Skelton />
              <Skelton />
              <Skelton />
              <Skelton />
              <Skelton />
              <Skelton />
              <Skelton />
            </div>
          ) : (
            <Slider {...settings}>
              {Arr?.map((item: any, index: number) => (
                <div
                  className="w-40 h-24 bg-white border overflow-hidden rounded-xl border-primary/20  !flex !items-center !justify-center "
                  key={index}
                >
                  <img
                    className="w-ful h-fit rounded-xl object-cover"
                    src={item}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          )}
        </>
      </div>
    </section>
  );
};

export default LogoSlider;

export const Skelton = () => {
  return (
    <div className="w-40 h-24 bg-slate-300 border overflow-hidden rounded-xl border-primary/20  !flex !items-center !justify-center animate-pulse"></div>
  );
};
