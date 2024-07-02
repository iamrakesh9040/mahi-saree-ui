const Brands = () => {
  const Brand_ARR = [
    {
      id: "1",
      brand: " HONKON",
    },

    {
      id: "2",
      brand: " RMS INDIA",
    },
    {
      id: "3",
      brand: " VM MEDITECH",
    },
    {
      id: "4",
      brand: " ALERIO",
    },
    {
      id: "5",
      brand: " AKARUI",
    },
  ];
  return (
    <form action="#" className="flex flex-col gap-2 justify-center px-5">
      {Brand_ARR.map((item) => {
        return (
          <div key={item.id} className=" flex gap-3">
            <input
              type="checkbox"
              name=""
              id={item.brand}
              className=" w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor={item.brand}
              className="flex items-center gap-1 cursor-pointer text-sm"
            >
              {item.brand}
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default Brands;
