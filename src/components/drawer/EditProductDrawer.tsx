import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation, useSwr } from "@/hooks";
import { Drawer } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  open: any;
  onClose: () => void;
  item: any;
  mutate: () => void;
};
interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProductDrawer = ({ open, onClose, item, mutate }: any) => {
  const { data, isValidating } = useSwr(`category`);
  const { data: colors } = useSwr(`color`);
  const { mutation, isLoading } = useMutation();

  const productSchema = [
    {
      key: "1",
      label: "Product Name",
      name: "name",
      type: "text",
      initialValue: item?.name,
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "2",
      label: "Variant Type",
      name: "variantType",
      initialValue: item?.isVariant,
      type: "select",
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
      key: "4",
      label: "Select Category",
      name: "category",
      initialValue: item?.categoryId,
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
      key: "6",
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
      initialValue: item?.color,
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "4",
      label: "Select Product Type",
      name: "type",
      initialValue: item?.type,
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
      key: "6",
      label: "MRP",
      name: "price",
      type: "number",
      initialValue: item?.mrp,
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "7",
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      initialValue: item?.price,
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "8",
      label: "Stock",
      name: "stock",
      type: "number",
      initialValue: item?.stocks,
      className: "col-span-12",
      validationSchema: Yup.number().required("Required"),
    },
    {
      key: "3",
      label: "Size",
      name: "size",
      type: "multi-autocomplete",
      initialValue: item?.size?.map((data: any) => ({
        value: data,
        label: data,
      })),
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
      className: "col-span-12",
      validationSchema: Yup.mixed().required("Required"),
    },
    {
      key: "10",
      label: "New Arrival Type",
      name: "newArrivalType",
      type: "select",
      initialValue: item?.isNewArrival,
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      className: "col-span-6",
      validationSchema: Yup.string().required("Required").optional(),
    },
    {
      key: "11",
      label: "Premium Type",
      name: "premiumType",
      type: "select",
      initialValue: item?.isPremium,
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      className: "col-span-6",
      validationSchema: Yup.string().required("Required").optional(),
    },
    {
      key: "3",
      label: "Description",
      name: "description",
      type: "text",
      initialValue: item?.description ? item?.description : "",
      className: "col-span-12",
      validationSchema: Yup.string().optional(),
    },
  ];

  const initialValues = productSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema: { [key: string]: Yup.StringSchema } =
    productSchema.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );

  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("isVariant", values?.variantType);
      formData.append("isNewArrival", values?.newArrivalType);
      formData.append("isPremium", values?.premiumType);
      formData.append("description", values?.description);
      formData.append("category", values?.category);
      formData.append("color", values?.color);
      formData.append("mrp", values?.price);
      formData.append("price", values?.salePrice);
      formData.append("stocks", values?.stock);
      formData.append("type", values?.type);
      values?.size?.map((item: any) => formData.append("size", item?.value));

      const res = await mutation(`product/${item.id}`, {
        method: "PUT",
        isAlert: true,
        body: formData,
        isFormData: true,
      });
      if (res?.status === 200) {
        resetForm();
        onClose();
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
      mutate?.();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="lg:w-[30vw] w-[60vw] flex flex-col  ">
        <h1 className="p-3 md:p-5 bg-black text-2xl text-white">
          Edit Product
        </h1>
        <div className="p-3 md:p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleOperation}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {productSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: FieldProps<string>) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="col-span-6 w-full">
                          <CustomInputField
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            options={inputItem?.options}
                            value={formik?.values[inputItem?.name]}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                            }}
                            // disabled={inputItem?.disabled}
                            onBlur={formik.handleBlur}
                            fullWidth
                            formik={formik}
                            // loading={inputItem?.loading}
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
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                  <Button loading={isLoading} type="submit">
                    Update Product
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

export default EditProductDrawer;
