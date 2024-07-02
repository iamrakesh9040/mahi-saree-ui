/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MdOutlinePanToolAlt } from "react-icons/md";

const AboutHero = () => {
  const SERVICE_DATA = [
    "100% customer satisfaction",
    "Zero compromise on the products",
    "Customize for you loved ones",
    "original products",
    "Affordable price",
  ];
  return (
    <section className="main-container py-10 bottom-spacing flex lg:flex-row flex-col items-center lg:gap-10 gap-14">
      <aside className="w-full md:h-full h-[25rem] flex items-center justify-center relative">
        <img
          src="/about/1.jpg"
          className="relative z-[5] md:w-[70%] w-[85%] rounded-tl-[80px] rounded-md "
        />
        <img
          src="/about/2.jpg"
          className="z-10 w-52 h-fit hidden md:block rounded-lg absolute bottom-16 right-0 border-[0.8rem] rounded-tr-[70px] border-white"
        />
        <div className="absolute bottom-0 z-[6] bg-primary items-start text-white md:p-7 p-4 md:w-[80%] w-[95%] rounded-bl-[40px] flex flex-row">
          <div className="pr-4 border-r-2 flex flex-col items-center border-r-white">
            <span className="md:text-6xl  text-4xl font-semibold">1 +</span>
            <span className="md:text-2xl text-xl font-medium">Years</span>
          </div>
          <p className="capitalize md:text-xl text-md font-normal pl-4 md:w-[50%]">
            of experience in this customization industry.
          </p>
        </div>
        <img
          src="/home/aboutAnimate2.png"
          className="absolute left-0 bottom-40 z-[3] w-32 floating-y-animation "
        />
      </aside>
      <aside className="w-full">
        <div className="space-y-5">
          <h3 className="py-1.5 px-4 inline-block text-sm font-medium bg-primary/10 text-primary uppercase rounded-full">
            Get to know us
          </h3>

          <h2 className="title">
            What we do,
            <span className=" text-gray-400"> we do it better</span>
          </h2>

          {/* <h1 className="title">What we do, we do it better</h1> */}
          <p className="text-gray-500 text-base">
            At Shree Odisha Handloom, {`we're`} in the business of turning your
            imagination into reality. We specialize in creating personalized
            products that add a unique touch to your life.
          </p>
          <div className="w-full grid grid-cols-1 gap-3">
            {SERVICE_DATA?.map((item, i) => (
              <div className="flex flex-row items-center gap-4" key={i}>
                <p className="bg-gray-500/10 flex p-2 rounded-full items-center justify-center">
                  <MdOutlinePanToolAlt className="text-xl text-gray-500 rotate-90" />
                </p>
                <p className="text-lg text-blue-950 font-medium">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-base">
            Whether {`it's`} a custom-designed t-shirt that showcases your
            individuality, a keychain that holds sentimental value, or a
            one-of-a-kind mug that makes your morning coffee even more special,
            {`we've`} got you covered.
          </p>
        </div>
      </aside>
    </section>
  );
};

export default AboutHero;
