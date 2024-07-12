import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

function valuetext(value: number) {
    return `${value}`;
}

const CustomSlider = styled(Slider)(({ theme }) => ({
    "& .MuiSlider-thumb": {
        backgroundColor: "#3AAF9F",
    },
    "& .MuiSlider-track": {
        backgroundColor: "#3AAF9F",
    },
    "& .MuiSlider-track.MuiSlider-track": {
        backgroundColor: "#3AAF9F",
    },
}));

const PriceRangeSlider = ({
    setStartPrice,
    setEndPrice,
    value,
    setValue,
    setPageNo,
}: any) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        // setStartPrice(value[0]);
        // setEndPrice(value[1]);
        // setPageNo(1);
    };

    return (
        <>
            <div className="px-2">
                <Box sx={{ width: 330 }}>
                    <CustomSlider
                        getAriaLabel={() => "Price range"}
                        value={value}
                        onChange={handleChange}
                        min={0}
                        max={20000}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
                <p className="flex items-center text-sm text-gray-900">
                    PRICE: ₹
                    <span className="ml-1 flex h-6 w-16 items-center justify-center border border-gray-200">
                        {value[0]}
                    </span>
                    <span className="mx-3">-</span>₹
                    <span className="ml-1 flex h-6 w-16 items-center justify-center border border-gray-200">
                        {value[1]}
                    </span>
                </p>
            </div>
        </>
    );
};

export default PriceRangeSlider;
