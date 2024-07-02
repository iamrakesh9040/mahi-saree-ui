import React, { Dispatch, SetStateAction } from "react";

const Discount = ({
  discount,
  setDiscount,
  setPageNo,
}: {
  discount: string;
  setDiscount: Dispatch<SetStateAction<string>>;
  setPageNo: Dispatch<SetStateAction<number>>;
}) => {
  const DISCOUNT_ARR = [
    {
      id: "1",
      discount: "50",
    },

    {
      id: "2",
      discount: "30",
    },
    {
      id: "3",
      discount: "20",
    },
    {
      id: "4",
      discount: "10",
    },
    {
      id: "5",
      discount: "5",
    },
  ];
  return (
    <form action="#" className="flex flex-col gap-2 justify-center px-5">
      {DISCOUNT_ARR.map((item) => {
        return (
          <div key={item?.id} className=" flex gap-3">
            <input
              type="checkbox"
              name=""
              id={item?.discount}
              className=" w-4 h-4"
              checked={discount === item?.discount}
              onChange={(e) => {
                setDiscount(item?.discount);
                setPageNo(1);
              }}
            />
            <label
              htmlFor={item?.discount}
              className="flex items-center gap-1 cursor-pointer text-sm"
            >
              {item?.discount} % or more
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default Discount;
