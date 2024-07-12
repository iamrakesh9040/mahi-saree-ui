import React, { useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md';
import { motion } from 'framer-motion';
import { PriceRange } from '.';
const ProductSectionLeftSide = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<number[]>([0, 20000]);
    const Menus = [
        {
            title: "Price",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Availability",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Discount",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Occasion",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Color",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Product Type",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
        {
            title: "Fabric",
            list: [
                {
                    title: "All",
                    path: "#"
                }
            ]
        },
    ]
    return (
        <div className='h-fit w-[25%] flex flex-col gap-5 items-start'>
            <p className=' text-2xl font-normal text-gray-900 tracking-wider'>Filter By</p>
            <div className='w-full flex flex-col gap-3'>
                {
                    Menus?.map((item: any, i: number) => (
                        item?.title !== "Price" ? (
                            <MenuContainer key={i} items={item} />
                        ) : (
                            <div className='w-full h-fit flex flex-col border-b-2'>
                                <div
                                    onClick={() => setOpen(!open)}
                                    className='flex items-center w-full justify-between pr-2 py-2 cursor-pointer'
                                >
                                    <p className='text-gray-950 text-xl font-light capitalize tracking-wider'>{item?.title}</p>
                                    <MdArrowForwardIos
                                        className={`text-xl text-gray-900 opacity-70 transition-transform duration-300 ${open ? 'rotate-90' : ''
                                            }`}
                                    />
                                </div>
                                <motion.div
                                    initial={false}
                                    animate={{ height: open ? 'auto' : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`overflow-hidden w-full  duration-700 flex flex-col px-2 gap-2 ${open && `py-10`} `}
                                >
                                    <PriceRange value={value} setValue={setValue} />
                                </motion.div>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}

export default ProductSectionLeftSide

const MenuContainer = ({ items }: { items: any }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='w-full h-fit flex flex-col border-b-2'>
            <div
                onClick={() => setOpen(!open)}
                className='flex items-center w-full justify-between pr-2 py-2 cursor-pointer'
            >
                <p className='text-gray-950 text-xl font-light capitalize tracking-wider'>{items?.title}</p>
                <MdArrowForwardIos
                    className={`text-xl text-gray-900 opacity-70 transition-transform duration-300 ${open ? 'rotate-90' : ''
                        }`}
                />
            </div>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden w-full flex flex-col px-2 gap-2'
            >
                {items?.list?.map((item: any, i: number) => (
                    <p
                        key={i}
                        className='text-gray-500 text-sm cursor-pointer hover:text-gray-900'
                    >
                        {item?.title}
                    </p>
                ))}
            </motion.div>
        </div>

    )
}