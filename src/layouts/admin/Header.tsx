import { useAdminMenuItem, useAuth, useMutation, useSwr } from "@/hooks";
import { PhoneAndroidSharp } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineFullscreen, AiOutlineUser } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser, FaXmark } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineAttachEmail,
} from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
interface AdminProps {
  setAdminMenuOpen: any;
  adminMenuOpen: any;
}
const Header = ({ adminMenuOpen, setAdminMenuOpen }: AdminProps) => {
  const { data: notifications } = useSwr(`notification/admin`);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const MenuItems = useAdminMenuItem();
  const { mutation, isLoading } = useMutation();
  const { logout, user } = useAuth();

  const { pathname } = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Enter full screen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Exit full screen mode
      if (document?.exitFullscreen) {
        document?.exitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications.filter(
        (notification: any) => !notification.isRead
      );
      setUnreadCount(unreadNotifications.length);
    }
  }, [notifications]);

  useEffect(() => {
    const handleFullScreen = (event: KeyboardEvent) => {
      if (event?.ctrlKey && event?.shiftKey && event.key === "K") {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      } else if (event?.key === "Escape") {
        if (document?.exitFullscreen) {
          document?.exitFullscreen();
        }
      }
    };

    document.addEventListener("keydown", handleFullScreen);
    return () => {
      document.removeEventListener("keydown", handleFullScreen);
    };
  }, []);

  const handleLogout = async () => {
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
    <div className=" w-full h-20 shadow-[0px_0px_5px_1px_#00000024] flex justify-between items-center px-6">
      <div className=" flex items-center gap-3">
        <p
          onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          className=" p-1 bg-teal-50 border border-green-200 rounded-md block lg:hidden"
        >
          {adminMenuOpen ? (
            <FaXmark className=" text-3xl text-green-500 cursor-pointer" />
          ) : (
            <CgMenuLeftAlt className=" text-3xl text-green-500 cursor-pointer" />
          )}
        </p>
        <Link
          href="/"
          className=" md:flex hidden py-2 px-3 bg-gray-100 rounded-md  items-center gap-2"
        >
          <BiWorld className=" text-xl" />
          <span className=" font-medium text-gray-600">Browse Website</span>
        </Link>
        <div className="flex items-center font-semibold text-[1.1rem] tracking-wide uppercase text-gray-900">
          {MenuItems.find((item) => item.route === pathname)?.title}
          {
            MenuItems?.find((item) =>
              item?.submenus?.find((submenus) => submenus.route === pathname)
            )?.title
          }
          {MenuItems.find((item) =>
            item?.submenus?.find((submenus) => submenus.route === pathname)
          )?.title ? (
            <span className="px-2 flex items-center">
              <MdKeyboardDoubleArrowRight className="!text-xl" />
            </span>
          ) : (
            <span> </span>
          )}

          {
            MenuItems?.find((item) =>
              item?.submenus?.find((submenus) => submenus.route === pathname)
            )?.submenus?.find((submenus) => submenus.route === pathname)?.title
          }
        </div>
      </div>

      <div className=" flex items-center gap-5 px-3">
        <p
          onClick={toggleFullScreen}
          className=" cursor-pointer md:block hidden "
        >
          <AiOutlineFullscreen className="text-2xl  text-primary " />
        </p>
        <Link href="/admin/notifications">
          <p className="relative cursor-pointer">
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-400 text-white font-medium flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
            <IoNotifications className="text-2xl" />
          </p>
        </Link>
        <div className=" p-2 rounded-full bg-gray-200 cursor-pointer   duration-300 relative group">
          <AiOutlineUser className="hover:text-green-400 text-2xl duration-300" />
          <div className=" absolute top-full right-0 h-[20rem] lg:w-[23rem] w-[19.6rem] scale-0 origin-top-right  bg-white py-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 group-hover:scale-100 transition-all duration-200 ease-in-out flex flex-col gap-2">
            <div className="w-full h-full flex flex-col justify-between py-5 px-6">
              <p className="dark-text font-medium text-lg">ADMIN Profile</p>
              <div className="flex items-center gap-2">
                <img
                  src={user?.image || "/userDefaultImage.png"}
                  alt=""
                  className="cursor-pointer w-20 h-20 object-fill rounded-full"
                />
                <div className=" flex flex-col gap-1">
                  <p className="dark-text text-sm font-medium">{user?.name}</p>
                  <p className="dark-text text-xs font-medium flex items-center gap-1">
                    <FaPhoneAlt className="text-primary" />
                    <span className="dark-text text-sm font-medium">
                      {user?.phone}
                    </span>
                  </p>
                  <p className="dark-text flex items-center gap-1">
                    <MdOutlineAttachEmail className="text-primary" />
                    <span className="dark-text text-sm font-medium">
                      {user?.email}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full border-t pt-4">
                <div className="flex items-center gap-4 h-14 w-full">
                  <div className="h-full w-14 bg-slate-50 rounded-lg flex items-center justify-center">
                    <FaUser className="text-2xl text-primary" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="font-medium">My Profile</p>
                    <Link href="/admin/settings/profile">
                      <p className="dark-text  text-sm ">Account Setting</p>
                    </Link>
                  </div>
                </div>
                {/* <div className="flex items-center gap-4 h-14 w-full">
                  <div className="h-full w-14 bg-slate-50 rounded-lg flex items-center justify-center">
                    <RiInboxFill className="text-2xl text-primary" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="  font-medium">My Inbox</p>
                    <p className="dark-text  text-sm ">Message & Emails</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 h-14 w-full">
                  <div className="h-full w-14 `bg-slate-50 rounded-lg flex items-center justify-center">
                    <FaTasks className="text-2xl text-primary" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="  font-medium">My Task</p>
                    <p className="dark-text  text-sm ">To-do and Daily Tasks</p>
                  </div>
                </div> */}
              </div>
              <div
                onClick={() => handleLogout()}
                className="w-full border font-medium py-2 cursor-pointer hover:bg-primary hover:text-white duration-200 border-primary text-primary capitalize rounded-lg flex items-center justify-center"
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
