import AddProductImageDrawer from "@/components/drawer/AddProductImageDrawer";
import EditProductDrawer from "@/components/drawer/EditProductDrawer";
import ProductInfoDrawer from "@/components/drawer/ProductInfoDrawer";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { MuiTblOptions } from "@/utils";
import MaterialTable from "@material-table/core";
import { Pagination, Paper, Switch, Tooltip } from "@mui/material";
import Link from "next/link";
import { Fragment, useDeferredValue, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import {
  MdDelete,
  MdDeleteOutline,
  MdEdit,
  MdOutlineAddPhotoAlternate,
  MdOutlineAddToPhotos,
  MdStarBorder,
  MdTableRows,
} from "react-icons/md";
import { PiCardsBold } from "react-icons/pi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import VariantTable from "./VariantTable";
import { CustomLoader } from "@/core";

const ManageProduct = () => {
  const [view, setView] = useState("Table");
  const [value, setValue] = useState<any>();
  const [editProduct, setEditProduct] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [addMultipleImageDrawer, setAddMultipleImageDrawer] = useState(false);
  const query = useDeferredValue(searchText);
  let url = `product?sortBy="desc"&pageNumber=${pageNumber}&limit=10`;
  searchText && (url += `&search=${query}`);

  const { mutation, isLoading } = useMutation();
  const { data, pagination, mutate, isValidating } = useSwr(url);
  const handelDeleteProduct = async (id: string) => {
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
        const res = await mutation(`product/${id}`, {
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
    <AdminLayout title="Product List | Shree Odisha Handloom">
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

      <div className=" w-full p-5 flex flex-col gap-5">
        <p className="font-semibold tracking-wider text-xl text-gray-700">
          Product List
        </p>
        <div className="w-full flex items-center  lg:justify-between flex-col lg:flex-row gap-3">
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
            <Link
              href="/admin/products/add-product"
              className="bg-primary text-white px-5 py-2 text-sm rounded-lg font-semibold"
            >
              Add Product
            </Link>
          </div>
        </div>
        {view === "Card" ? (
          <div className="w-full flex flex-col gap-10">
            <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 grid-cols-2 items-center gap-5">
              {data?.map((item: any, i: number) => (
                <ProductCardView item={item} mutate={mutate} key={i} />
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
          <MaterialTable
            isLoading={isValidating || isLoading}
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
              data
                ? data?.map((item: any, i: number) => ({
                    sl: i + 1,
                    id: item?._id,
                    name: item?.name,
                    isVariant: item?.isVariant,
                    isPremium: item?.isPremium,
                    isNewArrival: item?.isNewArrival,
                    description: item?.description,
                    category: item?.category?.name,
                    categoryId: item?.category?._id,
                    color: item?.color?._id,
                    type: item?.type,
                    mrp: item?.mrp,
                    price: item?.price,
                    images: item?.images,
                    stocks: item?.stocks,
                    size: item?.size,
                    discount: item?.discount,
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
            detailPanel={[
              {
                tooltip: "View Variant",
                icon: () => (
                  <MdOutlineAddToPhotos className="!text-details !text-xl" />
                ),
                // openIcon: () => <Visibility />,
                render: ({ rowData }) => {
                  return <VariantTable productData={rowData} />;
                },
              },
            ]}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },

              {
                title: "Name",
                tooltip: "Name",
                field: "name",
                editable: "never",
                width: "40%",
                render: (item: any) => (
                  <div className="flex items-center gap-5">
                    {item?.images?.length > 0 && (
                      <img
                        src={item.images[0].imageUrl}
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                    )}
                    <p className="flex flex-col gap-1">
                      <span className="text-gray-800 font-medium text-base">
                        {item?.name}
                      </span>
                      <span className=" text-gray-500 text-sm font-normal">
                        #{item?.id?.slice(0, 9)}
                      </span>
                    </p>
                  </div>
                ),
              },
              {
                title: "Category",
                tooltip: "Category",
                field: "category",
                editable: "never",
                width: "10%",
                render: (item: any) => (
                  <p className=" font-medium capitalize ">{item?.category}</p>
                ),
              },
              {
                title: "₹ Mrp",
                tooltip: "₹ Mrp",
                field: "mrp",
                editable: "never",
                width: "5%",
              },
              {
                title: "₹ Sale Price",
                tooltip: "₹ Sale Price",
                field: "price",
                editable: "never",
                width: "5%",
              },
              {
                title: "Stock",
                tooltip: "Stock",
                field: "stocks",
                editable: "never",
                width: "5%",
              },
              {
                title: "Published",
                tooltip: "Published",
                field: "published",
                editable: "never",
                width: "5%",
                render: (item: any) => {
                  return (
                    <>
                      <div className="flex gap-3">
                        <Tooltip
                          title={
                            item?.isPublished === true
                              ? "Published"
                              : "Not Published"
                          }
                        >
                          <Switch
                            checked={item?.isPublished === true ? true : false}
                            onChange={(e) => {}}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Tooltip>
                      </div>
                    </>
                  );
                },
              },

              {
                title: "Action",
                tooltip: "Action",
                field: "action",
                editable: "never",
                width: "5%",
                render: (item: any) => (
                  <div className="flex items-center gap-3">
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
                    <p onClick={() => handelDeleteProduct(item?.id)}>
                      <MdDelete className="text-xl text-red-500  cursor-pointer" />
                    </p>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageProduct;

const ProductCardView = ({
  item,
  mutate,
}: {
  item: any;
  mutate: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const [imageOpen, setImageOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [addMultipleImageDrawer, setAddMultipleImageDrawer] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const { mutation, isLoading } = useMutation();
  const { data, pagination, isValidating } = useSwr(`product/getAll`);
  const filterProducts = data?.filter(
    (item: any) => item?._id === item?.variantId
  );

  const handelDeleteProduct = async (id: string) => {
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
        const res = await mutation(`product/${id}`, {
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
    <>
      <EditProductDrawer
        open={editProduct}
        onClose={() => setEditProduct(false)}
        item={value}
        mutate={mutate}
      />
      <AddProductImageDrawer
        open={addMultipleImageDrawer}
        onClose={() => setAddMultipleImageDrawer(false)}
        item={value}
        mutate={mutate}
      />
      <ProductInfoDrawer
        open={productDetails}
        onClose={() => setProductDetails(false)}
        item={value}
      />
      <div
        className="relative h-full group overflow-hidden  w-full flex flex-col gap-2 justify-between items-center  bg-white shadow-[0px_0px_4px_0px_#00000024] rounded-lg p-3"
        key={item?._id}
      >
        <p className=" absolute z-10 top-2 left-2 text-xs bg-green-500/50 text-white font-medium px-2 py-0.5 rounded-md">
          {item?.discount}% off
        </p>
        <div>
          <p
            onClick={() => {
              setEditProduct(true);
              setValue(item);
            }}
            className=" absolute z-10 top-2 right-2 duration-200 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-blue-600 bg-opacity-60"
          >
            <MdEdit className=" hover:scale-125 duration-200 text-white" />
          </p>
        </div>

        <div>
          <p
            onClick={() => {
              setProductDetails(true);
              setValue(item);
            }}
            className="absolute z-10 top-12  right-2   duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-blue-600 bg-opacity-60"
          >
            <AiFillEye className="hover:scale-125 duration-200 text-white" />
          </p>
        </div>
        <div>
          <p
            onClick={() => handelDeleteProduct(item?.id)}
            className=" absolute z-10 top-[5.5rem]  right-2   duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-blue-600 bg-opacity-60"
          >
            <MdDeleteOutline className=" hover:scale-125 text-xl duration-200 text-white" />
          </p>
        </div>

        <div className=" w-full flex  flex-col gap-4">
          <div>
            <img
              src={item?.images[0]?.imageUrl || ""}
              className=" w-full object-contain md:h-36 h-24 object-fil rounded-lg cursor-pointer group-hover:scale-105 duration-300 "
              alt=""
            />
          </div>
          <div className=" flex w-full flex-col gap-2">
            <div className=" flex md:flex-row flex-col md:items-center items-start justify-between">
              <p className=" flex items-center  gap-1">
                <span className="uppercase text-primary/80 font-medium text-sm">
                  category:
                </span>
                <span className=" text-xs capitalize text-gray-600">
                  {item?.categoryName}
                </span>
              </p>
              {item?.sold === false ? (
                <p className=" text-xs font-medium px-4 py-1 bg-green-500/50 text-white rounded-md">
                  InStock
                </p>
              ) : (
                <p className="text-xs font-medium px-4 py-1 bg-red-500/50 text-white rounded-md">
                  Out Of Stock
                </p>
              )}
            </div>
            <p className="md:font-semibold font-medium md:text-base text-sm  text-gray-700">
              {item?.name}
            </p>
            <p className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  {item?.star >= index + 1 ? (
                    <FaStar className=" text-amber-400" />
                  ) : (
                    <MdStarBorder fontSize="inherit" color="inherit" />
                  )}
                </Fragment>
              ))}
            </p>
            <div className="flex justify-between items-center">
              <p className="flex flex-col sm:flex-row items-center gap-1">
                <span className="line-through text-xs  text-gray-400">
                  ₹{item?.mrp}
                </span>
                <span className="text-gray-800 font-semibold">
                  ₹{item?.price}
                </span>
              </p>
              <div className="flex gap-3">
                <Tooltip
                  title={
                    item?.isPublished === true ? "Published" : "Not Published"
                  }
                >
                  <Switch
                    checked={item?.isPublished === true ? true : false}
                    onChange={(e) => {}}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
