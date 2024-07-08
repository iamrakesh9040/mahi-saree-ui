// import { useAppContext } from "contexts";
import Head from "next/head";
import { AccessProtected } from "@/hooks";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
};
const PublicLayout = ({
  children = <></>,
  title = "Mahi-Saree-shop",
  description,
  ogImage,
}: Props) => {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content=""
        />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta
          name="description"
          content="Shop trendy clothes online at Mahi-Saree. Find the perfect outfit for any occasion. Browse now!"
        />
        <meta
          property="og:image"
          content={
            ogImage ? ogImage : ""
          }
        />
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          defer
        ></script>
      </Head>
      <main className=" w-full relative ">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};
export default PublicLayout;
