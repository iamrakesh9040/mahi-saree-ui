/* eslint-disable @next/next/no-img-element */
import { useSwr } from "@/hooks";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";

const HeroSection = () => {
    const bannerData = [
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
        {
            image: "/banner1.avif"
        },
    ]
    const [currentSlide, setCurrentSlide] = useState(0);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: true,
        afterChange: (index: number) => {
            setCurrentSlide(index);
            setAnimationTrigger(false); // Reset animation trigger
            setTimeout(() => setAnimationTrigger(true), 50); // Restart animation
        },
    };

    const navigationRef = useRef<any>(null);
    const handlePrev = () => {
        navigationRef?.current?.slickPrev();
    };
    const handleNext = () => {
        navigationRef?.current?.slickNext();
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        navigationRef?.current?.slickGoTo(index);
    };


    return (
        <section className="w-full lg:h-[85vh] h-[30vh] overflow-hidden relative">
            <p
                onClick={handlePrev}
                className="absolute z-10 top-1/2 -translate-y-1/2 -left-5 w-14 md:h-20 h-16 rounded-lg bg-slate-100 bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer text-black/20 hover:text-black/60 flex items-center justify-center pl-5"
            >
                <MdArrowBackIos />
            </p>
            <p
                onClick={handleNext}
                className="absolute z-10 top-1/2 -translate-y-1/2 -right-5 w-14 md:h-20 h-16 rounded-lg bg-slate-100 bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer text-black/20 hover:text-black/60 flex items-center justify-center pr-5"
            >
                <MdArrowForwardIos />
            </p>
            <aside className="w-full overflow-hidden z-0 relative">
                <Slider ref={navigationRef} {...settings}>
                    {
                        bannerData?.map((item: any) => (
                            <img
                                key={item.id}
                                src={item.image}
                                className="lg:h-[85vh] h-[30vh] w-full object-cover"
                                alt=""
                            />
                        ))
                    }
                </Slider>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {bannerData?.map((_: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className="md:w-14 w-6 h-1 rounded-full cursor-pointer bg-gray-300 relative"
                        >
                            <div
                                className={`absolute top-0 left-0 h-1 rounded-full bg-primary transition-all duration-[3000ms] ${currentSlide === index && animationTrigger ? "w-full" : "w-0"
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>
            </aside>
        </section>
    );
};

export default HeroSection;

export const CardSkelton = () => (
    <article className="flex flex-col gap-5 rounded-lg border border-gray-200 p-5 shadow-md relative">
        <section className=" w-full lg:h-[75vh] h-[30vh] rounded-lg bg-gray-200 animate-pulse">
            <div className="h-full w-full bg-gray-300 animate-pulse"></div>
        </section>
        <div className="flex gap-2 justify-center items-center absolute bottom-5 left-1/2 transform -translate-x-1/2 space-x-2">
            <div className="animate-pulse  bg-gray-500"></div>
            <div className="animate-pulse bg-gray-500"></div>
            <div className="animate-pulse bg-gray-500"></div>
            <div className="animate-pulse bg-gray-500"></div>
            <div className="animate-pulse bg-gray-500"></div>
        </div>
    </article>
);
