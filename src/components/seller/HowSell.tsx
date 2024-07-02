const STEPS_DATA = [
  {
    _id: "1",
    number: "01",
    title: "Register Yourself",
    description:
      "Begin your journey by applying—individuals and businesses welcome.",
  },
  {
    _id: "2",
    number: "02",
    title: "Submit Documents",
    description:
      "Upload required documents for a secure and trustworthy marketplace.",
  },
  {
    _id: "3",
    number: "03",
    title: "Upload Products",
    description:
      "Showcase globally—easily upload images and details for appealing listings.",
  },
  {
    _id: "4",
    number: "04",
    title: "Start Selling",
    description:
      "Congratulations! Your products are live. Monitor sales and thrive online. Welcome aboard!",
  },
];

const HowSell = () => {
  return (
    <section className="main-container top-spacing flex flex-col gap-10 w-full">
      <div className="w-full h-fit relative flex flex-col gap-10 ">
        <p className="w-full text-start flex flex-col gap-1 ">
          <span className="sub-title">How to register with YardHealth?</span>
          <span className=" w-32 h-0.5 bg-primary rounded-full"></span>
        </p>
      </div>
      <aside className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {STEPS_DATA.map((item: any, index: number) => (
          <article
            className="group relative flex flex-col items-center gap-4 text-center cursor-default"
            key={item._id}
          >
            <p className="stroke-text relative overflow-hidden z-[1] w-24 h-24 border border-primary/50 common-transition rounded-full grid place-items-center transition-all duration-[0.4s] ease-in-out font-bold text-5xl text-primary/50 group-hover:text-gray-100 before:content-[''] before:absolute before:-z-[1] before:rounded-full before:w-0 before:h-0 group-hover:before:w-full group-hover:before:h-full before:bg-primary before:transition-all before:duration-[0.4s] before:ease-in-out">
              {item.number}
            </p>
            <h6 className="text-lg tracking-wide text-gray-800 font-semibold">
              {item.title}
            </h6>
            <p className="description">{item.description}</p>
            {STEPS_DATA.length - 1 === index ? null : (
              <img
                src={
                  index % 2 === 0 ? "/asset/arrow-1.png" : "/asset/arrow-2.png"
                }
                alt="arrow"
                className="hidden lg:block absolute left-[90%] top-[20%]"
              />
            )}
          </article>
        ))}
      </aside>
    </section>
  );
};

export default HowSell;
