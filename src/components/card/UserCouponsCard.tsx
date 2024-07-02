/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";

const UserCouponCard = ({
  item,
  mutate,
}: {
  item: any;
  mutate: () => void;
}) => {
  return (
    <>
      <div className="w-full p-8">
        <div className="border-2 border-black w-full h-[15rem] overflow-hidden bg-white">
          <div className="flex justify-between relative ">
            <img
              className="max-w-[18rem] h-[18rem] absolute -right-0 object-cover md:flex hidden"
              src={item?.imageUrl}
              alt=""
            />
            <div className="flex flex-col pl-4 pt-4 gap-[0.14rem]">
              <div className="flex items-center gap-3">
                <p className="font-light">Name :</p>
                <p className="text-blue-400">{item?.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-light">USE :</p>
                <div className="flex items-center border border-red-400 bg-red-200 text-white  w-fit px-2 rounded-md py-1">
                  <p className="text-base">{item?.couponCode}</p>
                </div>
              </div>
              <p className="font-light text-sm">On Minimum Shopping</p>
              <p className="text-green-600">₹{item?.minAmount}</p>
              <p className="font-light text-sm">Discount amount</p>
              <p className="text-red-400">₹{item?.amount}</p>
              <p className="text-xl font-light">{item?.title}</p>
              <p className="font-light text-sm">
                Start Date: {dayjs(item?.startDate).format("MMMM DD, YYYY")}
              </p>
              <p className="font-light text-sm">
                End Date: {dayjs(item?.endDate).format("MMMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCouponCard;
