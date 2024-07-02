import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation } from "@/hooks";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ContactReplyModal = ({
  openDialog,
  setOpenDialog,
  mutate,
  item,
}: any) => {
  const { mutation, isLoading } = useMutation();

  const Schema = [
    {
      key: "4",
      label: "User Email",
      name: "email",
      type: "email",
      initialValue: item?.email,
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
      disabled: true,
    },
    {
      key: "12",
      label: "Reply",
      name: "reply",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().optional(),
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

  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const res = await mutation(`contact/reply-email`, {
        method: "POST",
        body: {
          email: item?.email,
          content: values?.reply,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        resetForm();
        mutate();
        setOpenDialog();
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
        <Dialog open={openDialog} maxWidth="sm">
          <div className="lg:w-[35rem] w-[20rem] bg-white rounded-xl flex flex-col gap-5 p-5">
            <div className="flex justify-between p-2">
              <p className="text-xl font-semibold text-gray-800">Email Reply</p>
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
                  <Form className=" grid grid-cols-2 gap-2 md:gap-4 w-full">
                    {Schema.map((inputItem: any) => (
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
                        Sent
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

export default ContactReplyModal;
