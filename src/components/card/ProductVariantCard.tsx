import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import EditProductDrawer from "../drawer/EditProductDrawer";
import ProductInfoDrawer from "../drawer/ProductInfoDrawer";
import { BiImageAdd } from "react-icons/bi";
import AddProductImageDrawer from "../drawer/AddProductImageDrawer";

interface IProduct {
  id: string;
  image: string;
  name: string;
}
const PRODUCT_ARR: IProduct[] = [
  {
    id: "1",
    image: "/product/bp_light.jpg",
    name: "Digital BP Machine",
  },
  {
    id: "2",
    image: "/product/cautery_machine_light.jpg",
    name: "Cautery Machine",
  },
  {
    id: "3",
    image: "/product/cipap_light.jpg",
    name: "CPAP/BPAP Machine",
  },
  {
    id: "4",
    image: "/product/ecg_light.jpg",
    name: "ECG Machine",
  },
];

const ProductVariantCard = () => {
  const [editProductDrawer, setEditProductDrawer] = useState(false);
  const [openProductInfo, setOpenProductInfo] = useState(false);
  const [openAddProductImage, setOpenAddProductImage] = useState(false);
  const handelDeleteProduct = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover it again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: "Yes, delete it!",
    }).then(() => {
      // Redirect to another page after clicking "OK"
      //   window.location.href =
      //     "/my-account/orders/id=#sh523nmnnb32mmb2n33dskBJDn"; // Replace with your desired URL
    });
  };
  return (
    <>
      <EditProductDrawer
        open={editProductDrawer}
        onClose={() => setEditProductDrawer(false)}
      />
      <ProductInfoDrawer
        open={openProductInfo}
        onClose={() => setOpenProductInfo(false)}
      />
      <AddProductImageDrawer
        open={openAddProductImage}
        onClose={() => setOpenAddProductImage(false)}
      />
      {PRODUCT_ARR.slice(0, 10).map((item) => (
        <div
          className="relative h-84 group overflow-hidden  w-full flex flex-col gap-2 justify-between items-center  bg-white shadow-[0px_0px_4px_0px_#00000024] rounded-lg p-4"
          key={item?.id}
        >
          <div className="absolute z-10 top-2 right-2 flex flex-col gap-3">
            <p
              onClick={() => setEditProductDrawer(true)}
              className=" duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-edit bg-opacity-60"
            >
              <FiEdit className="  duration-200 text-white" />
            </p>
            <p
              className="duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-details "
              onClick={() => setOpenAddProductImage(true)}
            >
              <BiImageAdd className="duration-200 text-white" />
            </p>
            <p
              className="duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-danger "
              onClick={handelDeleteProduct}
            >
              <MdOutlineDelete className="duration-200 text-white" />
            </p>
          </div>

          <div className=" w-full flex  flex-col gap-4">
            <img
              src={item?.image}
              className=" w-full object-contain md:h-36 h-24 object-fil rounded-lg cursor-pointer group-hover:scale-105 duration-300 "
              alt=""
            />

            <div className=" flex w-full flex-col gap-2">
              {/* <div className=" flex items-center justify-between">
            <p className=" flex items-center gap-1.5 py-1 px-2 rounded-full border border-gray-300">
              <FaStar className=" text-xs text-amber-500" />
              <span className=" text-xs">5.0</span>
            </p>
            <p className="  text-green-500 text-xs font-semibold">Instock</p>
          </div> */}
              <p className=" flex items-center gap-1">
                <span className=" uppercase text-primary/80 font-medium text-sm">
                  brand:
                </span>
                <span className=" text-xs capitalize text-gray-600">
                  Alive Core
                </span>
              </p>
              <p className="  font-semibold text-base text-gray-700">
                {item?.name}
              </p>
              <p className=" text-sm flex items-center gap-1">
                <FaStar className=" text-amber-500" />
                <FaStar className=" text-amber-500" />
                <FaStar className=" text-amber-500" />
                <FaStar className=" text-amber-500" />
                <FaStar className=" text-amber-500" />
              </p>
              <div className=" flex justify-between items-center  ">
                <p className=" flex items-center gap-1">
                  <span className="text-gray-800 font-semibold">₹999.12</span>
                  <span className="line-through text-xs  text-gray-400">
                    ₹2999.00
                  </span>
                </p>
                {/* <p className=" w-8 h-8 rounded-md cursor-pointer hover:bg-primary border duration-300 border-primary flex items-center justify-center">
                  <HiOutlinePlusSm className=" text-primary hover:text-white text-xl duration-300" />
                </p> */}
              </div>
              <p
                // onClick={() => setOpenViewDetails(!openViewDetails)}
                className="font-semibold tracking-wider cursor-pointer btn-primary duration-500 text-white  w-full text-center py-2 px-3 rounded-lg  text-sm "
                onClick={() => setOpenProductInfo(true)}
              >
                View Details
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductVariantCard;
