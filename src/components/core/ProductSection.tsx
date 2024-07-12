import React, { useState } from 'react'
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import { BsHeart } from 'react-icons/bs';
import ProductCard from './ProductCard';

const RoundedSelect = styled(Select)({
    borderRadius: '50px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '50px',
    },
});
interface PRODUCT {
    image: string,
    title: string,
    price: string,
    // other properties as needed...

}
const Product: PRODUCT[] = [
    {
        image: "/p1.jpg",
        title: "Multi Color Net ",
        price: "7,500"
    },
    {
        image: "/p2.webp",
        title: "Embellished Indian Bridal ",
        price: "25,700"
    },
    {
        image: "/p3.png",
        title: "Green Blouse Embroidered ",
        price: "22,800"
    },
    {
        image: "/p4.jpg",
        title: "Pink Silk Floral Embroidered ",
        price: "11,500"
    },
    {
        image: "/p2.webp",
        title: "Embellished Indian Bridal Mirror",
        price: "25,700"
    },
    {
        image: "/p3.png",
        title: "Green Blouse Embroidered",
        price: "22,800"
    },
]
const ProductSection = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value);
    };
    return (
        <div className='h-fit w-[75%] flex flex-col gap-5 border-l-2 px-5'>
            <div className='w-full flex items-center justify-end'>
                <div className='w-[25%]'>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="sortBy" className='px-4'>Sort by: Latest</InputLabel>
                        <RoundedSelect
                            labelId="sortBy"
                            id="demo-simple-select"
                            value={value}
                            onChange={(e: any) => setValue(e?.target?.value)}
                            label="Sort by: Latest"
                        >
                            <MenuItem value={10}>Option 1</MenuItem>
                            <MenuItem value={20}>Option 2</MenuItem>
                            <MenuItem value={30}>Option 3</MenuItem>
                        </RoundedSelect>
                    </FormControl>
                </div>
            </div>
            <div className=' w-full grid lg:grid-cols-3 grid-cols-2 gap-6 items-center pb-10'>
                {
                    Product.map((product) => (
                        <ProductCard key={product.title} item={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductSection

