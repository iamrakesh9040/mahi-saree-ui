/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@/hooks";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import EditCouponForm from "../forms/EditCouponForm";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

const CouponCard = ({ item, mutate }: { item: any; mutate: () => void }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();
  const { mutation, isLoading } = useMutation();

  const deleteOperation = async (id: any) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: "Yes, Delete!",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`coupon/${id}`, {
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
      <EditCouponForm item={edit} open={open} close={setOpen} mutate={mutate} />
      <div className="w-full p-8">
        <div className="border-2 border-black w-full h-[15rem] relative group overflow-hidden">
          <div onClick={() => deleteOperation(item?._id)}>
            <p className="absolute z-10 top-2 group-hover:right-2 -right-8 duration-200 w-8 h-8 cursor-pointer rounded-lg flex items-center justify-center bg-primary/70 hover:bg-primary">
              <MdDelete className="hover:scale-125 duration-200 text-white text-xl" />
            </p>
          </div>

          <p
            onClick={() => {
              setEdit(item);
              setOpen(true);
            }}
            className=" absolute z-10 top-12  group-hover:right-2 -right-10  duration-300 w-8 h-8 cursor-pointer  rounded-lg flex items-center justify-center bg-primary/70 hover:bg-primary "
          >
            <RiEditBoxFill className=" hover:scale-125 duration-200 text-white text-xl" />
          </p>
          <div className="flex justify-between relative">
            <img
              className="max-w-[21rem] max-h-[14.8rem]  h-fit absolute -right-0 -top-0 object-cover lg:grid hidden"
              src={item?.imageUrl}
              alt=""
            />
            <div className="flex flex-col pl-4 pt-4 gap-[0.14rem]">
              <div className="flex items-center gap-3">
                <p className="font-light">Name:</p>
                <p className="text-blue-400">{item?.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-light">USE :</p>
                <div className="flex items-center border border-red-400 bg-red-200 text-white  w-fit px-2 rounded-md py-1">
                  <p className="text-base">{item?.couponCode}</p>
                </div>
              </div>
              <p className="font-light text-sm">On Minimum Shopping</p>
              <p className="text-green-600">₹{item?.minAmount}</p>
              <p className="font-light text-sm">Discount amount</p>
              <p className="text-red-400">₹{item?.amount}</p>
              <p className="text-xl font-light">{item?.title}</p>
              <p className="font-light text-sm">
                Start Date: {dayjs(item?.startDate).format("MMMM DD, YYYY")}
              </p>
              <p className="font-light text-sm">
                End Date: {dayjs(item?.endDate).format("MMMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
