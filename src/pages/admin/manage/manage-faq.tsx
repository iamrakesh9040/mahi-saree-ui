import AddFAQDrawer from "@/components/drawer/AddFAQDrawer";
import EditFAQDrawer from "@/components/drawer/EditFAQDrawer";
import FAQInfoDrawer from "@/components/drawer/FAQInfoDrawer";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageFAQ = () => {
  const [value, setValue] = useState<any>();
  const [editFaq, setEditFaq] = useState(false);
  const [createFaq, setCreateFaq] = useState(false);
  const [FaqDetails, setFaqDetails] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(`faq`);

  const handelDeleteFaq = async (id: string) => {
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
        const res = await mutation(`faq/${id}`, {
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
    <AdminLayout title="FAQ | Shree Odisha Handloom">
      <AddFAQDrawer
        open={createFaq}
        onClose={() => setCreateFaq(false)}
        mutate={mutate}
      />
      <EditFAQDrawer
        open={editFaq}
        onClose={() => setEditFaq(false)}
        mutate={mutate}
        item={value}
      />
      <FAQInfoDrawer
        open={FaqDetails}
        onClose={() => setFaqDetails(false)}
        mutate={mutate}
        item={value}
      />
      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          FAQ List
        </p>
        <div className="w-full flex lg:items-center  lg:justify-between lg:flex-row flex-col gap-4">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchFAQ"
              placeholder="Search  FAQ..."
              className=" bg-transparent text-gray-500 font-normal p-2 outline-none placeholder:text-gray-300 w-full placeholder:font-normal placeholder:text-sm"
            />
          </div>
          <div
            onClick={() => setCreateFaq(true)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="bg-primary text-white px-5 py-2 text-sm rounded-lg font-semibold">
              Add FAQ
            </div>
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
          data={data?.map((item: any, i: number) => ({
            ...item,
            sl: i + 1,
            // id: item?._id,
            // question: item?.question,
            // answer: item?.answer,
          }))}
          options={{
            ...MuiTblOptions(),
            search: false,
            exportMenu: [],
            toolbar: false,
            pageSize: 10,
          }}
          // detailPanel={[
          //   {
          //     tooltip: "View Variant",
          //     icon: () => (
          //       <MdOutlineAddToPhotos className="!text-details !text-xl" />
          //     ),
          //     // openIcon: () => <Visibility />,
          //     render: ({ rowData }) => {
          //       return <VariantTable FaqData={rowData} />;
          //     },
          //   },
          // ]}
          columns={[
            {
              title: "Sl No",
              field: "sl",
              editable: "never",
              width: "10%",
            },
            {
              title: "Question",
              tooltip: "Question",
              field: "question",
              width: "30%",
            },
            {
              title: "Answer",
              tooltip: "Answer",
              field: "answer",
              width: "40%",
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
                      setEditFaq(true);
                      setValue(item);
                    }}
                  >
                    <MdEdit className="text-xl text-gray-800  cursor-pointer" />
                  </p>
                  <p
                    onClick={() => {
                      setFaqDetails(true);
                      setValue(item);
                    }}
                  >
                    <BsEye className="text-xl text-gray-500  cursor-pointer" />
                  </p>
                  <p onClick={() => handelDeleteFaq(item?.id)}>
                    <MdDelete className="text-xl text-red-500  cursor-pointer" />
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

export default ManageFAQ;
