import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRange = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getFullYear()), // Set the end date to December 31st of the current year
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Datepicker
      showShortcuts={true}
      showFooter={true}
      inputClassName="w-full p-2 outline-none ring-1 ring-gray-300 rounded-md "
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default DateRange;
