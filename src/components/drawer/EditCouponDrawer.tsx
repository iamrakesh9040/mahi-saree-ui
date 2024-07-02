import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/core/InputField";
import { BiCommentAdd } from "react-icons/bi";
import LoadingButton from "@/core/LoadingButton";

type Props = {
  open: any;
  onClose: () => void;
};
interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCouponDrawer = ({ open, onClose }: Props) => {
  const [id, setId] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    // Add more options as needed
  ];

  const couponSchema = [
    {
      key: 1,
      name: "code",
      label: "Enter Coupon Code",
      initialValue: "",
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string().required("Coupon Code is required"),
    },
    {
      key: 2,
      name: "validTill",
      label: "Valid Till",
      initialValue: "",
      required: true,
      type: "date",
      className: "col-span-12",
      validationSchema: new Yup.DateSchema().required(
        "Valid Till Date is required"
      ),
    },
    {
      key: 3,
      name: "maxCashback",
      label: "Max Cashback",
      initialValue: "",
      required: true,
      type: "number",
      className: "col-span-12",
      validationSchema: Yup.number().required("Max Cashback is required"),
    },
    {
      key: 4,
      name: "discount",
      label: "Discount",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string().required("Discount is required"),
    },
    {
      key: 5,
      name: "maxUses",
      label: "Max Uses",
      initialValue: "",
      required: true,
      type: "number",
      className: "col-span-12",
      validationSchema: Yup.number().required("Max Uses is required"),
    },
    {
      key: 6,
      name: "status",
      label: "Status",
      initialValue: "",
      required: true,
      type: "select",
      options: statusOptions,
      className: "col-span-12",
      validationSchema: Yup.string().required("Status is required"),
    },
  ];

  const initialValues = couponSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema: { [key: string]: Yup.StringSchema } =
    couponSchema.reduce(
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
          Edit Coupon
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
                {couponSchema.map((inputItem) => (
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
                            key={
                              inputItem.name === "select" ? id : inputItem?.key
                            }
                            id={id}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            options={inputItem?.options}
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
                      Add Coupon
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

export default EditCouponDrawer;
