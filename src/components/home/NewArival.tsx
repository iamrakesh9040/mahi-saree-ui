import React from 'react'

const NewArival = () => {
    return (
        <section className='w-full main-container py-5 flex flex-col gap-20 '>
            <div className='w-full h-fit border-2 border-gray-800 flex lg:flex-row flex-col  items-center'>
                <div className='w-full lg:w-[65%] lg:h-[25rem]  h-fit items-center grid lg:grid-cols-3 grid-cols-1 gap-10 py-5 px-16  '>
                    <img src="/img2.jpg" className=' w-full h-fit lg:h-[18rem] object-cover lg:-mt-10' alt="" />
                    <img src="/img1.jpg" className=' w-full h-fit lg:h-[18rem] object-cover lg:mt-16' alt="" />
                    <img src="/img3.jpg" className=' w-full h-fit lg:h-[18rem] object-cover lg:-mt-10' alt="" />
                </div>
                <div className='w-full lg:w-[40%] lg:h-[25rem] h-fit flex items-center justify-start  '>
                    <div className=' flex flex-col gap-6 lg:p-0 p-2'>
                        <p className='text-2xl text-gray-500 font-light'>New Arrival</p>
                        <p className=' lg:text-3xl text-xl font-medium text-gray-900 pr-2'>Fabulous Blue and Grey Silk
                            Fabric Embroidered Lehenga
                            Choli</p>
                        <div className=' font-medium text-sm text-primary border  border-primary px-6 py-2.5 cursor-pointer rounded-full w-fit hover:text-white hover:bg-[#d83d43] duration-300'>Shop Now</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewArival