/* eslint-disable @next/next/no-img-element */
import EditProfileDrawer from "@/components/drawer/EditProfileDrawer";
import { useAuth, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

const Profile = () => {
  const [editProfileDrawer, setEditProfileDrawer] = useState(false);
  const { user } = useAuth();

  const { data: OrderData } = useSwr(`order`);
  const { data: TodayData } = useSwr(`order/today-order`);

  return (
    <AdminLayout title="Contact Us| Shree Odisha Handloom">
      <div className="p-8">
        <EditProfileDrawer
          open={editProfileDrawer}
          onClose={() => setEditProfileDrawer(false)}
        />
        <div className="h-full flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row gap-4 xl:justify-between xl:items-center">
            <h3 className="flex gap-3 items-center ">
              <span className="text-secondary/90">
                <BsFillPersonFill size={28} />
              </span>
              <span className="sub-title">Admin Profile</span>
            </h3>
            <button
              onClick={() => setEditProfileDrawer(true)}
              type="button"
              className="py-2 px-4 w-fit bg-secondary/10 rounded text-secondary text-sm font-medium hover:bg-secondary/30"
            >
              Edit Profile
            </button>
          </div>

          <aside className="grid grid-cols-5 gap-4 w-full">
            <div className="col-span-6 lg:col-span-2 flex items-center justify-center gap-3 p-2 w-full h-full bg-white  rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <img
                src={user?.image || "/user.png"}
                alt="profilepic"
                className="w-20 h-16  rounded-full bg-slate-200  text-white text-4xl cursor-pointer"
              />

              <div className="w-full">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-1 text-center p-6 w-full h-full bg-white  rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <div className="flex flex-col items-center gap-1 w-full ">
                <p className="text-2xl text-primary font-semibold">
                  {OrderData?.length}
                </p>
                <p className="text-sm text-gray-700">
                  All
                  <br />
                  Orders
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-1 text-center  p-6 w-full h-full bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <div className="flex flex-col items-center gap-1 w-full">
                <p className="text-2xl text-primary font-semibold">02</p>
                <p className="text-sm text-gray-700">
                  All <br /> Products
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-1 text-center  p-6 w-full h-full bg-white rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <div className="flex flex-col items-center gap-1 w-full">
                <p className="text-2xl text-primary font-semibold">
                  {TodayData?.length}
                </p>
                <p className="text-sm text-gray-700">
                  Today <br /> Order
                </p>
              </div>
            </div>
          </aside>
          <div className="w-full h-full bg-white rounded-lg hidden md:grid  p-5">
            <div className="md:flex justify-between hidden">
              <span className="text-sm text-gray-600 font-light">Name</span>
              <span className="text-sm text-gray-600 font-light">Email</span>
              <span className="text-sm text-gray-600 font-light">Phone</span>
              <span className="text-sm text-gray-600 font-light ">Gender</span>
            </div>
            <div className="md:flex justify-between items-start hidden">
              <span>{user?.name}</span>
              <span>{user?.email}</span>
              <span>{user?.phone}</span>
              <span className="capitalize">
                {" "}
                {user?.gender || "Not mention"}
              </span>
            </div>
          </div>
          <div className="md:hidden grid">
            <div className="grid grid-cols-2 gap-4 mb-2 bottom-spacing">
              <p className="text-sm text-gray-600 font-semibold flex flex-col items-center gap-3 bg-white p-2 shadow-md rounded-md">
                Name:
                <p className=" text-primary">{user?.name}</p>
              </p>
              <p className="text-sm text-gray-600 font-semibold flex flex-col items-center gap-3 bg-white p-2 shadow-md rounded-md">
                Email:
                <p className=" text-primary">{user?.email?.slice(0, 15)}</p>
              </p>
              <p className="text-sm text-gray-600 font-semibold flex flex-col items-center gap-3 bg-white p-2 shadow-md rounded-md">
                Phone:
                <p className=" text-primary">{user?.phone}</p>
              </p>
              <p className="text-sm text-gray-600 font-semibold flex flex-col items-center gap-3 bg-white p-2 shadow-md rounded-md ">
                Gender:
                <p className="capitalize text-primary">
                  {user?.gender || "Not mention"}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
