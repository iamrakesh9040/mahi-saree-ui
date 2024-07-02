const Sell_Arr = [
  {
    id: "1",
    imgUrl: "/seller/grow.png",
    title: "Grow Pan India",
    titleStyle: "text-[#EF3B58]",
    description:
      "Reach a wide database of Hospitals, Retail Pharmacies, and Laboratories nationwide and establish a prime connection with them.",
  },
  {
    id: "2",
    imgUrl: "/seller/prod-pro.png",
    title: "Product Promotions",
    titleStyle: "text-[#50BE9A]",
    description:
      "FREE Online Marketing through Social Media Handles to ensure that your product is reaching the target customer.",
  },
  {
    id: "3",
    imgUrl: "/seller/transp-sales.png",
    title: "Transparency in Sales",
    titleStyle: "text-[#4885C5]",
    description:
      "Authentic Buyers for your products and Availability of GST Invoices for every Sale you make.",
  },
  {
    id: "4",
    imgUrl: "/seller/insta-pay.png",
    title: "Insta Payments",
    titleStyle: "text-[#6F54A3]",
    description:
      "Now no more long payment schedules! Name your desired price and receive quick and reliable payments on every product delivery.",
  },
];

const WhySell = () => {
  return (
    <section className="w-full main-container top-spacing flex flex-col gap-8">
      <div className="w-full h-fit relative flex flex-col gap-10 ">
        <p className="w-full text-start flex flex-col gap-1 ">
          <span className=" text-gray-700 text-2xl font-bold">
            Why Sell on YardHealth
          </span>
          <span className=" w-32 h-0.5 bg-primary rounded-full"></span>
        </p>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-16"
        style={{
          backgroundImage: `url('/seller/sell-bg.png')`,
        }}
      >
        {Sell_Arr.map((item) => (
          <div className="flex flex-col gap-4 items-center" key={item.id}>
            <img src={item.imgUrl} alt="" className="col-span-1 w-[12rem]" />
            <h3 className={`text-xl font-semibold ${item.titleStyle}`}>
              {item.title}
            </h3>
            <p className="text-base font-normal text-center text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySell;
