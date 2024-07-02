/* eslint-disable @next/next/no-img-element */
import CouponCard from "@/components/card/CouponCard";
import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { MdGroups2 } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Coupons = () => {
  const { data: couponData, mutate } = useSwr(`coupon`);
  const [open, setOpen] = useState(false);
  return (
    <AdminLayout>
      <AddCouponForm open={open} close={setOpen} mutate={mutate} />
      <div className="px-4 py-4 h-full overflow-y-auto flex flex-col gap-6">
        <div
          className={`md:text-lg text-xs font-bold text-primary flex lg:flex-row flex-col gap-5  lg:gap-3 lg:items-center `}
        >
          <div className=" flex items-center gap-3">
            <MdGroups2 className="text-2xl" />
            <p className="text-lg">All Coupons</p>
          </div>
          <div className=" flex items-center gap-1 bg-primary px-2 py-1.5 rounded-md cursor-pointer">
            <BiAddToQueue className="text-white text-lg" />

            <p
              onClick={() => setOpen(true)}
              className=" text-white text-sm font-medium tracking-wider"
            >
              Add New Coupons
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 md:grid-cols-2">
          {couponData?.map((item: any) => (
            <CouponCard key={item?.id} item={item} mutate={mutate} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Coupons;

const AddCouponForm = ({
  open,
  close,
  mutate,
}: {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  mutate?: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const { data: categoryData, isValidating } = useSwr(`category`);
  const Schema = [
    {
      key: "1",
      label: "Product Image",
      name: "productImages",
      type: "file-with-preview",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.mixed().required("Required"),
    },
    {
      key: "2",
      label: "Full Name *",
      name: "name",
      type: "text",
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "Category *",
      name: "category",
      type: "select",
      options:
        categoryData && categoryData.length
          ? categoryData.map((item: any) => ({
              label: item?.name,
              value: item?._id,
            }))
          : [],
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "4",
      label: "Discount Amount",
      name: "discount",
      type: "text",
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().optional(),
    },

    {
      key: "5",
      label: "Minimum Spend Amount *",
      name: "minimumSpend",
      type: "text",
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "6",
      label: "Valid From *",
      name: "validFrom",
      type: "date",
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "7",
      label: "Valid upto *",
      name: "validUpto",
      type: "date",
      initialValue: "",
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
  ];

  const initialValues = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("category", values?.category);
      formData.append("amount", values?.discount);
      formData.append("minAmount", values?.minimumSpend);
      formData.append("startDate", values?.validFrom);
      formData.append("endDate", values?.validUpto);
      formData.append("images", values?.productImages);
      const res = await mutation(`coupon`, {
        method: "POST",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        mutate && mutate();
        resetForm();
        toast.success("Coupon Added Successfully");
        close(false);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return (
    <Dialog open={open} onClose={() => close(false)}>
      <div className="w-full bg-white flex flex-col border rounded-xl p-5 gap-5">
        <div className="w-full flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">Add Coupons</p>
          <p
            onClick={() => close(false)}
            className="rounded-lg  text-white text-sm font-medium  cursor-pointer"
          >
            <Close className="text-red-500" />
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleOperation}
        >
          {(formik) => (
            <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
              {Schema.map((inputItem: any) => (
                <Field name={inputItem.name} key={inputItem.key}>
                  {(props: FieldProps<string>) => (
                    <div
                      className={`flex flex-col justify-start gap-2 ${inputItem.className}`}
                    >
                      <CustomInputField
                        key={inputItem?.key}
                        name={inputItem?.name}
                        label={inputItem?.label}
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
                      />
                    </div>
                  )}
                </Field>
              ))}
              <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                <Button loading={isLoading} type="submit">
                  Save Coupon
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};
