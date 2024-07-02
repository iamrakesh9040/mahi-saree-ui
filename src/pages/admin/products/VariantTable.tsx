// import { AddVariantDrawer, ProductInfoDrawer } from "@/components";
import AddProductImageDrawer from "@/components/drawer/AddProductImageDrawer";
import EditProductDrawer from "@/components/drawer/EditProductDrawer";
import ProductInfoDrawer from "@/components/drawer/ProductInfoDrawer";
import { AddVariantModal } from "@/components/products";
import { useAuth, useMutation, useSwr } from "@/hooks";
import { sweetAlertCustomStyles, sweetAlertStyles } from "@/utils";
import errorHelper from "@/utils/error";
import MaterialTable from "@material-table/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdDelete, MdEdit, MdOutlineAddPhotoAlternate } from "react-icons/md";
import Swal from "sweetalert2";

const VariantTable = ({ productData }: any) => {
  const [view, setView] = useState("Table");
  const [value, setValue] = useState<any>();
  const [editProduct, setEditProduct] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [deleteVariant, setDeleteVariant] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [addMultipleImageDrawer, setAddMultipleImageDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddVariantDrawer, setOpenAddVariantDrawer] = useState(false);
  const { push } = useRouter();
  const { user } = useAuth();
  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(
    `product/all-variant/${productData?.id}`
  );

  const handelDeleteVariant = async (id: string) => {
    try {
      Swal.fire({
        title: "Warning?",
        text: `Are you sure you want to remove this category?`,
        icon: "warning",
        iconColor: "#FF4D49",
        confirmButtonColor: "#FF4D49",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        customClass: sweetAlertStyles,
        backdrop: sweetAlertCustomStyles,
      }).then(async (result) => {
        if (result?.isConfirmed) {
          setDeleteVariant(true);
          const res = await mutation(`product/${id}`, {
            method: "DELETE",
            isAlert: true,
          });
          setDeleteVariant(false);
          if (res?.results?.success) {
            mutate();
          }
        }
      });
    } catch (error) {
      errorHelper(error);
    }
  };

  const tableColumns = [
    {
      title: "Sl",
      field: "sl",
      width: "1%",
    },
    {
      title: "Image",
      field: "images",
      render: (item: any) => (
        <img
          src={item?.images?.[0]?.imageUrl}
          className="w-14 h-14 rounded-full"
          alt=""
        />
      ),
    },
    {
      title: "Name",
      field: "name",
      width: "15%",
    },
    {
      title: "Categories",
      field: "category",
      width: "10%",
      render: (item: any) => {
        return <div className=" capitalize">{item?.category}</div>;
      },
    },
    {
      title: "Stock",
      field: "stocks",
      width: "5%",
    },
    {
      title: "Color",
      field: "colorName",
      render: (item: any) => {
        return <div>{item?.colorName}</div>;
      },
      width: "10%",
    },
    {
      title: "MRP",
      field: "mrp",
      width: "10%",
    },
    {
      title: "Sale Price",
      field: "price",
      width: "20%",
    },
    {
      title: "Actions",
      headerStyle: {
        textAlign: "center" as const,
      },
      export: false,
      width: "20%",
      // field: "pick",
      render: (item: any) => (
        <>
          {/* <Tooltip title="View Details"> */}
          <div className="flex items-center gap-2">
            <p
              onClick={() => {
                setAddMultipleImageDrawer(true), setValue(item);
              }}
              className="!cursor-pointer !text-details !text-xl !bg-white "
            >
              <MdOutlineAddPhotoAlternate className="!p-0" />
            </p>
            <p
              onClick={() => {
                setEditProduct(true);
                setValue(item);
              }}
            >
              <MdEdit className="text-xl text-gray-800  cursor-pointer" />
            </p>
            <p
              onClick={() => {
                setProductDetails(true);
                setValue(item);
              }}
            >
              <BsEye className="text-xl text-gray-500  cursor-pointer" />
            </p>
            <p onClick={() => handelDeleteVariant(item?.id)}>
              <MdDelete className="text-xl text-red-500  cursor-pointer" />
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="px-2">
      <div className="flex justify-end p-2.5 my-3">
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white py-1 px-4 rounded-md"
        >
          Add Variant
        </button>
      </div>
      <AddVariantModal
        openDialog={open}
        setOpenDialog={setOpen}
        mutate={mutate}
        productData={productData}
      />
      <AddProductImageDrawer
        open={addMultipleImageDrawer}
        onClose={() => setAddMultipleImageDrawer(false)}
        item={value}
        mutate={mutate}
      />
      <EditProductDrawer
        open={editProduct}
        onClose={() => setEditProduct(false)}
        item={value}
        mutate={mutate}
      />
      <ProductInfoDrawer
        open={productDetails}
        onClose={() => setProductDetails(false)}
        item={value}
      />
      <MaterialTable
        isLoading={isValidating || isLoading}
        columns={tableColumns}
        data={
          data
            ? data?.map((item: any, i: number) => ({
                sl: i + 1,
                id: item?._id,
                name: item?.name,
                isVariant: item?.isVariant,
                description: item?.description,
                category: item?.category?.name,
                categoryId: item?.category?._id,
                color: item?.color?._id,
                colorName: item?.color?.name,
                type: item?.type,
                mrp: item?.mrp,
                price: item?.price,
                images: item?.images,
                stocks: item?.stocks,
                isPublished: item?.isPublished,
                size: item?.size,
              }))
            : []
        }
        options={{
          sorting: true,
          search: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          headerStyle: {
            color: "#ffffff",
            backgroundColor: "#6b7280",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          },
        }}
        title={
          <div className="text-lg font-bold text-primary">
            {/* Manage Support */}
          </div>
        }
      />
    </div>
  );
};

export default VariantTable;
