import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { BiUser } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { HiMenuAlt1, HiOutlineShoppingCart } from "react-icons/hi";
import MobileDrawer from './MobileDrawer';
import { useRouter } from 'next/router';
interface MENUITEMS {
    name: string,
    route: string,
    isMenuList: boolean,
}
const Navbar = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const menuItems: MENUITEMS[] = [
        {
            name: "New Arrivals",
            route: "#",
            isMenuList: true,
        },
        {
            name: "Collections",
            route: "#",
            isMenuList: true,
        },
        {
            name: "Sarees",
            route: "#",
            isMenuList: true,
        },
        {
            name: "Track Order",
            route: "#",
            isMenuList: true,
        },
        {
            name: "About Us",
            route: "#",
            isMenuList: true,
        },
    ]
    return (
        <>
            <nav className='bg-white w-full   flex  gap-1 items-center sticky top-0 border-b-[2px] border-gradient z-[999] '>
                <MobileDrawer open={open} close={() => setOpen(false)} />

                <div className='main-container w-full flex items-center justify-between py-2'>
                    <img src="/logo.jpg" className='lg:w-16 w-10 lg:h-16 h-10 object-contain rounded-lg' alt="" />
                    <div className=' items-center gap-8 lg:flex hidden'>

                        {
                            menuItems.map((item: MENUITEMS, index: number) => (
                                <div key={index} className='flex items-center gap-2 cursor-pointer'>

                                    {
                                        item?.name
                                    }
                                    {
                                        item?.isMenuList && <span className='w-1 h-1 bg-primary-600 rounded-full'></span>
                                    }


                                </div>
                            ))
                        }
                    </div>
                    <div className='flex items-center gap-4'>
                        <FiSearch className='text-2xl text-gray-950 cursor-pointer' />
                        <BiUser onClick={() => router?.push(`/sign-in`)} className='text-2xl text-gray-950 cursor-pointer lg:block hidden' />
                        <MdOutlineShoppingCart className='text-2xl text-gray-950 cursor-pointer' />
                        <p
                            onClick={() => setOpen(true)}
                            className="w-10 h-10 rounded-lg  cursor-pointer p-1 bg-gray-700/5 flex lg:hidden items-center justify-center"
                        >
                            <HiMenuAlt1 className="text-2xl text-primary rotate-180 " />
                        </p>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar