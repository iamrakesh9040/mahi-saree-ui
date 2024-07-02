import Slider from "react-slick";
import ProductCard from "../card/ProductCard";
import { SetStateAction, useRef, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const RecentProduct = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 250,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },

      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
    ],
    beforeChange: (current: any, next: SetStateAction<number>) => {
      setCurrentSlide(next);
    },
  };
  interface IProduct {
    id: string;
    image: string;
    name: string;
  }
  const PRODUCT_ARR: IProduct[] = [
    {
      id: "1",
      image: "/product/bp_light.jpg",
      name: "Digital BP Machine",
    },
    {
      id: "2",
      image: "/product/cautery_machine_light.jpg",
      name: "Cautery Machine",
    },
    {
      id: "3",
      image: "/product/cipap_light.jpg",
      name: "CPAP/BPAP Machine",
    },
    {
      id: "4",
      image: "/product/ecg_light.jpg",
      name: "ECG Machine",
    },
    {
      id: "5",
      image: "/product/lens_light.jpg",
      name: "Lens",
    },
    {
      id: "6",
      image: "/product/monitor_light.jpg",
      name: "Patient Monitor",
    },
    {
      id: "7",
      image: "/product/nebul_light.jpg",
      name: "Compressor Nebulizer",
    },
    {
      id: "8",
      image: "/product/op_scope_light.jpg",
      name: "Ophthalmoscope",
    },
    {
      id: "9",
      image: "/product/spiro_light.jpg",
      name: "Spirometer",
    },
    {
      id: "10",
      image: "/product/steth_light.jpg",
      name: "tethoscope",
    },
    {
      id: "11",
      image: "/product/suction_light.jpg",
      name: "Suction Machine",
    },
    {
      id: "12",
      image: "/product/syringe_light.jpg",
      name: "Infusion pump",
    },
  ];
  const navigationRef = useRef<any>(null);
  const handlePrev = () => {
    if (navigationRef.current && currentSlide > 0) {
      navigationRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (navigationRef.current && currentSlide < PRODUCT_ARR.length - 1) {
      navigationRef.current.slickNext();
    }
  };
  return (
    <section className="main-container top-spacing pb-4">
      <main className="flex flex-col gap-5 bg-white rounded-md shadow-[0px_0px_7px_2px_#00000024] p-4">
        <article className="relative flex justify-between ">
          <div className="flex flex-col gap-1">
            <div className="w-full">
              <h2 className=" text-gray-800 md:font-semibold text-lg font-medium md:text-2xl">
                Recent View Products
              </h2>
            </div>
            <p className="h-0.5 w-24 md:w-48 bg-secondary rounded-full"></p>
          </div>
          <div className="flex gap-4">
            <div
              onClick={handlePrev}
              className={`cursor-pointer w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full ${
                currentSlide === 0 ? "opacity-50" : ""
              }`}
            >
              <IoMdArrowRoundBack className="text-secondary text-xl" />
            </div>
            <div
              onClick={handleNext}
              className={`cursor-pointer w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full ${
                currentSlide === PRODUCT_ARR.length - 1 ? "opacity-50" : ""
              }`}
            >
              <IoMdArrowRoundForward className="text-secondary text-xl" />
            </div>
          </div>
        </article>
        <article className="w-full overflow-hidden feature-slick-slider">
          {/* <Slider {...settings} ref={navigationRef}>
            {PRODUCT_ARR.slice(0, 10).map((curEle: IProduct,i:number) => (
              <ProductCard item={curEle} key={curEle.id} i={i}/>
            ))}
          </Slider> */}
        </article>
      </main>
    </section>
  );
};

export default RecentProduct;
