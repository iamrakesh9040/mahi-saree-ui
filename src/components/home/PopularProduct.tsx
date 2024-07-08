import { title } from 'process'
import React from 'react'

const PopularProduct = () => {
    const images = [
        {
            image: "/popular/popular1.jpg",
            title: "casual wear"
        },
        {
            image: "/popular/popular2.jpg",
            title: "Wedding season"
        },
        {
            image: "/popular/popular3.jpg",
            title: "festive"
        },
        {
            image: "/popular/popular4.jpg",
            title: "New arrivals"
        },
    ]
    return (
        <section className='w-full main-container py-10 flex flex-col lg:gap-20 gap-5'>
            <div className='w-full flex items-center justify-center gap-10'>
                <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                    <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 left-0'></p>
                </span>
                <p className=' lg:w-[40rem] w-full text-center lg:text-xl text-sm font-medium text-gray-900'>Popular Categories</p>
                <span className='w-full h-[0.05rem] bg-gray-900 relative'>
                    <p className='w-2 h-2 bg-gray-900 animate-spin absolute -top-1 right-0'></p>
                </span>
            </div>
            <div className='w-full h-[30rem] overflow-hidden grid lg:grid-cols-4 grid-cols-2 items-center gap-6 '>
                {
                    images?.map((item: any, index: number) => (
                        <div className='w-full h-full relative'>
                            <p className=' absolute bottom-10 left-1/2 -translate-x-1/2 text-xl text-white uppercase w-full text-center'>{item?.title}</p>
                            <img src={item?.image} className='w-full h-full object-cover' alt="" />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PopularProduct