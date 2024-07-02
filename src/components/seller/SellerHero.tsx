import Link from "next/link";

const SellerHero = () => {
  return (
    <section className=" w-full lg:h-[50vh] flex md:flex-row flex-col  md:gap-12 lg:gap-32 md:justify-center items-center  overflow-hidden  bg-primary/10">
      <div className="flex flex-col gap-6  justify-center p-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-normal">Become a</h4>
          <h2 className="text-5xl lg:text-7xl font-black text-primary">
            Seller Partner
          </h2>
          <p className="text-lg font-semibold">
            EXPAND YOUR BUSINESS TODAY WITH YardHealth!
          </p>
          <p className="text-sm font-normal max-w-lg">
            With YardHealth by your side, reaching Business & finding Buyers for
            your products can become so much easier!
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="#registration">
            <button className="btn-primary px-4 py-2 rounded-lg text-white  cursor-pointer w-fit ">
              Register Now
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="/seller/SellerBanner.png"
          alt=""
          className="w-76 h-76 md:w-60 md:h-60 lg:w-96 lg:h-96"
        />
      </div>
    </section>
  );
};

export default SellerHero;
