import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/core/InputField";
import Button from "@/core/Button";
import { IoCheckmarkSharp } from "react-icons/io5";
import STATES from "../configs/states";

type Props = {
  open: any;
  onClose: () => void;
};
interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStoreLocation = ({ open, onClose }: Props) => {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    // Add more options as needed
  ];

  const offerDetailsSchema = [
    {
      key: "9",
      label: "Country",
      name: "country",
      type: "text",
      validationSchema: Yup.string().required("required"),
      initialValue: "",
      required: true,
      className: "col-span-12",
    },
    {
      key: "4",
      label: "Post Code",
      name: "zip",
      type: "number",
      validationSchema: Yup.number()
        .required("Post code is required")
        .min(6, "Post code must be 6 digits")
        .max(6, "Post code must be 6 digits"),
      initialValue: "",
      required: true,
      className: "col-span-12",
    },

    {
      key: "5",
      label: "Street",
      name: "street",
      type: "text",
      multiline: false,
      initialValue: "",
      className: "col-span-12",
    },
    {
      key: "8",
      label: "Landmark",
      name: "landmark",
      type: "text",
      initialValue: "",
      className: "col-span-12",
    },

    {
      key: "6",
      label: "City/District/Town",
      name: "city",
      type: "text",
      validationSchema: Yup.string().required("required"),
      initialValue: "",
      required: true,
      className: "col-span-12",
    },
    {
      key: "7",
      label: "State",
      name: "state",
      type: "select",
      options: STATES.map((state) => ({
        label: state,
        value: state,
      })),
      validationSchema: Yup.string().required("State field is required"),
      initialValue: "",
      required: true,
      className: "col-span-12",
    },
  ];

  const initialValues = offerDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema: { [key: string]: Yup.StringSchema } =
    offerDetailsSchema.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );

  const handleSubmit = async (values: any, props: any) => {
    // if (!image) return toast.error("Please select a product image");
    try {
      setLoading(true);
      // console.log("Form values:", values);
      // console.log("Simulated database interaction:", values);
      // console.log("Simulated media upload:", image);

      setLoading(false);
      setImage(null);
      props.resetForm();
      toast.success("Product Created Successfully");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className=" bg-primary  w-[40vw] flex items-center justify-between p-3 md:p-5 bg-theme text-white sub-title">
        <h2>Edit Store Location</h2>
      </div>
      <div className=" w-[38rem] flex flex-col items-center justify-center p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
              {offerDetailsSchema.map((inputItem) => (
                <Field name={inputItem.name} key={inputItem.key}>
                  {(props: FieldProps<string>) => (
                    <div
                      className={`flex flex-col justify-end gap-2 ${inputItem.className}`}
                    >
                      <div className="font-semibold text-themeDarkGray">
                        {inputItem.label}
                      </div>
                      <div className="!w-full">
                        <InputField
                          key={inputItem?.key}
                          name={inputItem?.name}
                          // disabled={inputItem?.disabled}
                          options={inputItem?.options}
                          type={inputItem?.type}
                          value={formik?.values[inputItem?.name]}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          //   rows={inputItem?.rows}
                          //   multiline={inputItem?.multiline}
                          //   placeholder={inputItem?.placeholder}
                          //   options={inputItem?.options}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name]
                          )}
                          helperText={
                            formik?.touched[inputItem?.name] &&
                            formik?.errors[inputItem?.name]
                          }
                        />
                      </div>
                    </div>
                  )}
                </Field>
              ))}
              <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                <Button
                  // loading={isChanging}
                  className="shadow-none"
                  type="submit"
                  startIcon={<IoCheckmarkSharp />}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Drawer>
  );
};

export default EditStoreLocation;
