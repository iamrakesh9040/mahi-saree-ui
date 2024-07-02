/* eslint-disable @next/next/no-img-element */
import { UserCouponsCard } from "@/components/card";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import AccountLayout from "@/layouts/my-account";
import dayjs from "dayjs";
import { RiCoupon4Fill } from "react-icons/ri";

const Coupons = () => {
  const { data: CouponData, mutate } = useSwr(`coupon`);
  const { data: userCoupon } = useSwr(`coupon/user-coupon`);

  return (
    <PublicLayout>
      <AccountLayout>
        <aside id="coupons" className="content-item z-10">
          <article className="flex flex-col gap-4">
            <h3 className="flex gap-3 items-center ">
              <span className="text-secondary/90">
                <RiCoupon4Fill size={24} />
              </span>
              <span className="sub-title">My Coupons</span>
            </h3>
            <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
              {CouponData?.map((cards: any) => (
                <UserCouponsCard item={cards} key={cards?.id} mutate={mutate} />
              ))}
            </div>
            <h3 className="flex flex-col gap-5 p-8">
              <div className="flex gap-3">
                <span className="text-secondary/90">
                  <RiCoupon4Fill size={24} />
                </span>
                <span className="sub-title">My Vouchers</span>
              </div>
              <div className="w-full grid grid-cols-1 items-center gap-2 relative">
                {userCoupon?.map((item: any, index: number) => (
                  <div key={index} className="flex w-72 justify-between ">
                    <div className="bg-red-700 h-[8rem] w-[40%] rounded-md flex flex-col items-center justify-center p-3 relative">
                      <p className="text-white">₹{item?.amount}</p>
                      <p className="text-xs font-medium text-gray-200 px-2 text-start">
                        {" "}
                        off {item?.category?.name} on above ₹{item?.minAmount}{" "}
                        ruppes.
                      </p>
                    </div>
                    <img
                      className="w-6 bottom-1 left-1 absolute"
                      src="/gift.png"
                      alt="gift"
                    />
                    <img
                      className="w-6 top-1 left-1 absolute"
                      src="/gift.png"
                      alt="gift"
                    />

                    <div className="bg-slate-100  h-4 w-4 rounded-full absolute -top-1 left-[6.7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-4 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-6 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-8 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-10 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-12 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute top-14 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute  top-16 left-[7rem]"></div>
                    <div className="bg-white h-[8rem] w-[60%] rounded-md flex flex-col gap-1 p-2">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="border border-red-700 bg-white overflow-hidden w-fit flex items-center rounded-md px-2 py-1 pl-2">
                          <p className="text-sm text-black">
                            {item?.couponCode}
                          </p>
                        </p>
                      </div>
                      <p className="text-sm flex flex-col">
                        Start Date:
                        <p>{dayjs(item?.startDate).format("MMMM DD, YYYY")}</p>
                      </p>
                      <p className="text-sm flex">
                        End Date:
                        <p>{dayjs(item?.endDate).format("MMMM DD, YYYY")}</p>
                      </p>
                    </div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute bottom-[3.3rem] left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute bottom-11 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute bottom-9 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute bottom-7 left-[7rem]"></div>
                    <div className="bg-slate-100  h-1 w-1 rounded-full absolute bottom-5 left-[7rem]"></div>
                    <div className="bg-slate-100  h-4 w-4 rounded-full absolute -bottom-1 left-[6.7rem]"></div>
                  </div>
                ))}
              </div>
            </h3>
          </article>
        </aside>
      </AccountLayout>
    </PublicLayout>
  );
};
export default Coupons;
