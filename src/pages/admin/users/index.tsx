/* eslint-disable @next/next/no-img-element */
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Pagination, Paper, Switch, Tooltip } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdGroups2, MdTableRows } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { PiCardsBold } from "react-icons/pi";
import { EmailOutlined } from "@mui/icons-material";
import UserInfoDrawer from "@/components/drawer/UserInfoDrawer";

const Customers = () => {
  const [details, setDetails] = useState();
  const [openDetails, setOpenDetails] = useState(false);
  const [view, setView] = useState("Table");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const { mutation, isLoading } = useMutation();

  const {
    data: userData,
    isValidating,
    mutate: userMutate,
    pagination,
  } = useSwr(`user/order-count`);

  const isAdmin = userData?.role === "ADMIN";

  const userBlocked = async (id: string, blocked: boolean) => {
    await Swal.fire({
      title: "Are you sure?",
      text: `You want to  ${blocked ? "unblock" : "block"} user ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: `Yes, ${blocked ? "Unblock" : "Block"}`,
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`user/update/${id}`, {
          method: "PUT",
          isAlert: true,
          body: {
            isBlocked: blocked ? false : true,
          },
        });
        if (res?.status === 200) {
          userMutate();
          toast.success(`${blocked ? "Unblocked" : "Blocked"} Successful`);
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };

  return (
    <>
      <AdminLayout title="Customers | Shree Odisha Handloom">
        {/* <UserUpdate
          openDialog={open}
          setOpenDialog={setOpen}
          mutate={mutate}
          value={value}
        /> */}
        <UserInfoDrawer
          open={openDetails}
          onClose={() => setOpenDetails(false)}
          item={details}
        />
        <div className="w-full flex items-center justify-between px-4 py-4">
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
          <div className="flex items-center gap-4">
            <p
              onClick={() => setView("Card")}
              className={`text-2xl cursor-pointer text-gray-700 ${
                view === "Card"
                  ? ` bg-primary/10 p-1 rounded-md text-secondary duration-200 transition-all`
                  : `hover:text-primary`
              } `}
            >
              <PiCardsBold />
            </p>
            <p
              onClick={() => setView("Table")}
              className={`text-2xl cursor-pointer text-gray-700 ${
                view === "Table"
                  ? ` bg-primary/10 p-1 rounded-md text-secondary duration-200 transition-all`
                  : `hover:text-primary`
              } `}
            >
              <MdTableRows />
            </p>
          </div>
        </div>
        {view === "Card" ? (
          <div className="w-full flex flex-col gap-10">
            <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 items-center gap-4 p-4">
              {userData?.map((item: any, i: number) => (
                <UserCardView item={item} mutate={userMutate} key={i} />
              ))}
            </div>
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
          </div>
        ) : (
          <div className="px-4 py-4 h-full overflow-y-auto">
            <MaterialTable
              title={
                <>
                  <div
                    className={`md:text-lg text-xs font-bold text-primary md:flex  hidden gap-3 items-center }`}
                  >
                    <div className=" flex items-center gap-3">
                      <MdGroups2 />
                      <p>All Customers Details</p>
                    </div>
                  </div>
                </>
              }
              isLoading={isLoading || isValidating}
              components={{
                Container: (props) => (
                  <Paper {...props} className="!shadow-none" />
                ),
                // OverlayLoading: () => <CustomLoader />,
              }}
              data={
                userData
                  ? userData?.map((item: any) => ({
                      ...item,
                      sl: userData?.indexOf(item) + 1,
                      id: item?._id,
                      name: item?.name,
                      email: item?.email,
                      mobileNo: item?.phone,
                      image: item?.image,
                      role: item?.role,
                      orderCount: item?.orderCount
                        ? item?.orderCount
                        : "No Orders Yet",
                      isBlocked: item?.isBlocked,
                      createdAt: item?.createdAt
                        ? moment(item?.createdAt).format("DD-MM-YYYY")
                        : "",
                    }))
                  : []
              }
              options={{
                ...MuiTblOptions(),
                search: false,
                exportMenu: [],
              }}
              columns={[
                {
                  title: "Sl No",
                  field: "sl",
                  editable: "never",
                  width: "2%",
                },
                {
                  title: "Name",
                  tooltip: "User Details",
                  field: "name",
                  editable: "never",
                  width: "40%",
                  render: (rowData) => (
                    <div className="flex items-center gap-2">
                      <img
                        src={rowData.avatar || "/user.png"}
                        alt="userImage"
                        className="w-16 h-16 rounded-full "
                      />

                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-semibold text-gray-900">
                          {rowData.name}
                        </p>
                        <p className="text-sm  text-gray-500">
                          {rowData.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {rowData.mobileNo}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Role",
                  tooltip: "role",
                  field: "role",
                  editable: "never",
                  width: "2%",
                  render: (rowData) => (
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {rowData.role}
                    </p>
                  ),
                },
                {
                  title: "Status",
                  tooltip: "status",
                  field: "status",
                  editable: "never",
                  width: "2%",
                  render: (item: any) => {
                    return (
                      <>
                        <div className="flex gap-3">
                          <Tooltip
                            title={
                              item?.isBlocked !== true ? "ACTIVE" : "BLOCKED"
                            }
                          >
                            <Switch
                              checked={!item?.isBlocked}
                              onChange={(e) =>
                                userBlocked(item?.id, item?.isBlocked)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </Tooltip>
                        </div>
                      </>
                    );
                  },
                },
                {
                  title: "No Of Orders",
                  tooltip: "No Of Orders",
                  field: "orderCount",
                  editable: "never",
                  width: "5%",
                },
                {
                  title: "Created At",
                  tooltip: "Created At",
                  field: "createdAt",
                  editable: "never",
                  width: "5%",
                },
                {
                  title: "Details",
                  tooltip: "Details",
                  field: "details",
                  editable: "never",
                  width: "2%",
                  render: (item) => (
                    <div
                      onClick={() => {
                        setDetails(item);
                        setOpenDetails(true);
                      }}
                      className="flex gap-3"
                    >
                      {" "}
                      <FaEye className=" text-xl text-primary cursor-pointer" />
                    </div>
                  ),
                },

                // {
                //   title: "Action",
                //   tooltip: "Action",
                //   field: "action",
                //   editable: "never",
                //   width: "2%",
                //   render: (item) => (
                //     <div className="flex gap-3">
                //       <div>
                //         <MdDelete className="text-xl text-red-500 cursor-pointer" />
                //       </div>
                //       {/* <div>
                //         <MdEdit
                //           onClick={() => {
                //             setOpen(true);
                //             setValue(item);
                //           }}
                //           className="text-xl text-red-500 cursor-pointer"
                //         />
                //       </div> */}
                //     </div>
                //   ),
                // },
              ]}
            />
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Customers;

const UserCardView = ({ item, mutate }: { item: any; mutate: () => void }) => {
  const { mutation, isLoading } = useMutation();
  const userBlocked = async (id: string, blocked: boolean) => {
    await Swal.fire({
      title: "Are you sure?",
      text: `You want to  ${blocked ? "unblock" : "block"} user ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: `Yes, ${blocked ? "Unblock" : "Block"}`,
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`user/update/${id}`, {
          method: "PUT",
          isAlert: true,
          body: {
            isBlocked: blocked ? false : true,
          },
        });
        if (res?.status === 200) {
          mutate();
          toast.success(`${blocked ? "Unblocked" : "Blocked"} Successful`);
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };
  return (
    <>
      {/* <ProductInfoDrawer
        open={productDetails}
        onClose={() => setProductDetails(false)}
        item={value}
      /> */}
      <div
        className="relative h-full group overflow-hidden w-full flex flex-col gap-4 justify-between items-center bg-white shadow-[0px_0px_4px_0px_#00000024] rounded-lg px-2 py-3"
        key={item?._id}
      >
        <p>
          <span className="absolute z-10 top-2 left-2 text-sm bg-green-500/50 border-2 font-medium px-2.5 py-1 rounded-md border-green-700 capitalize">
            {item?.isOnline ? "Online" : "Offline"}
          </span>
        </p>
        {/* <div>
          <p
            onClick={() => {
              setProductDetails(true);
              setValue(item);
            }}
            className="absolute z-10 top-12  right-2   duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-blue-600 bg-opacity-60"
          >
            <AiFillEye className="hover:scale-125 duration-200 text-white" />
          </p>
        </div> */}
        <div className=" absolute z-10 top-1 right-2 flex gap-3">
          <Tooltip title={item?.isBlocked !== true ? "ACTIVE" : "BLOCKED"}>
            <Switch
              checked={!item?.isBlocked}
              onChange={(e) => userBlocked(item?._id, item?.isBlocked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Tooltip>
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <div>
            <img
              src={item?.avatar || "/user.png"}
              className="w-24 h-24 rounded-full cursor-pointer group-hover:scale-105 duration-300 "
              alt=""
            />
          </div>
          <div className="flex w-full flex-col gap-3 p-3">
            <div className="flex flex-col w-full justify-center items-center gap-0.5">
              <div className="flex md:flex-row flex-col md:items-center items-center justify-center">
                <p className=" text-gray-800 font-semibold text-2xl ">
                  {item?.name}
                </p>
              </div>
              <p className="flex items-center justify-center gap-1">
                <EmailOutlined className=" text-primary/80 font-medium text-lg" />
                <span className="text-sm text-primary/80">{item?.email}</span>
              </p>
              <p className="text-sm text-gray-800">{item?.phone}</p>
            </div>
            <div className="flex justify-between w-full flex-col bg-primary/10 gap-2 items-center p-2 rounded-lg">
              <p className="flex items-center justify-between gap-4 text-xs">
                <span className=" text-gray-800 font-semibold capitalize  border-dashed border-primary border-r-2 pr-2">
                  {item?.gender}
                </span>
                <span className="text-gray-800 font-semibold">
                  {item?.role}
                </span>
              </p>
              <p className="flex items-center justify-between gap-2 text-xs bg-primary/90 p-3 rounded-full">
                <p className="text-white font-semibold">No of Orders : </p>
                <span className="text-white font-semibold text-xs">
                  {item?.orderCount ? item?.orderCount : "Not Provided"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
