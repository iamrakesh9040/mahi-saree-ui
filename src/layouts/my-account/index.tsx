import { SideDrawer } from "@/components/common";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import AccountMenu from "./AccountMenu";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaHome, FaSignInAlt, FaUserTie } from "react-icons/fa";
import { AccessProtected } from "@/hooks";
import { MdContacts } from "react-icons/md";
import { PiUserFill, PiUserSwitchFill } from "react-icons/pi";
import { TbSitemap } from "react-icons/tb";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="bg-gray-100 py-8">
      <section className="main-container">
        <div className=" w-full flex flex-col xl:flex-row items-start gap-6">
          <div className="xl:sticky xl:top-[166px]  w-full xl:w-1/4 xl:flex flex-col gap-4 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md p-4 md:p-6 hidden">
            <AccountMenu />
          </div>
          <aside className="relative w-full xl:w-3/4 rounded-md">
            {children}

            <span className="absolute -top-1 right-1 xl:hidden">
              <p
                onClick={() => setOpen(true)}
                className=" w-8 h-8 rounded-lg bg-secondary/80 cursor-pointer p-1 flex items-center justify-center "
              >
                <HiMenuAlt1 className="text-white/90 text-2xl" />
              </p>
              <SideDrawer
                open={open}
                onClose={() => setOpen(false)}
                anchor={"left"}
                drawerStyle="w-4/5 md:w-4/6 bg-primary"
              >
                <div className="p-8 w-full bg-white h-screen ">
                  <AccountMenu />
                </div>
                {/* <div className=" w-full h-full flex flex-col">
                  <div className=" w-full h-[10%] justify-between items-center flex  p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                    <p
                      onClick={() => setOpen(false)}
                      className=" w-10 h-10 md:w-14 md:h-14 rounded-lg bg-primary/20 duration-300  cursor-pointer p-1 flex items-center justify-center"
                    >
                      <RiMenu3Fill className="  text-2xl md:text-3xl   text-gray-700 cursor-pointer" />
                    </p>
                  </div>
                  
                </div> */}
              </SideDrawer>
            </span>
          </aside>
        </div>
      </section>
    </article>
  );
};
export default AccessProtected(AccountLayout);
