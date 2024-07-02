import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import { HiSearch } from "react-icons/hi";
import { Close, FilterListRounded } from "@mui/icons-material";
import { InputField } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";

export default function FilterBar({
  options,
  orderBy,
  setOrderBy,
  setOpenFilter,
  date,
  setDate,
  openFilter,
  setSearchText,
  searchText,
  setPageNumber,
}: {
  setScheduleNotificationOpen?: any;
  options?: any;
  orderBy?: any;
  setOrderBy?: any;
  setOpenFilter?: any;
  date?: any;
  setDate?: any;
  openFilter?: any;
  setSearchText?: any;
  searchText?: any;
  setPageNumber?: any;
}) {
  const handleSelectChange = (newValue: { target: { value: string } }) => {
    const selectedOption = options.find(
      (option: { value: string }) => option.value === newValue?.target?.value
    );

    if (selectedOption) {
      if (["0", "1", "2"].includes(selectedOption.value)) {
        setOrderBy(selectedOption.data);
        setOpenFilter(selectedOption.value);
        setDate(null);
        setPageNumber(1);
      } else {
        // If not, update the other state
        setDate(new Date(selectedOption.data));
        setOpenFilter(selectedOption.value);
        setOrderBy(null);
        setPageNumber(1);
      }
    }
  };
  const handleClose = () => { };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="w-full p-3 relative rounded-md gap-2 md:gap-4 flex-col md:flex-row flex items-center bg-white shadow-[0px_0px_4px_0px_#00000024] ">
        <div
          className={`w-12 h-12 flex justify-center items-center rounded-md bg-primary`}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setOpenFilter("0");
              setDate("");
              setOrderBy(null);
              setSearchText("");
            }}
          >
            <Tooltip
              title={`${searchText?.length ||
                  String(date)?.length > 0 ||
                  orderBy?.length > 0
                  ? `Remove Filter`
                  : `Filter`
                }`}
            >
              {searchText?.length ||
                String(date)?.length > 0 ||
                orderBy?.length > 0 ? (
                <Close className={"!text-white text-3xl"} />
              ) : (
                <FilterListRounded className={"!text-white text-3xl"} />
              )}
            </Tooltip>
          </IconButton>
        </div>
        <div className="w-full">
          <CustomInputField
            type="text"
            placeholder="Search for result..."
            variant="outlined"
            value={searchText}
            InputProps={{
              startAdornment: <HiSearch className="mr-4 text-gray-500" />,
            }}
            // value={searchText}
            onChange={(e: { target: { value: any } }) =>
              setSearchText(e.target.value)
            }
            id={""}
          />
        </div>
        <div className=" w-full md:w-fit flex justify-between items-center gap-2 lg:gap-4">
          <div className="bg-white rounded-md md:w-64 w-full">
            <CustomInputField
              type="select"
              size="medium"
              placeholder=""
              value={openFilter || null}
              variant="outlined"
              options={options || []}
              onChange={(newValue: { target: { value: string } }) =>
                handleSelectChange(newValue)
              }
              id={""}
            />
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
