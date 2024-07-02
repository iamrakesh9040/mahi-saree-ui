const CategoryBanner = ({
  route,
  bannerImage,
  title,
}: {
  route: JSX.Element;
  bannerImage: string;
  title: string;
}) => {
  return (
    <section
      className="text-white h-56 py-4 bg-cover bg-center bg-no-repeat md:py-6 overflow-hidden"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="main-container flex flex-col h-full gap-20">
        {route}
        <div
          className="font-semibold capitalize flex justify-center w-full text-white lg:text-5xl text-lg md:text-2xl "
          // style={{ clipPath: "polygon(0 10%, 100% 10%, 80% 100%, 0% 100%)" }}
        >
          {title}
        </div>
        {/* <div className="flex items-center">
          <div className="font-semibold capitalize bg-white flex items-center px-8 h-10 lg:h-14 w-fit text-black lg:text-4xl text-lg md:text-2xl">
            {subCategory}
          </div>
          <div className="bg-white h-10 lg:h-14 w-8 -translate-x-1 lg:w-20 relative">
            <div className="absolute bg-primary w-14 lg:w-28 h-12 lg:h-20 top-1 -right-6 -rotate-[60deg]"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CategoryBanner;
