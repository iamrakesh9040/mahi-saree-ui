import * as Yup from "yup";
import { Dialog } from "@mui/material";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-toastify";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";
import { useMutation } from "@/hooks";
const CategoryCreate = ({ openDialog, setOpenDialog, mutate }: any) => {
  const { mutation, isLoading } = useMutation();
  const Schema = [
    {
      key: "1",
      label: "Category Image",
      name: "file",
      type: "file-with-preview",

      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "1",
      label: "Category Name",
      name: "name",
      type: "text",

      initialValue: "",
      className: "col-span-12",
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
      formData.append("image", values?.file);
      const res = await mutation(`category`, {
        method: "POST",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        resetForm();
        mutate();
        setOpenDialog(false);
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error Create category"
      );
    }
  };

  return (
    <>
      <div className="w-fit">
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog && setOpenDialog(false)}
        >
          <div className="w-[30rem] bg-white rounded-xl flex flex-col gap-5 items-center p-4">
            <p className="text-xl font-semibold text-gray-800">
              Category Create Form
            </p>
            <div className="w-full p-4 ">
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
                            className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                          >
                            <div className=" text-theme font-semibold">
                              {inputItem.label}
                            </div>
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
                            />
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="flex items-center col-span-12 justify-end flex-col gap-2 pt-2">
                      <Button loading={isLoading} type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default CategoryCreate;
