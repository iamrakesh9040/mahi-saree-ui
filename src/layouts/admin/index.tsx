import Head from "next/head";
import { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaXmark } from "react-icons/fa6";
import AdminDrawer from "./AdminDrawer";
import Header from "./Header";
import MobileAdminDrawer from "./MobileAdminDrawer";
import { AdminProtected } from "@/hooks";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
};

const AdminLayout = ({
  children = <></>,
  title = "Shreyan Admin Panel",
  description,
  ogImage,
}: Props) => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={""} />
      </Head>
      <main className=" w-full h-full flex overflow-hidden relative ">
        <article className=" hidden  w-80 h-screen bg-gray-800 lg:flex flex-col gap-5">
          <AdminDrawer />
        </article>
        <article
          className={`lg:hidden  w-80 h-screen bg-gray-800 flex flex-col gap-5 absolute z-[555]  duration-500
        ${adminMenuOpen ? "-translate-x-0" : "-translate-x-96"}
        `}
        >
          <p
            onClick={() => setAdminMenuOpen(!adminMenuOpen)}
            className=" p-1  rounded-md absolute right-2 top-2 "
          >
            {adminMenuOpen ? (
              <FaXmark className=" text-3xl text-red-500 cursor-pointer" />
            ) : (
              <CgMenuLeftAlt className=" text-3xl text-red-500 cursor-pointer" />
            )}
          </p>
          <MobileAdminDrawer />
        </article>
        <article className=" w-full h-screen flex flex-col gap-1 overflow-hidden">
          <Header
            setAdminMenuOpen={setAdminMenuOpen}
            adminMenuOpen={adminMenuOpen}
          />
          <div className=" w-full h-full bg-slate-100 overflow-y-auto ">
            {children}
          </div>
        </article>
      </main>
    </>
  );
};

export default AdminProtected(AdminLayout);
