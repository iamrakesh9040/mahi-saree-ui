import { Drawer } from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation, useSwr } from "@/hooks";
import Swal from "sweetalert2";
import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
// import { Button } from "../core";

type Props = {
  open: boolean;
  onClose: () => void;
  mutate: () => void;
};

type OptionType = {
  label: string;
  value: string;
};

interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddVariantDrawer = ({ open, onClose, mutate }: Props) => {
  const { data, isValidating } = useSwr(`category`);
  const { data: colors } = useSwr(`color`);
  const [files, setFiles] = useState<File[]>([]);
  const { mutation, isLoading } = useMutation();

  const variantProductSchema = [
    {
      key: "1",
      label: "Product Image",
      name: "productImages",
      type: "file",
      initialValue: [],
      className: "col-span-12",
      validationSchema: Yup.mixed()
        .required("Required")
        .test("fileType", "Required", (value: any) => {
          return files?.length === 0 ? false : true;
        }),
    },
    {
      key: "2",
      label: "Variant Type",
      name: "variantType",
      type: "select",
      initialValue: "",
      options: [
        {
          label: "Single",
          value: false,
        },
        {
          label: "Multiple",
          value: true,
        },
      ],
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "Select Category",
      name: "category",
      initialValue: "",
      options:
        data?.length > 0
          ? data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?._id,
              };
            })
          : [],
      validationSchema: Yup.string().required("Required"),
      type: "select",
      className: "col-span-12",
    },
    {
      key: "4",
      label: "Product Color",
      name: "color",
      type: "select",
      options:
        colors?.length > 0
          ? colors?.map((item: any) => {
              return {
                label: item?.name,
                value: item?._id,
              };
            })
          : [],
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "4",
      label: "Select Product Type",
      name: "type",
      initialValue: "",
      options: [
        {
          label: "Sambalapuri Mix Patto",
          value: "Sambalapuri Mix Patto",
        },
        {
          label: "Pure Patto",
          value: "Pure Patto",
        },
        {
          label: "Full Tissue Patto",
          value: "Full Tissue Patto",
        },
        {
          label: "Half Tissue Patto",
          value: "Half Tissue Patto",
        },
        {
          label: "Sambalapuri Pure Cotton",
          value: "Sambalapuri Pure Cotton",
        },
        {
          label: "Sambalapuri  Silk Mix Cotton",
          value: "Sambalapuri  Silk Mix Cotton",
        },
      ],
      validationSchema: Yup.string().required("Required"),
      type: "select",
      className: "col-span-12",
    },
    {
      key: "1",
      label: "Product Name",
      name: "name",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "6",
      label: "MRP",
      name: "price",
      type: "number",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "7",
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "8",
      label: "Stock",
      name: "stock",
      type: "number",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "3",
      label: "Size",
      name: "size",
      type: "multi-autocomplete",
      options: [
        {
          label: "Free Size",
          value: "Free Size",
        },
        {
          label: "S",
          value: "S",
        },
        {
          label: "M",
          value: "M",
        },
        {
          label: "L",
          value: "L",
        },
        {
          label: "XL",
          value: "XL",
        },
        {
          label: "XXL",
          value: "XXL",
        },
        {
          label: "XXXL",
          value: "XXXL",
        },
      ],
      initialValue: "",
      className: "col-span-6",
      validationSchema: Yup.mixed().required("Required"),
    },

    {
      key: "3",
      label: "Description",
      name: "description",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().optional(),
    },
  ];

  const initialValues: { [key: string]: string } = variantProductSchema.reduce(
    (accumulator: { [key: string]: string }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = variantProductSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const handleVariantProductCreate = async (
    values: any,
    props: { resetForm: () => void }
  ) => {};

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="md:w-[40vw] w-[70vw] flex flex-col">
        <h1 className="p-3 md:p-5 bg-primary sub-title text-white">
          Add Variant Details
        </h1>
        <div className="p-3 md:p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleVariantProductCreate}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
                {variantProductSchema.map((inputItem: any) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: FieldProps<string>) => (
                      <div
                        className={`flex flex-col justify-start gap-2 ${inputItem.className}`}
                      >
                        <>
                          <CustomInputField
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            options={inputItem?.options}
                            value={formik?.values[inputItem?.name]}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                            }}
                            disabled={inputItem?.disabled}
                            onBlur={formik.handleBlur}
                            fullWidth
                            formik={formik}
                            loading={inputItem?.loading}
                            error={Boolean(
                              formik?.touched[inputItem?.name] &&
                                formik?.errors[inputItem?.name]
                            )}
                            helperText={
                              formik?.touched[inputItem?.name] &&
                              (formik?.errors[inputItem?.name] as string)
                            }
                            label={inputItem.label}
                          />
                        </>
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                  <Button loading={isLoading} type="submit">
                    Save Product
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Drawer>
  );
};

export default AddVariantDrawer;
