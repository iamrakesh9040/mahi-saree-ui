import MultipleMediaUpload from "@/core/MultipleMediaUpload";
import { useMutation } from "@/hooks";
import { Drawer } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Props = {
  open: any;
  onClose: () => void;
  item: any;
  mutate: () => void;
};

const AddProductImageDrawer = ({ open, onClose, item, mutate }: any) => {
  const { mutation, isLoading } = useMutation();

  const handelDeleteProduct = async (values: any) => {
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
        const res = await mutation(`product/delete-image`, {
          method: "DELETE",
          body: {
            productId: item?.id,
            imageId: values?._id,
            imagePath: values?.imagePath,
          },
          isAlert: true,
        });
        mutate();
        if (res?.status === 200) {
          onClose();
          toast.success(res?.results?.msg);
          mutate();
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="flex flex-col gap-8 lg:w-[40vw] w-[60vw] overflow-hidden">
        <h1 className="p-3 md:p-5 bg-black sub-title text-white">
          Add Multiple Images
        </h1>

        <div className="p-6 overflow-y-auto">
          <div className=" w-full">
            <MultipleMediaUpload
              onClose={onClose}
              mutate={mutate}
              item={item}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="!text-xl  !font-bold !text-black">Images</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 ">
              {item?.images?.map((data: any) => (
                <div
                  className="relative flex flex-col justify-center items-center gap-6 bg-white rounded-xl shadow-[0px_0px_10px_1px_#00000024] h-52 w-full"
                  key={data._id}
                >
                  <span
                    className="absolute top-3 right-2  rounded-full h-6 w-6 flex justify-center items-center"
                    onClick={() => handelDeleteProduct(data)}
                  >
                    <MdDelete className="text-2xl text-red-500 cursor-pointer" />
                  </span>

                  <img
                    src={data.imageUrl}
                    className="w-full h-full rounded-xl"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddProductImageDrawer;
