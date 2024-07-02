import { ReturnStatusModal } from "@/components/order";
import { CustomLoader } from "@/core";
import { useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Pagination, Paper } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";

const Return = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [returnType, setReturnType] = useState<any>();
  const { data, isValidating, mutate, pagination } = useSwr(
    `retrieve?pageNumber=${pageNumber}&limit=10&type=RETURNED&sortBy="desc"`
  );
  return (
    <AdminLayout title="Order List | Shree Odisha Handloom">
      <ReturnStatusModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        item={returnType}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          All Return List
        </p>
        <div className="w-full flex items-center  justify-between">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchReturn"
              placeholder="Search Return..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
        </div>

        <MaterialTable
          isLoading={isValidating}
          components={{
            Container: (props: any) => (
              <Paper {...props} className="!shadow-none" />
            ),
            OverlayLoading: () => <CustomLoader />,
            Pagination: (props) => {
              return (
                <div className="w-full flex items-center justify-center py-4">
                  <Pagination
                    count={Math.ceil(
                      Number(pagination?.totalCount || 1) /
                        Number(pagination?.limit || 1)
                    )}
                    onChange={(e, v: number) => setPageNumber(v)}
                    variant="outlined"
                    color="primary"
                    page={pageNumber}
                  />
                </div>
              );
            },
          }}
          data={
            data?.length >= 0
              ? data?.map((item: any, i: number) => ({
                  sl: i + 1,
                  id: item?._id,
                  orderId: item?.order?.orderId,
                  image: item?.images,
                  paymentType: item?.paymentType,
                  title: item?.title,
                  msg: item?.msg?.slice(0, 20),
                  status: item?.status,
                  createdAt: dayjs(item?.createdAt).format("MMMM DD, YYYY"),
                  type: item?.type,
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
              width: "2%",
            },

            {
              title: "Order ID",
              tooltip: "Order ID",
              field: "orderId",
              editable: "never",
              width: "8%",
            },

            {
              title: "Title",
              tooltip: "Title",
              field: "title",
              editable: "never",
              width: "20%",
            },
            {
              title: "Message",
              tooltip: "Message",
              field: "msg",
              editable: "never",
              width: "20%",
            },
            {
              title: "Date",
              tooltip: "Date",
              field: "createdAt",
              editable: "never",
              width: "15%",
            },

            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              editable: "never",
              width: "10%",
            },
            // {
            //   title: "Type",
            //   tooltip: "Type",
            //   field: "type",
            //   editable: "never",
            //   width: "10%",
            // },
            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "5%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <RxUpdate
                    onClick={() => {
                      setOpen(true);
                      setReturnType(item);
                    }}
                    title="update"
                    className="text-xl text-gray-500  cursor-pointer"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default Return;
