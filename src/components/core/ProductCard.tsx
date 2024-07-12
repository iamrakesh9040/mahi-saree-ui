import { useRouter } from "next/router"
import { BsHeart } from "react-icons/bs"

interface PRODUCT {
    image: string,
    title: string,
    price: string,
    // other properties as needed...

}
const ProductCard = ({ item }: { item: PRODUCT }) => {
    const router = useRouter()
    return (
        <div onClick={() => router?.push(`/product?name=${item?.title}`)} className='w-full h-fit flex flex-col gap-3 cursor-pointer  relative'>
            <div className=' absolute top-5 right-4 z-10'><BsHeart className=' text-2xl text-white' /></div>
            <img src={item?.image} className='w-full lg:h-[35rem] h-[10rem] object-cover' alt="" />
            <p className=' font-light text-gray-700 lg:text-base text-sm'>{item?.title}</p>
            <div className='w-full flex items-center gap-3'>
                <p className=' font-semibold text-gray-900 lg:text-base text-sm'>₹{item?.price}</p>
                <p className=' font-light text-gray-400 lg:text-base text-xs line-through'>₹6,600</p>
                <p className=' font-normal text-red-500 lg:text-base text-xs'>(63% OFF)</p>

            </div>
        </div>
    )
}
export default ProductCard