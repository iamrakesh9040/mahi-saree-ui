import { ProductSections, ProductSectionsLeftSide } from '@/Components/core'
import { PublicLayout } from '@/layouts'
import { useRouter } from 'next/router'
import React from 'react'

const Product = () => {
    const router = useRouter()
    return (
        <PublicLayout title='Products | Mahi Saree'>
            <section className='w-full h-fit main-container flex flex-col gap-5 pt-10'>
                <div className=' w-full relative flex items-center justify-center'>
                    <div className=' absolute top-0 left-0 flex items-center gap-2'>
                        <p onClick={() => router?.push(`/`)} className=' text-lg text-gray-400 tracking-wider font-light cursor-pointer'>Home</p>
                        <p className=' font-medium text-gray-700'>{`>`}</p>
                        <p className=' font-normal text-gray-800 tracking-wider cursor-pointer'>Saree</p>
                    </div>
                    <ul className='flex flex-col gap-2 items-center'>
                        <h1 className=' font-medium text-3xl'>Sarees</h1>
                        <h4 className=' font-medium  text-gray-400 tracking-wider'><span className=' font-semibold text-gray-500'>52</span> Result Found</h4>
                    </ul>
                </div>
                <div className='w-full h-fit flex items-start'>
                    <ProductSectionsLeftSide />
                    <ProductSections />
                </div>
            </section>
        </PublicLayout>
    )
}

export default Product