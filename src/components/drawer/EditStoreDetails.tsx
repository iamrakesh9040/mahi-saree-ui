import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/core/InputField";
import Button from "@/core/Button";
import { IoCheckmarkSharp } from "react-icons/io5";
import LoadingButton from "@/core/LoadingButton";
import { BiCommentAdd } from "react-icons/bi";

type Props = {
  open: any;
  onClose: () => void;
};
interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStoreDetails = ({ open, onClose }: Props) => {
  const [id, setId] = useState(0);

  const storeDetailsSchema = [
    {
      key: 1,
      name: "storeName",
      label: "Store Name",
      placeholder: "Enter Your Store Name",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string()

        .required("Store Name is required")
        .min(3, "Store Name should be minimum 3 characters long")
        .matches(/^[a-zA-Z\s]*$/, "numeric value not accepted"),
    },
    {
      key: "2",
      name: "email",
      label: "Email",
      type: "email",
      validationSchema: Yup.string()
        .required("Email is required")
        .email("Invalid Email Address"),
      initialValue: "",
      required: true,
      className: "col-span-12",
    },
    {
      key: 2,
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "Enter 10-digit Mobile Number",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12 ",
      validationSchema: Yup.string()
        .matches(/^[0-9]+$/, "Invalid number")
        .required("Phone number is required")
        .test("startsWith5or7or8or9", "Invalid number", (value) =>
          /^[5-9]/.test(value)
        )
        .min(10, "Minimum 10 digits")
        .max(10, "Maximum 10 digits")
        .test("noRepeatedDigits", "Invalid number", (value) => {
          const repeatedDigitPattern = /(\d)\1{4}/; // Matches any digit repeated exactly 5 times
          return !repeatedDigitPattern.test(value);
        }),
    },
  ];

  const initialValues = storeDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema: { [key: string]: Yup.StringSchema } =
    storeDetailsSchema.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );

  const handleSubmit = async (values: any, props: any) => {
    console.log(values);
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="w-[40vw] flex flex-col  ">
        <h1 className="p-3 md:p-5 bg-primary sub-title text-white">
          Edit Store Details
        </h1>
        <div className="p-3 md:p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {storeDetailsSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: FieldProps<string>) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="font-semibold text-themeDarkGray">
                          {inputItem.label} {inputItem?.required ? "*" : ""}
                        </div>

                        <div className="col-span-6 w-full">
                          <InputField
                            key={inputItem?.key}
                            id={id}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                              formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name]
                            }
                            error={Boolean(
                              formik?.touched[inputItem?.name] &&
                                formik?.errors[inputItem?.name]
                            )}
                            formik={formik}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                  <LoadingButton
                    type="submit"
                    sx="w-full bg-primary text-white h-10 flex items-center justify-center gap-2"
                    disabled={formik.isSubmitting || formik.isValidating}
                    circularProgressClass="loading-sm text-secondary"
                  >
                    <div className="flex items-center gap-2">
                      <BiCommentAdd className="text-xl mt-0.5" />
                      Update Store Details
                    </div>
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Drawer>
  );
};

export default EditStoreDetails;
