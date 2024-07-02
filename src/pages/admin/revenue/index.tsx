import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { PiExportBold } from "react-icons/pi";

const Revenue = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const { data, pagination, mutate, isValidating } = useSwr(`Revenue`);
  const [view, setView] = useState("DAILY");
  const { mutation, isLoading } = useMutation();

  const REPORT = [
    {
      label: "DAILY",
      value: "DAILY",
    },
    {
      label: "WEEKLY",
      value: "WEEKLY",
    },
    {
      label: "MONTHLY",
      value: "MONTHLY",
    },
  ];

  return (
    <AdminLayout title="Revenue | Shree Odisha Handloom">
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Revenue List
        </p>
        {/* <div className="w-full flex items-center  justify-between">
              <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
                <IoMdSearch className="text-gray-400 text-xl " />
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e?.target?.value)}
                  type="text"
                  name="searchRevenue"
                  placeholder="Search Revenue..."
                  className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
                />
              </div>
            </div> */}
        <div className="flex justify-between">
          <div className="flex justify-start items-center gap-2">
            {REPORT.map((item, i) => (
              <button
                key={i}
                className={`border rounded-md md:text-base text-xs px-6 py-2 ${
                  view === item.value
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                }`}
                onClick={() => setView(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="bg-green-500 text-white font-semibold py-1 px-4 text-lg rounded-md flex gap-2 items-center">
            <PiExportBold className="text-white text-2xl" />
            EXPORT
          </button>
        </div>
        <MaterialTable
          isLoading={isValidating || isLoading}
          components={{
            Container: (props: any) => (
              <Paper {...props} className="!shadow-none" />
            ),
            // OverlayLoading: () => <CustomLoader />,
            // Pagination: (props) => {
            //     return (
            //         <div className="w-full flex items-center justify-center py-4">
            //             <Pagination
            //                 count={Math.ceil(
            //                     Number(pagination?.totalCount || 1) /
            //                     Number(pagination?.limit || 1)
            //                 )}
            //                 onChange={(e, v: number) => setPageNumber(v)}
            //                 variant="outlined"
            //                 color="primary"
            //                 page={pageNumber}
            //             />
            //         </div>
            //     );
            // },
          }}
          data={
            data
              ? data?.map((item: any, i: number) => ({
                  ...item,
                  sl: i + 1,
                  id: item?._id,
                }))
              : []
          }
          options={{
            ...MuiTblOptions(),
            search: false,
            exportMenu: [],
            toolbar: false,
            pageSize: 10,
          }}
          columns={[
            {
              title: "SL No",
              field: "sl",
              editable: "never",
              width: "10%",
            },
            {
              title: "Day",
              tooltip: "Day",
              field: "day",
              editable: "never",
              width: "40%",
            },
            {
              title: "Revenue",
              tooltip: "Revenue",
              field: "revenue",
              width: "40%",
            },

            // {
            //   title: "Action",
            //   tooltip: "Action",
            //   field: "action",
            //   editable: "never",
            //   width: "20%",
            //   render: (item: any) => (
            //     <div className="flex items-center gap-3">
            //       <p
            //         onClick={() => {
            //           setOpen(true), setValue(item);
            //         }}
            //       >
            //         <MdReply
            //           className="text-xl text-blue-500  cursor-pointer"
            //           title="reply"
            //         />
            //       </p>
            //     </div>
            //   ),
            // },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default Revenue;
