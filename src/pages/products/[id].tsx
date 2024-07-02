import CustomerProductDetails from "@/components/products/CustomerProductDetails";
import RecentProduct from "@/components/products/RecentProduct";
import SimilarProduct from "@/components/products/SimilarProduct";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");
  const { data, mutate } = useSwr(
    router?.query?.id ? `product/${router?.query?.id}` : ``
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  return (
    <PublicLayout
      title={`${
        router?.query?.id ? router?.query?.id : `Loading...`
      } | Shree Odisha Handloom`}
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <CustomerProductDetails
        productUrl={currentUrl}
        onClose={() => console.log("Closing")}
        data={data}
        mutate={mutate}
      />
      <SimilarProduct data={data} />
      {/* <RecentProduct /> */}
    </PublicLayout>
  );
};

export default Product;
