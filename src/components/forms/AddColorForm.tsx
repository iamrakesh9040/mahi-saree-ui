import { useMutation } from "@/hooks";
import { formikProps } from "@/schemas/color.schema";
// import { formikProps } from "@/schemas";
// import { colorMutation } from "@/schemas/color.schema";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoCheckmarkDone } from "react-icons/io5";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function AddColorForms({
  mutate,
  setAddColorDrawer,
}: {
  mutate: () => void;
  setAddColorDrawer?: Dispatch<SetStateAction<boolean>>;
}) {
  const [colorCode, setColorCode] = useState<any>(""); // Initial color state
  const { isLoading, mutation } = useMutation();

  const formik = useFormik({
    initialValues: {
      colorName: "",
    },
    validationSchema: Yup.object({
      colorName: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, props: formikProps) => {
      // return console.log("values--", values);
      try {
        if (!colorCode)
          return Swal.fire("Error", "Please select a color code!", "error");
        const res = await mutation(`color`, {
          method: "POST",
          isAlert: true,
          body: {
            name: values?.colorName,
            colorCode: colorCode ? colorCode : "",
          },
        });

        if (res?.results?.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Color added successfully!",
          });
          mutate?.();
          setAddColorDrawer && setAddColorDrawer(false);
          props.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="md:w-[35vw] w-[70vw] flex flex-col">
      <h1 className="p-3 md:p-5 bg-primary  text-white font-semibold text-lg">
        Add Color
      </h1>
      {/* <h1 className="panel-title w-full">Add Color</h1> */}
      <div className="w-full px-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700">
            <div className="">
              <input
                name="colorName"
                type="text"
                className={`border bg-white h-10 w-full px-2 rounded-md`}
                placeholder="Enter color name"
                value={formik.values.colorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.colorName && formik.errors.colorName ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.colorName}
                </div>
              ) : null}
            </div>

            <div className="border bg-white h-10 w-full px-2 rounded-md">
              {colorCode}
            </div>
            <HexColorPicker color={colorCode} onChange={setColorCode} />
          </div>
          <div className="col-span-12 flex items-center justify-center w-full">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-primary rounded-md flex px-8 py-2  gap-2 items-center justify-center text-white"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <IoCheckmarkDone /> Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
