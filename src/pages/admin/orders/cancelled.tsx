import {
  OrderCancelledInfoDrawer,
  StatusUpdateModal,
} from "@/components/order";
import { CustomLoader } from "@/core";
import { useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Pagination, Paper } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";

const Cancelled = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [value, setValue] = useState<any>();
  const [open, setOpen] = useState(false);
  const [cancellType, setCancellType] = useState<any>();
  const [cancelledDetails, setCancelledDetails] = useState(false);
  const { data, isValidating, mutate, pagination } = useSwr(
    `retrieve?pageNumber=${pageNumber}&limit=10&type=CANCELLED&sortBy="asc"`
  );
  return (
    <AdminLayout title="Cancelled List | Shree Odisha Handloom">
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          All Cancelled List
        </p>
        <div className="w-full flex items-center  justify-between">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchCancelled"
              placeholder="Search Cancelled..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
          <OrderCancelledInfoDrawer
            open={cancelledDetails}
            onClose={() => setCancelledDetails(false)}
            item={value}
          />
          <StatusUpdateModal
            openDialog={open}
            setOpenDialog={setOpen}
            mutate={mutate}
            item={cancellType}
          />
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
                  title: item?.title,
                  msg: item?.msg?.slice(0, 20),
                  status: item?.status,
                  createdAt: dayjs(item?.createdAt).format("MMMM DD, YYYY"),
                  bankName: item?.BankName,
                  accountName: item?.accountName,
                  accountNumber: item?.accountNumber,
                  ifscCode: item?.ifscCode,
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
              title: "Reason",
              tooltip: "Reason",
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
              title: "Purchase Date",
              tooltip: "Purchase Date",
              field: "createdAt",
              editable: "never",
              width: "10%",
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              editable: "never",
              width: "10%",
            },
            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "20%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <GrView
                    onClick={() => {
                      setCancelledDetails(true);
                      setValue(item);
                    }}
                    title="view"
                    className="text-xl text-blue-500  cursor-pointer"
                  />
                  <p
                    onClick={() => {
                      setOpen(true);
                      setCancellType(item);
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

export default Cancelled;
