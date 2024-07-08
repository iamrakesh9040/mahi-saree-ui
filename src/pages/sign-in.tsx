import { PublicLayout } from '@/layouts'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const SignIn = () => {
    const [showPassword, setShowPassword] = useState("password")
    return (
        <PublicLayout title='Mah-Saree | Sign In'>
            <div className=' w-full h-full flex items-center justify-center py-5 lg:px-0 px-6'>
                <div className='lg:w-[40%] w-full h-fit rounded-2xl bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-8 px-10 flex items-center flex-col gap-6'>
                    <img src="/logo.jpg" className='w-20 h-20 object-cover rounded-md' alt="" />
                    <p className=' lg:text-3xl text-xl font-medium capitalize  pt-4'>Welcome back, Trailblazer!</p>
                    <p className=' font-normals text-center'>We are excited to have your back. Log in now and access
                        your account.</p>
                    <div className='w-full flex flex-col gap-7'>
                        <div className="relative">
                            <input type="text" id="email" className="block px-4 pb-4 pt-4 w-full text-sm text-gray-900 bg-transparent  border-1 border-black ring-1 rounded-full ring-black appearance-none  focus:outline-none focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="email" className="absolute  text-gray-900  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username or Email</label>
                        </div>
                        <div className="relative">
                            <div className=' absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer'>

                                {
                                    showPassword === "password" ?

                                        <FaRegEyeSlash onClick={() => setShowPassword('text')} className=' text-2xl text-gray-700' /> :
                                        <FaRegEye onClick={() => setShowPassword('password')} className=' text-2xl text-gray-700' />
                                }
                            </div>
                            <input type={showPassword} id="password" className="block px-4 pb-4 pt-4 w-full text-sm text-gray-900 bg-transparent  border-1 border-black ring-1 rounded-full ring-black appearance-none  focus:outline-none focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="password" className="absolute  text-gray-900  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <div className="flex items-center gap-3">
                            <input id="default-checkbox" type="checkbox" value="" className="lg:w-5 w-3 lg:h-5 h-3 text-primary bg-primary rounded focus:ring-primary  focus:ring-2 " />
                            <label htmlFor="default-checkbox" className="  text-gray-900 cursor-pointer lg:text-base text-sm ">Remember me</label>
                        </div>
                        <p className=' text-gray-900 cursor-pointer lg:text-base text-sm'>Forgot your password ?</p>
                    </div>
                    <button className='w-full  text-center py-3 mt-8 rounded-full bg-primary text-white text-xl '>Login</button>
                    <article className='w-full flex items-center justify-between gap-3'>
                        <hr className='w-full' />
                        <p className=' text-sm font-normal text-gray-400'>or</p>
                        <hr className='w-full' />
                    </article>
                    <div className='w-full flex items-center gap-5'>
                        <div className='w-full h-16 border-2 border-gray-500 cursor-pointer rounded-full flex items-center justify-center'>
                            <img src="/google.png" className='w-10 h-fit object-contain' alt="" />
                        </div>
                        <div className='w-full h-16 border-2 border-gray-500 cursor-pointer rounded-full flex items-center justify-center'>
                            <img src="/facebook.png" className='w-10 h-fit object-contain' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default SignIn