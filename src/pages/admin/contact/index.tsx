import { ContactReplyModal } from "@/components/forms";
import { useAuth, useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdDelete, MdReply } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Contact = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const { user } = useAuth();
  const [value, setValue] = useState<any>();
  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(`contact`);
  const [open, setOpen] = useState(false);

  const handleContact = async (id: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover it again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: "Yes, delete it!",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`contact/${id}`, {
          method: "DELETE",
          isAlert: true,
        });
        if (res?.status === 200) {
          toast.success(res?.results?.msg);
          mutate();
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };

  return (
    <AdminLayout title="Contact Us| Shree Odisha Handloom">
      <ContactReplyModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        item={value}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Contact List
        </p>
        <div className="w-full flex items-center  justify-between">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchContact"
              placeholder="Search Contact..."
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
            data
              ? data?.map((item: any, i: number) => ({
                  ...item,
                  sl: i + 1,
                  id: item?._id,
                  image: item?.image,
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
              title: "#",
              field: "sl",
              editable: "never",
              width: "10%",
            },
            {
              title: "Name",
              tooltip: "Name",
              field: "name",
              editable: "never",
              width: "20%",
            },
            {
              title: "Email",
              tooltip: "Email",
              field: "email",
              width: "20%",
            },
            {
              title: "Query",
              tooltip: "Query",
              field: "query",
              width: "30%",
            },

            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "20%",
              render: (item: any) => (
                <div className="flex items-center gap-3">
                  <p
                    onClick={() => {
                      setOpen(true), setValue(item);
                    }}
                  >
                    <MdReply
                      className="text-xl text-blue-500  cursor-pointer"
                      title="reply"
                    />
                  </p>
                  <p onClick={() => handleContact(item?.id)}>
                    <MdDelete
                      className="text-xl text-red-500  cursor-pointer"
                      title="Delete"
                    />
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

export default Contact;
