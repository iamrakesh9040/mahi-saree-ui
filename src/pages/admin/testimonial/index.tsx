import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Testimonial = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { data, pagination, mutate, isValidating } = useSwr(`testimonial`);
  const { mutation, isLoading } = useMutation();
  return (
    <AdminLayout title="Testimonial | Shree Odisha Handloom">
      <section className="w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Testimonial
        </p>
        <div className="w-full flex items-center  justify-between">
          <div className=" relative w-[20rem] flex items-center gap-2 bg-white rounded-md px-3">
            <IoMdSearch className="text-gray-400 text-xl " />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              type="text"
              name="searchTestimonial"
              placeholder="Search Testimonial..."
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
          }}
          data={[]}
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
          //       return <VariantTable productData={rowData} />;
          //     },
          //   },
          // ]}
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
              width: "20%",
            },

            {
              title: "Action",
              tooltip: "Action",
              field: "action",
              editable: "never",
              width: "20%",
            },
          ]}
        />
      </section>
    </AdminLayout>
  );
};

export default Testimonial;
