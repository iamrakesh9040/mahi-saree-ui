import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation } from "@/hooks";
import { Drawer } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
// import { Button } from "../core";

type Props = {
  open: boolean;
  onClose: () => void;
  mutate: () => void;
};

const AddFAQDrawer = ({ open, onClose, mutate }: Props) => {
  const { mutation, isLoading } = useMutation();
  const variantProductSchema = [
    {
      key: "1",
      label: "Question",
      name: "question",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "2",
      label: "Answer",
      name: "answer",
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
  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    // return console.log("chk", values);
    try {
      const res = await mutation(`faq`, {
        method: "POST",
        body: {
          question: values?.question,
          answer: values?.answer,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        resetForm();
        onClose();
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[30vw] flex flex-col">
        <h1 className="p-3 md:p-5 bg-black sub-title text-white">Create FAQ</h1>
        <div className="p-3 md:p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleOperation}
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
                <div className="flex w-full items-center col-span-12 justify-center   gap-2 pt-2">
                  <Button loading={isLoading} type="submit">
                    SAVE FAQ
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

export default AddFAQDrawer;
