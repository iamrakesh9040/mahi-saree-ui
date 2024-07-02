import CustomInputField from "@/core/CustomInputFiled";
import { useMutation, useSwr } from "@/hooks";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Button from "../../core/Button";
const EditCouponForm = ({
  item,
  open,
  close,
  mutate,
}: {
  item: any;
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  mutate?: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const { data: categoryData, isValidating } = useSwr(`category`);

  const Schema = [
    {
      key: "1",
      label: "Full Name *",
      name: "name",
      type: "text",
      initialValue: item?.name,
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
      initialValue: item?.category?._id,
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "4",
      label: "Discount Amount",
      name: "discount",
      type: "text",
      initialValue: item?.amount,
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().optional(),
    },

    {
      key: "5",
      label: "Minimum Spend Amount *",
      name: "minimumSpend",
      type: "text",
      initialValue: item?.minAmount,
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "6",
      label: "Valid From *",
      name: "validFrom",
      type: "date",
      initialValue: moment(item?.startDate).format("YYYY-MM-DD"),
      className: "lg:col-span-6 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "7",
      label: "Valid upto *",
      name: "validUpto",
      type: "date",
      initialValue: moment(item?.endDate).format("YYYY-MM-DD"),
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
      const res = await mutation(`coupon/${item?._id}`, {
        method: "PUT",
        body: {
          name: values?.name,
          category: values?.category,
          amount: values?.discount,
          minAmount: values?.minimumSpend,
          startDate: values?.validFrom,
          endDate: values?.validUpto,
        },
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
          <p className="text-lg font-semibold text-gray-900">Edit Coupons</p>
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
          enableReinitialize={true}
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
                        type={inputItem?.type}
                        options={inputItem?.options}
                        value={formik?.values[inputItem?.name]}
                        onChange={(e: any) => {
                          formik.handleChange(e);
                        }}
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
                        label={inputItem?.label}
                      />
                    </div>
                  )}
                </Field>
              ))}
              <div className="flex items-center col-span-12 justify-center flex-col cursor-pointer gap-2 pt-2">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="w-full bg-primary text-black "
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default EditCouponForm;
