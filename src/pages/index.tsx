import { LogoSlider } from "@/components/common";
import ClientTestimonial from "@/components/common/ClientTestimonial";
import MobileApp from "@/components/common/MobileApp";
import {
  Coupons,
  HeroSection,
  NewArrival,
  ProductImage,
  SellingProduct,
} from "@/components/home";
import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";

export default function Home() {
  const {
    data: imageData,
    isValidating,
    mutate,
  } = useSwr(`product/get-all-images`);
  return (
    <PublicLayout
      title="Mahi-Saree"
      ogImage=""
    >
      <HeroSection />
      <ProductImage />
      <LogoSlider
        title="Explore Our All Collections"
        Arr={imageData}
        mutate={mutate}
        isValidating={isValidating}
      />
      <NewArrival />
      <Coupons />
      <SellingProduct />
      {/* <Product /> */}
      <MobileApp />
      <ClientTestimonial />
    </PublicLayout>
  );
}
