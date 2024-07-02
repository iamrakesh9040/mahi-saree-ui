import { AboutHero, AboutCompany, UserTestimonial } from "@/components/aboutus";
import { PublicLayout } from "@/layouts";


const AboutUs = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 250,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
    ],
  };
  return (
    <PublicLayout title={`About Us | Shree Odisha Handloom`} ogImage="https://shreyanecom-recent.vercel.app/logo.png">
      <AboutHero />
      <AboutCompany />
      <UserTestimonial
        title={
          <h2 className="title text-center">
            Happy Customers, <span className=" text-gray-400">Happy Us</span>
          </h2>
        }
      />
    </PublicLayout>
  );
};

export default AboutUs;

