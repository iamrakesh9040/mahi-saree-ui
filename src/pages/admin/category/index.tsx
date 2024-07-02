import { CategoryCreate } from "@/components/forms";
import { CustomLoader } from "@/core";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { MdGroups2, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
const Category = () => {
  const { data, isValidating, mutate, pagination } = useSwr(`category`);
  const { mutation, isLoading } = useMutation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const [editOpen, setEditOpen] = useState(false);

  const deleteOperation = async (id: string) => {
    try {
      const res = await mutation(`category/${id}`, {
        method: "DELETE",
        isAlert: true,
      });
      if (res?.status === 200) {
        toast.success(res?.results?.msg);
        mutate();
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error deleting category"
      );
    }
  };

  return (
    <>
      <AdminLayout>
        <CategoryCreate
          openDialog={open}
          setOpenDialog={setOpen}
          mutate={mutate}
        />
        <div className="px-4 py-4 h-full overflow-y-auto">
          <MaterialTable
            title={
              <>
                <div
                  className={`md:text-lg text-xs font-bold text-primary md:flex  hidden gap-3 items-center }`}
                >
                  <div className=" flex items-center gap-3">
                    <MdGroups2 />
                    <p>All Category Details</p>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className=" flex items-center gap-1 bg-primary px-2 py-1.5 rounded-md cursor-pointer"
                  >
                    <BiAddToQueue className=" text-white" />

                    <p className=" text-white text-sm font-medium tracking-wider">
                      Add Category
                    </p>
                  </div>
                </div>
              </>
            }
            isLoading={isValidating}
            components={{
              Container: (props) => (
                <Paper {...props} className="!shadow-none" />
              ),
              OverlayLoading: () => <CustomLoader />,
            }}
            data={
              data
                ? data?.map((item: any, i: number) => ({
                    ...item,
                    sl: i + 1,
                    id: item?._id,
                    category: item?.name,
                    catId: item?._id.slice(0, 7),
                    image: item?.image,
                    timestamp: moment(new Date(item?.createdAt)).format("lll"),
                  }))
                : []
            }
            options={{
              ...MuiTblOptions(),
              search: false,
              exportMenu: [],
              pageSize: 10,
            }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "1%",
              },

              {
                title: "Category Image",
                tooltip: "Category Image",
                field: "image",
                editable: "never",
                width: "5%",
                render: (item: any) => (
                  <div>
                    <img
                      src={item?.image || "/NotImage.jpg"}
                      alt="Category Image"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                ),
              },
              {
                title: "Category Name",
                tooltip: "Category Name",
                field: "category",
                editable: "never",
                render: (item: any) => (
                  <p className=" font-medium capitalize ">{item?.category}</p>
                ),
              },

              {
                title: "Category ID",
                tooltip: "Category Id",
                field: "catId",
                editable: "never",
              },
              {
                title: "Created At",
                tooltip: "Created At",
                field: "timestamp",
                editable: "never",
                width: "20%",
              },

              {
                title: "Action",
                tooltip: "Action",
                field: "action",
                editable: "never",
                width: "10%",
                render: (item) => (
                  <div className="flex items-center justify-center gap-5">
                    <p
                      onClick={() => {
                        setValue(item);
                        setEditOpen(true);
                      }}
                      className="text-2xl cursor-pointer text-gray-900 "
                    >
                      <BiEdit />
                    </p>
                    <p
                      onClick={() => deleteOperation(item?.id)}
                      className="text-2xl text-red-500  cursor-pointer"
                    >
                      <MdOutlineDelete />
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default Category;
