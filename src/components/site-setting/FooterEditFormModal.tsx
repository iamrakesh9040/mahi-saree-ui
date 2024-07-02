import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation } from "@/hooks";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FooterEditFormModal = ({
  openDialog,
  setOpenDialog,
  mutate,
  item,
}: any) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { mutation, isLoading } = useMutation();

  const Schema = [
    {
      key: "1",
      label: "Title",
      name: "title",
      type: "text",
      initialValue: item?.title,
      className: "lg:col-span-12 col-span-6",
      validationSchema: Yup.string().required("Required"),
    },

    {
      key: "2",
      label: "Description",
      name: "description",
      type: "text",
      initialValue: item?.description,
      className: "lg:col-span-12 col-span-6",
      validationSchema: Yup.string().optional(),
    },

    {
      key: "3",
      label: "Footer Image",
      name: "footerImages",
      type: "file-with-preview",
      initialValue: item?.image,
      className: "col-span-12",
      validationSchema: Yup.mixed().required("Required"),
    },
  ];

  const initialValues: { [key: string]: string } = Schema.reduce(
    (accumulator: { [key: string]: string }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );

  const validationSchema: { [key: string]: Yup.StringSchema } = Schema.reduce(
    (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  const handleOperation = async (id: any) => {
    try {
      const formData = new FormData();
      formData.append("title", item?.title);
      formData.append("description", item?.description);
      formData.append("images", item?.footerImages);
      const res = await mutation(`footer/${id}`, {
        method: "PUT",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        mutate();
        setIsEditFormVisible(true);
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-fit">
        <Dialog open={openDialog} maxWidth="md">
          <div className="w-[30rem] bg-white rounded-xl flex flex-col gap-5 p-5">
            <div className="flex justify-between p-2">
              <p className="text-xl font-semibold text-gray-800">
                Update Footer Form
              </p>
              <p
                onClick={() => setOpenDialog(false)}
                className="text-red-400 cursor-pointer"
              >
                <Close />
              </p>
            </div>
            <div className="w-full p-4 ">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleOperation}
              >
                {(formik) => (
                  <Form className="lg:grid lg:grid-cols-12 flex flex-col pt-5 gap-2 md:gap-4 w-full">
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
                              label={inputItem?.label}
                            />
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                      <Button loading={isLoading} type="submit">
                        Save
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

export default FooterEditFormModal;
