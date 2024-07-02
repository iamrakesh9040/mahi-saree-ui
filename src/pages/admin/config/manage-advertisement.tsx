import { AlertCreateModal, EditAlertModal } from "@/components/site-setting";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper, Switch, Tooltip } from "@mui/material";
import { useDeferredValue, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageAdvertisement = () => {
  const [view, setView] = useState("Table");
  const [open, setOpen] = useState<any>();
  const [alertOpen, setAlertOpen] = useState<any>();
  const [editAlert, setEditAlert] = useState<any>();
  const [alert, setAlert] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const query = useDeferredValue(searchText);
  let url = `Title?sortBy=desc&page=${pageNumber}&limit=10`;
  searchText && (url += `&search=${query}`);

  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(`alert`);

  const allowToPost = async (id: string) => {
    try {
      const res = await mutation(`alert/${id}`, {
        method: "PUT",
        isAlert: true,
        body: {
          show: true,
        },
      });
      if (res?.status === 200) {
        mutate && mutate();
        toast.success("Alert Added Successfully");
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };

  return (
    <AdminLayout title="Advertisement | Shree Odisha Handloom">
      <AlertCreateModal
        openDialog={alertOpen}
        setOpenDialog={setAlertOpen}
        mutate={mutate}
        item={alert}
      />
      <EditAlertModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        item={editAlert}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Advertisement List
        </p>
        <div className="w-full flex lg:items-center  lg:justify-between lg:flex-row flex-col gap-2">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchTitle"
              placeholder="Search Title..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
          <div
            onClick={() => setAlertOpen(true)}
            className="bg-primary rounded-md"
          >
            <button className="py-2 px-4 text-white">Create Alert</button>
          </div>
        </div>

        <MaterialTable
          isLoading={isValidating || isLoading}
          components={{
            Container: (props: any) => (
              <Paper {...props} className="!shadow-none" />
            ),
          }}
          data={
            data?.length >= 0
              ? data?.map((item: any, i: number) => ({
                  sl: i + 1,
                  id: item?._id,
                  title: item?.title,
                  show: item?.show,
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
              width: "5%",
            },

            {
              title: "Title",
              tooltip: "Title",
              field: "title",
              width: "80%",
            },

            {
              title: "Status",
              tooltip: "status",
              field: "status",
              editable: "never",
              width: "15%",
              render: (row: any) => (
                <div className="flex gap-2 items-center">
                  <div onClick={() => allowToPost(row?.id)}>
                    <Switch checked={row?.show} />
                  </div>
                  <p
                    onClick={() => {
                      setOpen(true);
                      setEditAlert(row);
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

export default ManageAdvertisement;
