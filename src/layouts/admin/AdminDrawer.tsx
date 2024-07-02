import { useAdminMenuItem, useAuth, useMutation } from "@/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminDrawer = () => {
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const router = useRouter();
  const MenuItems = useAdminMenuItem();
  const { mutation } = useMutation();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Load selected submenu from localStorage when component mounts
    const storedSubMenu = localStorage.getItem("selectedSubMenu");
    if (storedSubMenu) {
      setSelectedSubMenu(storedSubMenu);
    }
  }, []);

  const handleMenuItemClick = (menuItem: any) => {
    if (menuItem?.route) {
      router.push(menuItem.route);
    } else {
      if (selectedSubMenu === menuItem._id) {
        setSelectedSubMenu("");
        // Remove selected submenu from localStorage
        localStorage.removeItem("selectedSubMenu");
      } else {
        setSelectedSubMenu(menuItem._id);
        // Store selected submenu in localStorage
        localStorage.setItem("selectedSubMenu", menuItem._id);
      }
    }
  };
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
    <>
      <Link href={`/admin`} className=" w-full flex justify-center p-3">
        <img src="/logo.png" className=" w-full h-fit object-fill" alt="" />
      </Link>
      <div className="flex flex-col w-full h-full overflow-y-auto px-2 pb-2 gap-1">
        {MenuItems?.map((menuItem) => (
          <Fragment key={menuItem?._id}>
            {/* Main menu items */}
            <div
              className={`w-full group rounded-md flex items-center justify-between px-4 py-3 text-gray-300 hover:text-primary hover:bg-primary/10 transition-all duration-150 ease-in-out cursor-pointer border-l-4 ${
                router.asPath === menuItem.route ||
                selectedSubMenu === menuItem._id
                  ? "bg-primary/10 text-primary border-primary/75"
                  : "border-transparent"
              }`}
              onClick={() => handleMenuItemClick(menuItem)}
              style={{
                transition:
                  "background-color 0.3s ease, border-color 0.3s ease",
              }}
            >
              <div className="flex items-center gap-2">
                <span>{menuItem?.icon}</span>
                <p className=" tracking-wider whitespace-nowrap">
                  {menuItem?.title}
                </p>
              </div>
              {menuItem?.submenus ? (
                // Show expand/collapse icon based on submenu visibility
                selectedSubMenu === menuItem?._id ? (
                  <span>
                    <MdExpandLess className="text-xl common-transition" />
                  </span>
                ) : (
                  <span>
                    <MdExpandMore className="text-xl common-transition" />
                  </span>
                )
              ) : null}
            </div>

            {/* Submenus section */}
            {menuItem?.submenus && selectedSubMenu === menuItem?._id ? (
              <div
                className="pl-4 py-1 flex flex-col gap-1"
                style={{ transition: "max-height 0.3s ease" }}
              >
                {menuItem?.submenus.map((submenuItem) => (
                  <div
                    key={submenuItem?._id}
                    className={`w-full flex items-center px-4 py-3 rounded-md text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-150 ease-in-out cursor-pointer ${
                      router.asPath === submenuItem.route
                        ? "bg-primary/10 text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      // Navigate to the submenu item route if available
                      if (submenuItem?.route)
                        return router?.push(submenuItem?.route);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{submenuItem?.icon}</span>
                      <p className="whitespace-nowrap">{submenuItem?.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Fragment>
        ))}

        {/* Logout section */}
        <div
          className={`w-full group flex rounded-md items-center justify-between text-gray-300 hover:text-red-400 px-5 py-3 hover:bg-primary/10 common-transition cursor-pointer`}
        >
          <div
            onClick={() => handleLogout()}
            className="flex items-center gap-2"
          >
            <span className="group-hover:text-red-400">
              <BiLogOutCircle className="text-xl" />
            </span>
            <p className="font-medium whitespace-nowrap">Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDrawer;
