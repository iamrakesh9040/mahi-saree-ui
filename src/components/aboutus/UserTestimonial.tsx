import { useSwr } from "@/hooks";
import { Fragment } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";
import Slider from "react-slick";

const UserTestimonial = ({
  title = (
    <h2 className="title text-center">
      Words from Our <span className=" text-gray-400">Happy Clients</span>
    </h2>
  ),
}: {
  title: JSX.Element;
}) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 940,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
        },
      },
    ],
  };
  const { data: testimonialData, isValidating, mutate } = useSwr(`rating`);
  return (
    <section
      id="client-testimonial"
      className="main-container py-10 flex flex-col items-center"
    >
      <div className="flex flex-col gap-1 items-center">
        {title}
        <p className="h-1 w-48 bg-primary rounded-full"></p>
      </div>
      <aside className="w-full lg:w-3/4 2xl:w-3/5 pt-8 lg:pt-16">
        <Slider {...settings} className="">
          {testimonialData?.map((item: any) => (
            <div
              className="!flex !items-center px-2 md:px-20 pt-20 pb-10"
              key={item?._id}
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </Slider>
      </aside>
    </section>
  );
};

const TestimonialCard = ({ item }: { item: any }) => {
  return (
    <article className="relative w-full flex flex-col items-center lg:flex-row bg-white shadow-[0px_2px_10px_3px_#edf2f7]">
      <div className="relative cursor-pointer rounded h-40 w-40 lg:w-48 lg:h-48 min-w-[10rem] lg:min-w-[12rem] flex flex-col items-start bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] -mt-16 lg:-mt-0 lg:-translate-y-16 lg:-translate-x-16">
        <span className=" w-full h-full flex items-center justify-center text-7xl text-white font-semibold">
          {item?.user?.name?.length > 1
            ? item?.user?.name.slice(0, 1) + ""
            : item?.user?.name}
        </span>
      </div>

      <div className="relative w-full pl-4 pr-4 md:pl-8 md:pr-8 py-8 lg:pl-0">
        <p className="text-sm lg:text-base description text-gray-600">
          {item.quote?.length > 235 ? item.msg.slice(0, 236) + "..." : item.msg}
        </p>
        <h4 className="text-sm lg:text-base capitalize font-semibold tracking-wide text-gray-800 pt-4 pb-1">
          {item?.user?.name}
        </h4>
        <h4 className="text-sm lg:text-base capitalize tracking-wide text-gray-800 pb-1">
          Happy Customer
        </h4>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              {5 >= index + 1 ? (
                <AiFillStar className="text-amber-400 text-sm" />
              ) : (
                <AiOutlineStar className="text-amber-400 text-sm" />
              )}
            </Fragment>
          ))}
        </div>
        <span className="absolute top-0 left-0 lg:-top-6 lg:-left-6">
          <RiDoubleQuotesL className="text-3xl md:text-5xl text-primary" />
        </span>
        <span className="absolute bottom-0 lg:-bottom-6 right-0">
          <RiDoubleQuotesL className="text-3xl md:text-5xl text-primary rotate-180" />
        </span>
      </div>
    </article>
  );
};

export default UserTestimonial;
