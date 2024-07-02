import { sweetAlertCustomStyles, sweetAlertStyles } from "@/utils";
import errorHelper from "@/utils/error";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useMutation } from "@/hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function ColorCard({
  colData,
  mutate,
}: {
  colData: any;
  mutate?: () => void;
}) {
  //   const {Distributer } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  // const [openAddUpdateUserDrawer, setOpenAddUpdateUserDrawer] = useState(false);
  const router = useRouter();
  const { mutation } = useMutation();

  const colorDeleteSession = async () => {
    try {
      Swal.fire({
        title: "Warning?",
        text: `Are you sure you want to delete this color?`,
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
          setDeleteLoading(true);
          const res = await mutation(`color/${colData?._id}`, {
            method: "DELETE",
            isAlert: true,
          });
          setDeleteLoading(false);
          if (res?.results?.success) {
            Swal.fire({
              title: "Success",
              text: `Color successfully deleted!`,
              icon: "success",
            });
            mutate && mutate();
          }
        }
      });
    } catch (error) {
      errorHelper(error);
    }
  };

  return (
    <div className="w-full">
      <div
        className="relative flex flex-col gap-2 items-center justify-center hover:-translate-y-1 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-xl h-28 px-2 cursor-pointer"
        style={{ backgroundColor: colData?.colorCode }}
      >
        <p className="text-xs text-start md:text-lg font-semibold tracking-wide text-black">
          {colData?.name}
        </p>
        <p className="text-xs text-start md:text-lg font-semibold tracking-wide text-black">
          {colData?.colorCode}
        </p>
        <span
          onClick={colorDeleteSession}
          className="absolute top-2 right-2 text-md text-white rounded-md flex justify-center items-center"
        >
          <AiFillDelete className="!text-xl" />
        </span>
      </div>
    </div>
  );
}
