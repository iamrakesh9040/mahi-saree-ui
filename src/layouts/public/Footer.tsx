import React from 'react'
import { FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { IoMailOutline } from 'react-icons/io5'
import { RiInstagramFill } from 'react-icons/ri'
interface FOOTER {
    name: string,
    list: { title: string, path: string }[]

}
const Footer = () => {
    const footerData: FOOTER[] = [
        {
            name: 'Company',
            list: [
                {
                    title: "About",
                    path: "#"
                },
                {
                    title: "Features",
                    path: "#"
                },
                {
                    title: "Works",
                    path: "#"
                },
                {
                    title: "Career",
                    path: "#"
                },
            ]
        },
        {
            name: 'Resources',
            list: [
                {
                    title: "Free eBooks",
                    path: "#"
                },
                {
                    title: "Development Tutorial",
                    path: "#"
                },
                {
                    title: "How to - Blog",
                    path: "#"
                },
                {
                    title: "Youtube Playlist",
                    path: "#"
                },
            ]
        }
    ]
    return (
        <footer className='w-full flex flex-col gap-5 border-t   border-primary main-container p-10'>
            <div className='w-full grid lg:grid-cols-4 grid-cols-1 lg:gap-0 gap-5 pt-5'>
                {
                    footerData?.map((item: FOOTER, index: number) => (
                        <div className='w-full flex flex-col gap-7 items-start'>
                            <p className=' uppercase font-semibold tracking-wide'>{item?.name}</p>
                            <div className='flex flex-col gap-5'>
                                {
                                    item?.list?.map((item: any, index: number) => (
                                        <p className=' text-sm text-gray-500 font-normal cursor-pointer'>{item?.title}</p>
                                    ))
                                }

                            </div>
                        </div>
                    ))
                }
                <div className='w-full flex flex-col gap-7 items-start lg:px-4'>
                    <p className=' uppercase font-semibold tracking-wide'>NEWSLETTER</p>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='w-full flex items-center gap-3 rounded-lg border border-slate-400 py-2 px-4'>
                            <IoMailOutline className='text-slate-400' />
                            <input type="text" name="" placeholder='Enter your email address' className=' outline-none p-1  placeholder:text-sm placeholder:text-slate-400 w-full' id="" />
                        </div>
                        <div className=' font-light text-gray-100 w-full flex items-center justify-center py-3 cursor-pointer rounded-lg bg-primary'>Subscribe Now</div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-7 items-center px-4'>
                    <p className=' uppercase font-semibold tracking-wide'>Social Media</p>
                    <div className=' flex items-center gap-5'>
                        <FaTwitter className=' text-twitter clear-start text-xl cursor-pointer' />
                        <FaFacebookF className=' text-facebook clear-start text-xl cursor-pointer' />
                        <RiInstagramFill className=' text-instagram clear-start text-2xl cursor-pointer' />
                        <FaYoutube className=' text-youtube clear-start text-3xl cursor-pointer' />
                    </div>
                </div>
            </div>
            <hr />
            <div className=' w-full flex lg:flex-row flex-col items-center justify-between pt-10'>
                <div className=' flex items-center gap-10 lg:block hidden'>
                    <p className=' text-sm text-gray-900 tracking-wide cursor-pointer'>About us</p>
                    <p className=' text-sm text-gray-900 tracking-wide cursor-pointer'>Contact</p>
                    <p className=' text-sm text-gray-900 tracking-wide cursor-pointer'>Privacy policy</p>
                    <p className=' text-sm text-gray-900 tracking-wide cursor-pointer'>Sitemap</p>
                    <p className=' text-sm text-gray-900 tracking-wide cursor-pointer'>Terms of Use</p>
                </div>
                <p className='text-sm text-gray-900 tracking-wide cursor-pointer'>©  {new Date().getFullYear()}, All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer