import React, { useRef, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import Slider from "react-slick";
import { VideoPlayer } from '../core';

const bannerData = [
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
    {
        image: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
    },
]

const WatchBuy = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigationRef = useRef<any>(null);

    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        arrow: false,
        dots: false,
        afterChange: (index: number) => {
            setCurrentSlide(index);
        },
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
    };

    const handlePrev = () => {
        navigationRef?.current?.slickPrev();
    };

    const handleNext = () => {
        navigationRef?.current?.slickNext();
    };

    return (
        <section className='w-full h-fit flex flex-col py-10 gap-10'>
            <div className='w-full flex items-center justify-center gap-10 main-container '>
                <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                    <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 left-0'></p>
                </span>
                <p className=' w-[40rem] text-center text-xl font-medium text-gray-900'>Watch & Buy</p>
                <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                    <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 right-0'></p>
                </span>
            </div>
            <div className='w-full  flex flex-col gap-5'>
                <div className=' flex items-center justify-end  main-container gap-5'>
                    <div onClick={handlePrev} className='w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-[#d83d43] group duration-300'>
                        <BsArrowLeft className=' group-hover:text-white text-xl text-primary' />
                    </div>
                    <div onClick={handleNext} className='w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-[#d83d43] group duration-300'>
                        <BsArrowLeft className=' group-hover:text-white rotate-180 text-xl text-primary' />
                    </div>
                </div>
                <div className='overflow-hidden slider-container'>
                    <Slider ref={navigationRef} {...settings}>
                        {bannerData.map((item, index) => (
                            <article className=' w-full h-[40rem] flex items-center pt-16 '>

                                <div
                                    key={index}
                                    className={`w-full h-[30rem] overflow-hidden rounded-md ${index === currentSlide ? 'scale-125 px-10 ' : 'px-8 '} duration-300 transform`}
                                >

                                    <VideoPlayer src={item?.image} isVisible={index === currentSlide} />
                                </div>
                            </article>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default WatchBuy
