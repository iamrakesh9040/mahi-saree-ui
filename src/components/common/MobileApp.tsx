import Link from "next/link";
import { BsCheck } from "react-icons/bs";
import Slider from "react-slick";

const MobileApp = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };
  return (
    <section className="main-container top-spacing w-full">
      <aside className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 bg-center bg-cover bg-no-repeat bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 rounded-3xl p-6 md:p-12 lg:p-8">
        <div className="w-full">
          <div className="w-full overflow-hidden z-0 relative">
            <Slider {...settings}>
              {[
                "/slider/1.png",
                "/slider/2.png",
                "/slider/3.png",
                "/slider/4.png",
                "/slider/5.png",
              ].map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt="mob-application"
                  className="h-80 md:h-96 lg:h-[34rem] object-contain cursor-grab"
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-6 lg:items-start lg:gap-8">
          <h2 className="text-gray-800 capitalize text-2xl md:text-2xl lg:text-4xl 2xl:text-5xl 2xl:leading-[4rem] font-bold tracking-wide text-center lg:text-left">
            {`It's all our Happy Customers !`}
            <br className="hidden lg:block" />
            <span className="gradient-text title"></span>
          </h2>
          <ul className="w-full grid grid-cols-2 md:gap-4 gap-2">
            {[
              "Traditional Ethnics",
              "Exclusive Collections",
              "Cultural Heritage",
              "Wide Product Range",
              "Handcrafted With Love",
              "Find Something Special",
              "Nationwide Delivery",
              "Fast & Secure Shipping",
              "Safe & Certified Products",
              "Customer Support * (24/7)"
            ].map((item, i) => (
              <li
                className="flex md:items-center items-start gap-2 text-gray-800 tracking-wide font-medium"
                key={i}
              >
                <BsCheck className="text-primary min-w-[1rem]" fontSize={20} />
                <span className="text-xs md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <div className="w-full flex  items-center justify-center  lg:justify-start gap-2 md:gap-4">
            <Link href="/" className="flex items-center justify-center md:gap-5 gap-2 md:font-bold font-semibold tracking-wide md:text-lg text-sm text-gray-800 capitalize bg-white rounded-xl px-4 py-3.5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <img
                src="/viewmore.png"
                alt="app-store"
                className="md:w-7 w-4 md:h-7 h-4"
              />
              View More
            </Link>
            <Link href="/products" className="flex items-center justify-center md:gap-5 gap-2 md:font-bold font-semibold tracking-wide md:text-lg text-sm text-gray-800 capitalize bg-white rounded-lg px-4 py-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <img
                src="/ordernow.png"
                alt="app-store"
                className="md:w-8 md:h-8  w-5 h-5"
              />
              Order Now
            </Link>
          </div>
          
        </div>
      </aside>
    </section>
  );
};

export default MobileApp;
