import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { ProductCard } from '../core'
interface PRODUCT {
    image: string,
    title: string,
    price: string,
    // other properties as needed...

}
const BestSeller = () => {
    const Product: PRODUCT[] = [
        {
            image: "/p1.jpg",
            title: "Multi Color Net Embroidered Lehenga Set",
            price: "7,500"
        },
        {
            image: "/p2.webp",
            title: "Embellished Indian Bridal Mirror Lehenga Choli",
            price: "25,700"
        },
        {
            image: "/p3.png",
            title: "Green Blouse Embroidered Lehenga Set",
            price: "22,800"
        },
        {
            image: "/p4.jpg",
            title: "Pink Silk Floral Embroidered Bundi And Kurta Set",
            price: "11,500"
        },
    ]
    return (
        <div className='w-full main-container flex flex-col gap-10 py-10'>
            <div className='w-full flex items-center justify-between'>
                <article className='flex items-center gap-5'>
                    <p className=' lg:text-5xl text-base font-normal text-gray-800'>Best Sellers</p>
                    <span className='lg:w-60 w-10 h-[0.05rem] bg-gray-900 relative lg:mt-3'>
                        <p className='w-1 h-1 bg-gray-900 animate-spin absolute -top-[0.09rem] right-0'></p>
                    </span>
                </article>
                <article className=' cursor-pointer flex items-center gap-1'>
                    <p className=' text-xl font-medium text-primary'>View All</p>
                    <BsArrowLeft className=' rotate-180 text-xl text-primary' />
                </article>
            </div>
            <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-10 items-start'>
                {
                    Product?.map((item: PRODUCT, index: number) => (
                        <ProductCard item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller