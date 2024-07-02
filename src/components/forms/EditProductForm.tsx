
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";


const EditProduct = ({ openDialog, setOpenDialog, data, mutate }: any) => {
    
    const Schema = [
        {
            key: "1",
            label: "Product Name",
            name: "name",
            type: "text",
            initialValue: data?.name,
            className: "col-span-6",
            validationSchema: Yup.string().required("Required"),
        },
        {
            key: "4",
            label: "Select Category",
            name: "category",
            initialValue: data?.categoryId,
            options:[],
            validationSchema: Yup.string().required("Required"),
            type: "select",
            className: "col-span-6",
        },
        {
            key: "3",
            label: "Description",
            name: "description",
            type: "textarea",
            initialValue: data?.description,
            multiline: true,
            rows: 4,
            className: "col-span-12",
            validationSchema: Yup.string().required("Required"),
        },

        {
            key: "6",
            label: "Product Color",
            name: "color",
            type: "text",
            initialValue: data?.color,
            className: "col-span-6",
            validationSchema: Yup.string().required("Required"),
        },
        {
            key: "6",
            label: "Price",
            name: "price",
            type: "number",
            initialValue: data?.price,
            className: "col-span-6",
            validationSchema: Yup.number().required("Required"),
        },
        {
            key: "7",
            label: "Sale Price",
            name: "salePrice",
            type: "number",
            initialValue: data?.salePrice,
            className: "col-span-6",
            validationSchema: Yup.number().required("Required"),
        },
        {
            key: "8",
            label: "Stock",
            name: "stock",
            type: "number",
            initialValue: data?.stock,
            className: "col-span-6",
            validationSchema: Yup.number().required("Required"),
        },
    ];
    const initialValues: { [key: string]: string } = Schema.reduce(
        (accumulator: { [key: string]: string }, currentValue: any) => {
            accumulator[currentValue.name] = currentValue.initialValue;
            return accumulator;
        },
        {}
    );

    const validationSchema: { [key: string]: Yup.StringSchema } =
        Schema.reduce(
            (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
                accumulator[currentValue.name] = currentValue.validationSchema;
                return accumulator;
            },
            {}
        );
    const handleOperation = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            // const res = await mutation(`product/${data?._id}`, {
            //     method: "PUT",
            //     body: {
            //         name: values?.name,
            //         category: values?.category,
            //         description: values?.description,
            //         color: values?.color,
            //         price: values?.price,
            //         salePrice: values?.salePrice,
            //         stock: values?.stock,
            //     },
            //     isAlert: true,
            // });
            // if (res?.status === 200) {
            //     mutate()
            //     resetForm()
            //     toast.success(res?.results?.msg)
            //     setOpenDialog(false)
            // } else {
            //     toast.error(res?.results?.msg)
            // }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog
            open={openDialog && openDialog}
            onClose={() => setOpenDialog && setOpenDialog(false)}
            maxWidth="xl"
        >
            <div className="w-[60rem] p-4 flex flex-col gap-8 ">
                <p className="font-semibold text-gray-800 text-xl">Product Update Form Without Image</p>
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
                                            className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                                        >

                                            <CustomInputField
                                                key={inputItem?.key}
                                                name={inputItem?.name}
                                                type={inputItem?.type}
                                                options={inputItem?.options}
                                                value={formik?.values[inputItem?.name]}
                                                multiline={inputItem.multiline}
                                                rows={inputItem.rows}
                                                label={inputItem.label}
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
                                            />
                                        </div>
                                    )}
                                </Field>
                            ))}
                            <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                                <Button
                                    // loading={isLoading}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    );
};

export default EditProduct;
