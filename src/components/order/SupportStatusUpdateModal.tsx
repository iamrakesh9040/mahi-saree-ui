import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation } from "@/hooks";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const SupportStatusUpdateModal = ({
  openDialog,
  setOpenDialog,
  mutate,
  item,
}: any) => {
  const { mutation, isLoading } = useMutation();
  const Schema = [
    {
      key: "1",
      label: "Status Type",
      name: "status",
      type: "select",
      initialValue: item?.status,
      options: [
        {
          label: "PENDING",
          value: "PENDING",
        },
        {
          label: "PROCESS",
          value: "PROCESS",
        },
        {
          label: "RESOLVED",
          value: "RESOLVED",
        },
      ],
      className: "col-span-12",
      validationSchema: Yup.string().required("Required").optional(),
    },
    {
      key: "2",
      label: "Reply",
      name: "reply",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
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
      const res = await mutation(`support/${item?.id}`, {
        method: "PUT",
        body: {
          status: values?.status,
          reply: values?.reply,
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
          <div className="w-[30rem] bg-white rounded-xl flex flex-col gap-5 p-5">
            <div className="flex justify-between p-2">
              <p className="text-xl font-semibold text-gray-800">
                Status Update Form
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
                  <Form className="grid grid-cols-12 gap-2 md:gap-4 w-full">
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
                              label={inputItem.label}
                            />
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                      <Button loading={isLoading} type="submit">
                        Status Update
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

export default SupportStatusUpdateModal;
