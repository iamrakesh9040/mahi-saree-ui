import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/core/InputField";
import LoadingButton from "@/core/LoadingButton";
import { BiCommentAdd } from "react-icons/bi";

type Props = {
  open: any;
  onClose: () => void;
};
interface FormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTestimonialDrawer = ({ open, onClose }: Props) => {
  const [id, setId] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const testimonialDetailsSchema = [
    {
      key: 1,
      name: "fullName",
      label: "Full Name",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string()

        .required("Name is required")
        .min(3, "Name should be minimum 3 characters long")
        .matches(/^[a-zA-Z\s]*$/, "numeric value not accepted"),
    },
    {
      key: 2,
      name: "designation",
      label: "Designation",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string().required("Designation is required"),
    },

    {
      key: 3,
      name: "quote",
      label: "Quote ",
      initialValue: "",
      required: true,
      multiline: true,
      rows: 4,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string().required("Quote is required"),
    },
    {
      key: 4,
      name: "file",
      label: "Upload Image ",
      initialValue: "",
      required: true,
      type: "file",
      className: "col-span-12",
      validationSchema: Yup.string().required("Image is required"),
    },
  ];

  const initialValues = testimonialDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema: { [key: string]: Yup.StringSchema } =
    testimonialDetailsSchema.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );

  const handleSubmit = async (values: any, props: any) => {
    console.log(values);
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="w-[40vw] flex flex-col  ">
        <h1 className="p-3 md:p-5 bg-primary sub-title text-white">
          Add Testimonial
        </h1>
        <div className="p-3 md:p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {testimonialDetailsSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: FieldProps<string>) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="font-semibold text-themeDarkGray">
                          {inputItem.label} {inputItem?.required ? "*" : ""}
                        </div>

                        <div className="col-span-6 w-full">
                          <InputField
                            key={
                              inputItem.name === "file" ? id : inputItem?.key
                            }
                            id={id}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              inputItem?.name === "file" && file
                                ? false
                                : Boolean(
                                    formik?.touched[inputItem?.name] &&
                                      formik?.errors[inputItem?.name]
                                  )
                            }
                            helperText={
                              formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name]
                            }
                            formik={formik}
                            setIsImage={setFile}
                            image={file}
                            onFileChange={(e) => {
                              e.target.files && setFile(e.target.files[0]);
                              formik.setFieldValue("file", e?.target?.files);
                            }}
                            fileAccept="image/*"
                            setId={setId}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                  <LoadingButton
                    type="submit"
                    sx="w-full bg-primary text-white h-10 flex items-center justify-center gap-2"
                    disabled={formik.isSubmitting || formik.isValidating}
                    circularProgressClass="loading-sm text-secondary"
                  >
                    <div className="flex items-center gap-2">
                      <BiCommentAdd className="text-xl mt-0.5" />
                      Add Testimonial
                    </div>
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Drawer>
  );
};

export default EditTestimonialDrawer;