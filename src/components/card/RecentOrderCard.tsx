/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FaX } from "react-icons/fa6";

interface IOrderData {
  id: number;
  imageUrl: string;
  productName: string;
  description: string[];
  price: string;
  delivery_date: string;
}
interface TextAreaProps {
  rows: number;
  cols: number;
  placeholder: string;
  className: any;
}
const TextArea: React.FC<TextAreaProps> = ({
  rows,
  cols,
  placeholder,
  className,
}) => {
  return (
    <textarea
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      className={className}
    ></textarea>
  );
};

const RecentOrderCard = ({
  item,
  index,
}: {
  item: IOrderData;
  index: number;
}) => {
  const [ratingOpen, setRatingOpen] = useState(false);
  const { push } = useRouter();
  return (
    <article
      className={`flex flex-col lg:flex-row justify-between gap-4 ${
        index === 0 ? "border-b pb-4 lg:pb-6" : ""
      }`}
    >
      <img
        src={item.imageUrl}
        alt=""
        className="w-full lg:w-[20%] h-40 object-contain"
      />
      <div className="lg:w-3/5 flex flex-col gap-2">
        <h4 className="font-medium ">{item.productName}</h4>
        <div>
          {item.description.map((data, i) => (
            <div className="flex " key={i}>
              <p className="text-sm ">{data}</p>
            </div>
          ))}
        </div>
        <p className="">Delivered on {item.delivery_date}</p>
      </div>
      <button
        type="button"
        className="py-2 px-3 w-fit h-fit rounded-md text-secondary text-sm font-medium bg-secondary/10 flex gap-2 hover:bg-secondary/5 common-transition"
        onClick={() => push(`my-account/orders/${item.id}`)}
      >
        <BiCurrentLocation size={16} />
        Track
      </button>
    </article>
  );
};

export default RecentOrderCard;
