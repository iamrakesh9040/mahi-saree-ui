import { SupportStatusUpdateModal } from "@/components/order";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useDeferredValue, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";

const ManageSupport = () => {
  const [view, setView] = useState("Table");
  const [open, setOpen] = useState<any>();
  const [support, setSupport] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const query = useDeferredValue(searchText);
  let url = `product?sortBy=desc&page=${pageNumber}&limit=10`;
  searchText && (url += `&search=${query}`);

  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(`support`);

  return (
    <AdminLayout title="Support| Shree Odisha Handloom">
      <SupportStatusUpdateModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        item={support}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Support List
        </p>
        <div className="w-full flex items-center  justify-between">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchProduct"
              placeholder="Search Product..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
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
            data?.length >= 0
              ? data?.map((item: any, i: number) => ({
                  sl: i + 1,
                  id: item?._id,
                  orderId: item?.order?.orderId,
                  title: item?.title,
                  name: item?.user?.name,
                  email: item?.user?.email,
                  message: item?.description?.slice(0, 20),
                  status: item?.status,
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
              title: "Sl No",
              field: "sl",
              editable: "never",
              width: "10%",
            },
            {
              title: "Name",
              tooltip: "Name",
              field: "name",
              editable: "never",
              width: "15%",
            },
            {
              title: "Email",
              tooltip: "Email",
              field: "email",
              width: "15%",
            },
            {
              title: "Title",
              tooltip: "Title",
              field: "title",
              width: "20%",
            },
            {
              title: "Message",
              tooltip: "Message",
              field: "message",
              width: "20%",
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              width: "10%",
            },
            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "10%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <p
                    onClick={() => {
                      setOpen(true);
                      setSupport(item);
                    }}
                  >
                    <FiEdit className="text-xl text-green-500  cursor-pointer" />
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageSupport;
