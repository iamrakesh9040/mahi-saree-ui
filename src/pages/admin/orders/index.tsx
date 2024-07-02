import DeliveryAddForm from "@/components/forms/DeliveryAddForm";
import { CustomLoader } from "@/core";
import { useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Edit } from "@mui/icons-material";
import { Pagination, Paper } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const AllOrders = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const { data, isValidating, pagination, mutate } = useSwr(
    `order?pageNumber=${pageNumber}&limit=10`
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectObj, setSelectObj] = useState();
  return (
    <AdminLayout title="Order List | Shree Odisha Handloom">
      <DeliveryAddForm
        data={selectObj}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        mutate={mutate}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          All Orders List
        </p>
        <div className="w-full flex lg:items-center  lg:justify-between lg:flex-row flex-col gap-2">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchOrder"
              placeholder="Search Order..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
          <div className="flex gap-2 lg:flex-row flex-col">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/orders/return"
                className="bg-primary text-white px-5 py-2 te xt-sm rounded-lg font-semibold"
              >
                View Returned Orders
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/orders/cancelled"
                className="bg-primary text-white px-5 py-2 te xt-sm rounded-lg font-semibold"
              >
                View Cancelled Orders
              </Link>
            </div>
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
                  sl: i + 1 + 10 * (pageNumber! - 1),
                  id: item?._id,
                  orderId: item?.orderId,
                  quantity: item?.product?.length,
                  date: moment(item?.createdAt).format("llll"),
                  address: item?.location?.city,
                  payment: item?.paymentMode,
                  amount: item?.totalPrice,
                  status: item?.status,
                  delivery: item?.deliveryDate || "-",
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
              title: "Sl",
              field: "sl",
              editable: "never",
              width: "2%",
            },

            {
              title: "Order ID",
              tooltip: "Order ID",
              field: "orderId",
              editable: "never",
              width: "2%",
            },

            {
              title: "Qty",
              tooltip: "Qty",
              field: "quantity",
              editable: "never",
              width: "5%",
            },
            {
              title: "Purchase Date",
              tooltip: "Purchase Date",
              field: "date",
              editable: "never",
              width: "10%",
            },
            {
              title: "Billing Address",
              tooltip: "Billing Address",
              field: "address",
              editable: "never",
              width: "10%",
            },
            {
              title: "Payment Mode",
              tooltip: "paymentMode",
              field: "payment",
              editable: "never",
              width: "10%",
            },
            {
              title: "Amount",
              tooltip: "Amount",
              field: "amount",
              editable: "never",
              width: "8%",
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              editable: "never",
              width: "10%",
            },
            {
              title: "Delivery Date",
              tooltip: "Delivery Date",
              field: "delivery",
              editable: "never",
              // width: "10%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <p>{moment(item?.delivery).format("DD-MM-YYYY")}</p>
                  </div>
                  <BiPencil
                    onClick={() => {
                      setOpenDialog(true), setSelectObj(item);
                    }}
                    className="text-2xl text-green-500 cursor-pointer "
                  />
                </div>
              ),
            },

            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "10%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <Link href={`/admin/orders/${item?.id}`}>
                    <Edit />
                  </Link>
                  {/* <p>
                    <MdDelete
                      title="Delete"
                      className="text-xl text-red-500  cursor-pointer"
                    />
                  </p> */}
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default AllOrders;
