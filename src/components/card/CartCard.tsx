import { Counter } from "@/core";
import { MdDelete } from "react-icons/md";

interface ICartData {
  id: number;
  imageUrl: string;
  productName: string;
  description: string[];
  price: number;
}

const CartCard = ({
  item,
  index,
  isBorder,
}: {
  item: ICartData;
  index: number;
  isBorder: boolean;
}) => {
  return (
    <article
      className={` w-full flex flex-col lg:flex-row gap-4 lg:gap-6 py-4  ${
        isBorder ? "border-b" : ""
      }`}
    >
      <div className="w-full flex flex-col gap-4 items-center lg:w-1/4">
        <img
          src={item.imageUrl}
          alt=""
          className="w-full h-40 object-contain"
        />
        <Counter />
      </div>
      <aside className="relative w-full lg:w-3/4">
        <div className="flex flex-col gap-2.5 justify-center ">
          <h4 className="text-lg font-medium">{item.productName}</h4>
          {item.description.map((data, i) => (
            <div className="space-y-1.5" key={i}>
              <p>{data}</p>
            </div>
          ))}
          <p className="text-xl font-semibold">₹{item.price}</p>
        </div>
        <div className="absolute lg:-top-2 -top-60 right-2 flex flex-col-reverse lg:flex-col justify-between lg:items-center gap-2 lg:gap-0">
          <button className="w-fit border border-red-500 rounded-md flex gap-2 justify-around items-center px-3 py-1.5 text-red-500 bg-red-500/5 hover:bg-red-500/10 common-transition">
            <MdDelete size={18} className="" />
            <p className=" font-medium hidden xl:block">Remove Item</p>
          </button>
        </div>
      </aside>
    </article>
  );
};

export default CartCard;
