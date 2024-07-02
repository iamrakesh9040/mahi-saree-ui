import { Button, CustomLoader } from "@/core";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { Delete } from "@mui/icons-material";
import moment from "moment";
import { MdNotificationsActive } from "react-icons/md";
import Swal from "sweetalert2";

interface HeadingWithButtonProps {
  buttonText: string;
  onButtonClick: () => void;
}

const NotificationPage: React.FC<HeadingWithButtonProps> = () => {
  const { data, isValidating, mutate } = useSwr(`notification/admin`);
  const { mutation, isLoading } = useMutation();

  const handleIsRead = async (id: any) => {
    try {
      const res = await mutation(`notification/${id}`, {
        method: "PUT",
      });
      if (res?.status === 200) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(`notification/${id}`, {
            method: "DELETE",
          });
          if (res?.results?.success) {
            Swal.fire({
              title: "Success",
              text: `Notification successfully deleted!`,
              icon: "success",
            });
            mutate();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete all the notifications!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(`notification/admin-delete-all`, {
            method: "DELETE",
          });
          if (res?.results?.success) {
            Swal.fire({
              title: "Success",
              text: `Notifications Deleted Successfully!`,
              icon: "success",
            });
            mutate();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadAll = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to read all the notifications!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, read it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(`notification/admin-read-all`, {
            method: "PUT",
          });
          if (res?.status === 200) {
            Swal.fire({
              title: "Success",
              text: `Notifications successfully read!`,
              icon: "success",
            });
            mutate();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title="Notification| Shree Odisha Handloom">
      <div className="relative  w-full p-5 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <h3 className="flex gap-3 items-center ">
            <span className="text-secondary/90">
              <MdNotificationsActive size={28} />
            </span>
            <span className="sub-title">All Notifications</span>
          </h3>
          <span className="flex items-center gap-3">
            <Button
              disabled={data?.length === undefined || data?.length === 0}
              className="px-4 py-2  rounded duration-500"
              onClick={handleReadAll}
            >
              Read All
            </Button>
            <Button
              className="px-4 py-2 btn-secondary rounded duration-500"
              onClick={handleDeleteAll}
              disabled={data?.length === undefined || data?.length === 0}
            >
              Delete All
            </Button>
          </span>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          {isLoading && <CustomLoader />}
        </div>
        {isValidating ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.length > 0 ? (
              data?.map((items: any) => (
                <aside
                  key={items?.id}
                  onClick={() => {
                    if (items?.isRead === false) {
                      handleIsRead(items?._id);
                    }
                  }}
                  className={`flex border justify-between cursor-pointer items-center p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ${
                    items?.isRead ? "bg-white" : "bg-slate-100"
                  } hover:shadow-[0px_0px_7px_1px_#00000024] duration-500 rounded-md group space-x-2`}
                >
                  <article className="flex gap-4 justify-between  items-center w-full">
                    <span className="flex flex-col gap-1">
                      <p className="font-medium">{items.message}</p>
                      <p className=" text-xs text-gray-700">
                        {moment(items.createdAt).format("llll")}
                      </p>
                    </span>

                    <Delete
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(items?._id);
                      }}
                      className="text-red-500 group-hover:text-red-600 duration-200"
                    />
                  </article>
                </aside>
              ))
            ) : (
              <div className="w-full h-full lg:col-span-4 2xl:col-span-4 col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-3 flex-col">
                  <img
                    src="/empty.png"
                    className="w-full h-full rounded-xl"
                    alt=""
                  />
                  <p className="text-xl font-semibold text-gray-800">
                    Notification Not Available
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NotificationPage;

const NotificationSkeleton = () => (
  <div className="mb-4 bg-gray-200 rounded-md p-4 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <p className="h-4 w-24 bg-gray-300 rounded"></p>
        <p className="mt-2 h-3 w-48 bg-gray-300 rounded"></p>
      </div>
      <div className="mt-2 h-8 w-16 bg-gray-300 rounded"></div>
    </div>
  </div>
);
