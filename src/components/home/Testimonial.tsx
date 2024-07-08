import Slider from "react-slick";
import { RiDoubleQuotesL } from "react-icons/ri";
import { SetStateAction, useRef, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface ITestimonial {
    _id: string;
    image: string;
    name: string;
    designation: string;
    quote: string;
}

const Testimonial_ARR: ITestimonial[] = [
    {
        _id: "1",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
        name: "Ms. Anjali Sharma",
        designation: "Customer",
        quote:
            "Mahi-Saree offers an exquisite collection that blends tradition with modernity. Their sarees are perfect for any occasion and have garnered many compliments.",
    },
    {
        _id: "2",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
        name: "Mrs. Priya Kapoor",
        designation: "Fashion Enthusiast",
        quote:
            "The quality and craftsmanship of Mahi-Saree's products are top-notch. I have recommended their sarees to my friends and family, and they love them too.",
    },
    {
        _id: "3",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
        name: "Dr. Riya Verma",
        designation: "Designer",
        quote:
            "Mahi-Saree's unique designs are a blend of traditional and contemporary styles, making them a must-have in every wardrobe. Their service is exceptional and customer-focused.",
    },
    {
        _id: "4",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
        name: "Ms. Shweta Mehta",
        designation: "Frequent Buyer",
        quote:
            "I have been a loyal customer of Mahi-Saree for years. Their collection is always evolving, offering something new and exciting every time I shop. Their sarees are a perfect gift option as well.",
    },
    {
        _id: "5",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
        name: "Mrs. Kavita Rao",
        designation: "Event Planner",
        quote:
            "Mahi-Saree has been my go-to for sarees for various events. Their range caters to all tastes and preferences, and the quality is impeccable. The team at Mahi-Saree is always helpful and accommodating.",
    },
];


const ClientTestimonial = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (index: number) => {
            setCurrentSlide(index);
            setAnimationTrigger(false); // Reset animation trigger
            setTimeout(() => setAnimationTrigger(true), 50); // Restart animation
        },
    };
    const navigationRef = useRef<any>(null);
    const handlePrev = () => {
        if (navigationRef.current && currentSlide > 0) {
            navigationRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        if (navigationRef.current && currentSlide < Testimonial_ARR.length - 1) {
            navigationRef.current.slickNext();
        }
    };
    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        navigationRef?.current?.slickGoTo(index);
    };
    return (
        <section className=" main-container top-spacing w-full">
            <div className="w-full h-fit relative flex flex-col gap-5 ">
                <div className='w-full flex items-center justify-center gap-10 py-5'>
                    <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                        <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 left-0'></p>
                    </span>
                    <p className=' w-[40rem] text-center lg:text-2xl font-medium text-gray-900'>Testimonials</p>
                    <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                        <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 right-0'></p>
                    </span>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" w-full text-start">
                        <p className=" flex flex-col gap-1 ">
                            <span className="text-gray-800 lg:text-2xl text-sm">What Customers Say About Us</span>
                            <span className=" w-32 h-0.5 bg-primary rounded-full"></span>
                        </p>
                    </div>
                    <div className="flex  items-center gap-4">
                        <p
                            onClick={handlePrev}
                            className={`cursor-pointer w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full ${currentSlide === 0 ? "opacity-50" : ""
                                }`}
                        >
                            <IoMdArrowRoundBack className="text-secondary text-xl" />
                        </p>
                        <p
                            onClick={handleNext}
                            className={`cursor-pointer w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full ${currentSlide === Testimonial_ARR.length - 1 ? "opacity-50" : ""
                                }`}
                        >
                            <IoMdArrowRoundForward className="text-secondary text-xl" />
                        </p>
                    </div>
                </div>
                <aside className="w-full overflow-hidden feature-slick-slider z-0">
                    <Slider ref={navigationRef} {...settings}>
                        {Testimonial_ARR.map((item) => (
                            <TestimonialCard item={item} key={item._id} />
                        ))}
                    </Slider>
                </aside>
                <div className="w-full flex items-center justify-center gap-2 py-5">
                    {Testimonial_ARR?.map((_: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`md:w-3 w-3 h-3 rounded-full cursor-pointer bg-gray-300 ${currentSlide === index && animationTrigger && `bg-primary`} `}
                        >

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ item }: { item: ITestimonial }) => {
    return (
        <article className="!flex !items-center justify-center" key={item._id}>
            <div className="flex flex-col gap-3 rounded-lg p-4">
                <div className="relative lg:h-60 2xl:h-56 w-full">
                    <span className="absolute -bottom-2 left-8 z-10 w-5 h-5 rotate-45 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                        {/* <BiSolidDownArrow className="text-4xl text-gray-100" /> */}
                    </span>
                    <div className="relative z-20 h-full w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex justify-center items-center text-center rounded-[30px] p-2">
                        <span className="absolute -bottom-2 left-8 z-10 w-5 h-5 rotate-45 bg-white ">
                            {/* <BiSolidDownArrow className="text-4xl text-white" /> */}
                        </span>
                        <p className="text-sm font-normal p-6">{item.quote}</p>
                        <span className="absolute top-1 left-2">
                            <RiDoubleQuotesL className="text-3xl md:text-4xl text-primary" />
                        </span>
                        <span className="absolute bottom-1 right-2">
                            <RiDoubleQuotesL className="text-3xl md:text-4xl text-primary rotate-180" />
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-5 py-2">
                    <span className="rounded-full h-20 w-20 min-w-[5rem] flex items-center justify-center overflow-hidden">
                        <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        <p className=" text-base font-normal text-gray-600">
                            {item.designation}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ClientTestimonial;