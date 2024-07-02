import Link from "next/link";
import { BsHouseAdd } from "react-icons/bs";
import { MdOutlineAccountCircle, MdOutlineLockClock } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiCoupon4Line } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { JSX, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

import { HiOutlineHeart } from "react-icons/hi";
import { PiBellRingingBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useAuth, useMutation } from "@/hooks";
import { toast } from "react-toastify";
const AccountMenu = () => {
  const { mutation, isLoading } = useMutation();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("");
  const isMenuItemActive = (menuItem: {
    id?: string;
    title?: string;
    path: any;
    icon?: JSX.Element;
  }) => {
    return router.pathname === menuItem.path;
  };

  const handleMenuClick = (menuItemTitle: SetStateAction<string>) => {
    setActiveMenu(menuItemTitle);
  };
  const ACCOUNT_MENU_ARR = [
    {
      id: 1,
      name: "DASHBOARD",
      menu: [
        {
          id: "11",
          title: "My Orders",
          path: "/my-account/orders",
          icon: <HiOutlineShoppingBag />,
        },

        {
          id: "12",
          title: "Wishlist",
          path: "/wishlist",
          icon: <HiOutlineHeart />,
        },
        {
          id: "13",
          title: "My Coupons",
          path: "/my-account/coupons",
          icon: <RiCoupon4Line />,
        },
        {
          id: "14",
          title: "Notifications",
          path: "/my-account/notification",
          icon: <PiBellRingingBold />,
        },
      ],
    },
    {
      id: 2,
      name: "ACCOUNT SETTINGS",
      menu: [
        {
          id: "21",
          title: "My Profile",
          path: "/my-account",
          icon: <MdOutlineAccountCircle />,
        },
        {
          id: "22",
          title: "Manage Address",
          path: "/my-account/manage-address",
          icon: <BsHouseAdd />,
        },
        {
          id: "23",
          title: "Change Password",
          path: "/my-account/change-password",
          icon: <MdOutlineLockClock />,
        },
      ],
    },
  ];
  const handleLogout = async (id: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: "Yes, Logout!",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`user/update/${user._id}`, {
          method: "PUT",
          isAlert: true,
          body: {
            isOnline: false,
          },
        });
        if (res?.status === 200) {
          router.push("/");
          toast.success("Logout Successful");
          logout();
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };
  return (
    <aside className="w-full  bg-white flex flex-col gap-4">
      <div className="flex flex-col gap-8">
        {ACCOUNT_MENU_ARR.map((item, i) => (
          <div className="flex flex-col gap-3" key={i}>
            <h3 className="w-full text-gray-500 text-xs px-5">{item.name}</h3>
            <div className="flex flex-col gap-4">
              {item.menu.map((menuItem) => (
                <Link href={menuItem.path} key={menuItem.id}>
                  <div
                    className={`group flex relative items-center gap-3 px-5 rounded-md group hover:text-primary common-transition ${
                      isMenuItemActive(menuItem)
                        ? "text-primary"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleMenuClick(menuItem.title)}
                  >
                    <p
                      className={`absolute common-transition group-hover:visible left-0 top-0 bottom-0- h-full w-1 rounded-r-sm bg-primary ${
                        menuItem?.path === router?.asPath
                          ? "visible"
                          : "invisible"
                      }`}
                    ></p>
                    <span className="text-xl"> {menuItem.icon}</span>
                    {menuItem.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <p
          onClick={() => handleLogout(user._id)}
          className="group hover:text-secondary flex items-center gap-1 rounded-md py-2 px-4 hover:bg-secondary/5 font-medium cursor-pointer common-transition text-gray-500"
        >
          <span>
            <BiLogOutCircle className="text-2xl text-gray-500 mr-2 group-hover:text-secondary" />
          </span>
          <span>Logout</span>
        </p>
      </div>
    </aside>
  );
};

export default AccountMenu;
