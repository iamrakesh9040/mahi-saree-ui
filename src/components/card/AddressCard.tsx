import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast } from "react-toastify";
import { Dialog } from "@mui/material";
import useMutation from "@/hooks/useMutation";
import { EditAddressForm } from "../forms";
import Swal from "sweetalert2";

const AddressCard = ({ item, mutate }: any) => {
  const { mutation, isLoading } = useMutation();
  const [editShowForm, setEditShowForm] = useState(false);
  const handleSetAsDefault = async () => {
    try {
      const res = await mutation(`address/default/${item?._id}`, {
        method: "PUT",
        isAlert: true,
      });
      if (res?.status === 200) {
        toast.success(res?.results?.msg);
        mutate();
      } else if (res?.status === 422) {
        toast.error(res?.results?.msg);
      } else if (res?.status === 500) {
        toast.error(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddressDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF8A5B",
        cancelButtonColor: "#3AAF9F",
        confirmButtonText: "Yes, Delete!",
      }).then(async (results) => {
        if (results?.isConfirmed) {
          const res = await mutation(`address/${item?._id}`, {
            method: "DELETE",
            isAlert: true,
          });
          if (res?.status === 200) {
            Swal.fire("Success", "Address successfully deleted!", "success");
            mutate();
          } else if (res?.status === 422) {
            toast.error(res?.results?.msg);
          } else if (res?.status === 500) {
            toast.error("unable to Delete");
          } else {
            toast.error(res?.results?.msg);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={item?.id}
        className="relative flex flex-col gap-3 w-full px-4 font-semibold ring-1 outline-none p-2 rounded-md bg-white ring-gray-300"
      >
        <div className="flex justify-between items-center ">
          <div className=" flex items-center gap-5">
            <p className="bg-blue-400 py-1 px-2 text-xs rounded-md text-white font-sub font-semibold uppercase">
              {item?.type}
            </p>
            {item?.isDefault ? (
              <p className="bg-green-100 py-1 px-2 text-xs rounded-md text-gray-500 font-sub font-semibold uppercase">
                Set as Default
              </p>
            ) : null}
          </div>

          <div className="hover:cursor-pointer relative group">
            <BiDotsVerticalRounded size={24} />
            <div className="absolute hidden group-hover:flex flex-col gap-3 items-start  bg-white right-2 top-0 z-20 p-4 border-2 rounded-sm shadow-md w-40">
              <button
                onClick={() => {
                  setEditShowForm(!editShowForm);
                }}
                className="font-normal hover:text-primary "
              >
                Edit
              </button>

              <p
                onClick={handleAddressDelete}
                className="font-normal hover:text-red-500"
              >
                Delete
              </p>
              {!item?.isDefault ? (
                <p
                  onClick={handleSetAsDefault}
                  className="font-normal hover:text-green-400"
                >
                  Set as Default
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <span className="flex gap-4 ">
          <p className="font-semibold font-props">{item?.name}</p>
          <p className="font-sub font-normal">
            {item?.phone}-{item?.alternativePhoneNumber}
          </p>
        </span>
        <p className="font-normal">
          {item?.address}, {item?.city}, {item?.state} -{" "}
          <span className="font-normal">{item?.pincode}</span>{" "}
        </p>
      </div>

      <Dialog
        open={editShowForm}
        onClose={() => setEditShowForm(false)}
        maxWidth="xl"
      >
        <div className="lg:w-[60rem] w-[20rem] rounded-xl">
          <EditAddressForm
            mutate={mutate}
            addressData={item}
            setOpen={() => setEditShowForm(false)}
          />
        </div>
      </Dialog>
    </>
  );
};

export default AddressCard;
