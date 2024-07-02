/* eslint-disable @next/next/no-img-element */
import { Button } from "@/core";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Admin = () => {
  const { data, error, isValidating, mutate } = useSwr(`info`);
  const { mutation, isLoading } = useMutation();
  const { data: recentProducts, mutate: mutateRecentProducts } =
    useSwr(`order/recent-orders`);

  const FIRST_ARR = [
    {
      id: "1",
      name: "Today Orders",
      totalVisit: data?.todayOrder?.todayOrders,
      percentage: Math.round(data?.todayOrder?.todayPercentage || 0),
      link: "/admin/orders",
      image: "/received.png",
    },
    {
      id: "2",
      name: "Last Week",
      totalVisit: data?.lastWeek?.lastWeekOrders,
      percentage: Math.round(data?.lastWeek?.lastWeekPercentage ?? 0),
      link: "/admin/orders",
      image: "/growth.png",
    },
    {
      id: "3",
      name: "Last 30 Days",
      totalVisit: data?.lastMonth?.lastMonthOrders,
      percentage: Math.round(data?.lastMonth?.lastMonthPercentage || 0),
      link: "/admin/orders",
      image: "/growth.png",
    },
    {
      id: "4",
      name: "Total Orders",
      totalVisit: data?.totalOrder?.totalOrder,
      percentage: Math.round(data?.totalOrder?.totalPercentage ?? 0),
      link: "/admin/orders",
      image: "/box.png",
    },
  ];

  const SECOND_ARR = [
    {
      id: "1",
      name: "Total Products",
      total: data?.product?.totalProduct,
      percentage: Math.round(data?.product?.percentage ?? 0),
      link: "/admin/products/manage-product",
      type: "Today Products",
    },
    {
      id: "2",
      name: "Total Contact",
      total: data?.contact?.totalContact,
      percentage: Math.round(data?.contact?.percentage ?? 0),
      link: "/admin/contact",
      type: "Total Contact",
    },
    {
      id: "3",
      name: "Total Reviews",
      total: data?.reviews?.totalReviews,
      percentage: Math.round(data?.reviews?.percentage ?? 0),
      link: "/admin/orders",
      type: "Total Reviews",
    },
    {
      id: "4",
      name: "Total Support",
      total: data?.support?.totalSupport,
      percentage: data?.support?.percentage,
      link: "/admin/support",
      type: "Today Products",
    },
    // {
    //   id: "5",
    //   name: "Total Category",
    //   total: "1",
    //   percentage: "1",
    //   type: "Total Category",
    // },
    // {
    //   id: "6",
    //   name: "Total Coupons",
    //   total: "1",
    //   percentage: "1",
    //   type: "Total Coupons",
    // },
    // {
    //   id: "7",
    //   name: "Total Returned Order",
    //   total: "1",
    //   percentage: "1",
    //   type: "Total Returned Order",
    // },
    // {
    //   id: "8",
    //   name: "Total Cancelled Order",
    //   total: "1",
    //   percentage: "1",
    //   type: "Total Cancelled Order",
    // },
  ];

  function greet() {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return "Good Morning !";
    } else if (currentHour < 18) {
      return "Good Afternoon !";
    } else {
      return "Good Evening !";
    }
  }

  return (
    <AdminLayout title="Dashboard | Shree Odisha Handloom">
      <section className="w-full h-full flex flex-col gap-5 px-10 py-5">
        <div className="w-full flex md:flex-row flex-col h-fit  gap-5">
          <div className="w-full h-full  bg-white rounded-lg shadow-[0px_0px_3px_0.1px_#00000024] flex flex-col gap-4 px-5 py-5">
            <p className="flex flex-col gap-2">
              <span className=" text-gray-900 font-medium ">
                {greet()} Shree Odisha Handloom Admin!
              </span>
              <span className="text-sm text-gray-500">{`Here’s what happening with your store today!`}</span>
            </p>
            <div className="w-full lg:flex lg:justify-between lg:items-center lg:flex-row flex-col">
              <div className="flex flex-col gap-5">
                <p className="flex flex-col gap-1">
                  <span className=" text-2xl font-semibold text-gray-700">
                    {data?.todayOrder?.todayAmount}
                  </span>
                  <span className=" text-sm text-gray-500">{`Today’s Order Amount`}</span>
                </p>
                <p className=" flex flex-col gap-1">
                  <span className=" text-2xl font-semibold text-gray-700">
                    {data?.totalOrder?.totalAmount}
                  </span>
                  <span className=" text-sm text-gray-500">
                    Total Order Amount
                  </span>
                </p>
              </div>
              <img src="/welcome.svg" className=" h-fit w-38" alt="" />
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-2 gap-5">
            {FIRST_ARR.map((item) => {
              return (
                <div key={item?.id} className="">
                  <Link
                    href={item?.link}
                    className="relative px-4 py-5 w-full h-full bg-white rounded-lg shadow-[0px_0px_3px_0.1px_#00000024] flex flex-col justify-between cursor-pointer"
                  >
                    <div className="absolute hidden   top-3 right-3 w-14 h-14 p-3 rounded-xl bg-gray-100 lg:flex items-center justify-center">
                      <img
                        src={item?.image}
                        className="w-full h-full object-contain"
                        alt=""
                      />
                    </div>

                    <span className="font-medium text-gray-400">
                      {item?.name}
                    </span>
                    <span className="font-semibold text-gray-700 text-2xl">
                      {item?.totalVisit}
                    </span>
                    <p className="w-full flex lg:flex-row flex-col  lg:items-center justify-between">
                      <span className="font-medium text-gray-400 text-sm">
                        Total Percent
                      </span>
                      <span className="text-sm text-blue-500">
                        {item?.percentage}%
                      </span>
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {SECOND_ARR.map((item) => {
            return (
              <div key={item?.id} className="">
                <Link
                  href={item?.link}
                  className=" relative px-4 py-5 w-full h-full bg-white rounded-lg shadow-[0px_0px_3px_0.1px_#00000024] flex flex-col justify-between gap-3"
                >
                  <div className="absolute top-8 right-3 lg:w-20 lg:h-20 md:w-16 md:h-16 w-16 h-16  flex items-center justify-center">
                    <CircularProgressbar
                      maxValue={100}
                      value={item?.percentage === 0 ? 1 : item.percentage}
                      text={`${item?.percentage === 0 ? 1 : item.percentage} %`}
                    />
                  </div>

                  <span className="font-medium text-gray-400">
                    {item?.name}
                  </span>
                  <span className="font-semibold text-gray-700 text-2xl">
                    {item?.total}
                  </span>
                  <p className="w-full flex items-center justify-between">
                    <span className="font-medium text-gray-400 text-sm">
                      {item?.type}
                    </span>
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-full  h-fit">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-2xl font-medium text-black">Recent Orders</h1>
            <MaterialTable
              isLoading={isValidating || isLoading}
              components={{
                Container: (props: any) => (
                  <Paper {...props} className="!shadow-none" />
                ),
                // OverlayLoading: () => <CustomLoader />,
                // Pagination: (props) => {
                //   return (
                //     <div className="w-full flex items-center justify-center py-4">
                //       <Pagination
                //         count={Math.ceil(
                //           Number(pagination?.totalCount || 1) /
                //             Number(pagination?.limit || 1)
                //         )}
                //         onChange={(e, v: number) => setPageNumber(v)}
                //         variant="outlined"
                //         color="primary"
                //         page={pageNumber}
                //       />
                //     </div>
                //   );
                // },
              }}
              data={
                recentProducts?.length >= 0
                  ? recentProducts?.map((item: any, i: number) => ({
                      ...item,
                      sl: i + 1,
                      id: item?._id,
                      orderId: item?.orderId,
                      quantity: item?.totalProduct ? item?.totalProduct : 0,
                      status: item?.status,
                      totalAmount: item?.totalPrice,
                      address: item?.location?.city,
                      payment: item?.paymentMode,
                      date: moment(item?.createdAt).format("DD-MM-YYYY"),
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
                  title: "Qty",
                  tooltip: "Qty",
                  field: "quantity",
                  editable: "never",
                  width: "3%",
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
                  title: "Mode of Payment",
                  tooltip: "paymentMode",
                  field: "payment",
                  editable: "never",
                  width: "5%",
                },
                {
                  title: "Amount",
                  tooltip: "Amount",
                  field: "totalAmount",
                  editable: "never",
                  width: "5%",
                },
                {
                  title: "Status",
                  tooltip: "Status",
                  field: "status",
                  editable: "never",
                  width: "5%",
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
                        <Button className="text-gray-500 cursor-pointer">
                          View
                        </Button>
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Admin;
