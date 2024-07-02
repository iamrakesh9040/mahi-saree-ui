import AddressCard from "@/components/card/AddressCard";
import { AddAddressForm } from "@/components/forms";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import AccountLayout from "@/layouts/my-account";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdExpandMore, MdLocationOn } from "react-icons/md";

const ManageAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, isValidating, mutate } = useSwr(`address`);
  return (
    <PublicLayout title="MyAccount | Shree Odisha Handloom">
      <AccountLayout>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          // viewport={{once: true}}
          className="p-5"
        >
          <div className="flex flex-col gap-5 py-4">
            <div
              className={`w-full  text-gray-800 bg-white ${
                showForm ? `` : `border p-4 rounded-lg`
              }`}
            >
              <p
                onClick={() => setShowForm(!showForm)}
                className={`w-full capitalize font-semibold racking-wide ${
                  showForm ? `hidden` : `flex cursor-pointer`
                }  items-center justify-between`}
              >
                Add New Address
                <MdExpandMore
                  className={`text-2xl text-gray-800 common-transition ${
                    showForm ? "" : " -rotate-90"
                  }`}
                />
              </p>
              <div
                className={`animate-collapse grid common-transition ease-in-out ${
                  showForm ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr] "
                }`}
              >
                <div className="overflow-hidden description text-sm md:text-base">
                  <AddAddressForm
                    mutate={mutate}
                    setOpen={() => setShowForm(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-xl text-gray-700">
              Saved Addresses :
            </p>
            {isValidating ? (
              <div>
                <div className="relative flex flex-col gap-3 w-full px-4 font-semibold ring-1 outline-none p-2 rounded-md ring-gray-300 bg-gray-50">
                  <div className="flex justify-between items-center ">
                    <div className=" flex items-center gap-5">
                      <p className="bg-gray-200 h-5 w-20 animate-pulse py-1 px-2 text-xs rounded-md text-white font-sub font-semibold uppercase"></p>

                      <p className="bg-gray-200 h-5 w-20 animate-pulse py-1 px-2 text-xs rounded-md text-gray-500 font-sub font-semibold uppercase"></p>
                    </div>

                    <div className=" flex flex-col gap-1">
                      <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                      <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                      <p className=" p-0.5 rounded-full bg-gray-200 animate-pulse"></p>
                    </div>
                  </div>
                  <span className="flex gap-4 ">
                    <p className="font-semibold font-props w-40 h-8 bg-gray-200 animate-pulse rounded-md"></p>
                    <p className="font-sub font-normal w-40 h-8 bg-gray-200 animate-pulse rounded-md"></p>
                  </span>
                  <span className="flex gap-4 ">
                    <p className="font-semibold font-props w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
                    <p className="font-sub font-normal w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
                    <p className="font-sub font-normal w-40 h-5 bg-gray-200 animate-pulse rounded-md"></p>
                  </span>
                </div>
              </div>
            ) : data?.length === 0 ? (
              <p className="text-gray-500 text-center">No Address Saved</p>
            ) : (
              data?.map((item: any, i: number) => (
                <AddressCard mutate={mutate} item={item} key={i} />
              ))
            )}
          </div>
        </motion.div>
      </AccountLayout>
    </PublicLayout>
  );
};

export default ManageAddress;
