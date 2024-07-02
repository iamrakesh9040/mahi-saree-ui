/* eslint-disable @next/next/no-img-element */
import { Dialog, Rating } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
  FormikHelpers,
} from "formik";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";
const CancelOrderForm = ({
  item,
  open,
  close,
  mutate,
  orderId,
  cancelMutate,
}: {
  item: any;
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  orderId: any;
  cancelMutate: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const [files, setFiles] = useState<File[]>([]);
  const Schema = [
    {
      key: "1",
      label: "Title",
      name: "title",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "2",
      label: "Message",
      name: "msg",
      type: "textarea",
      multiline: true,
      rows: 4,
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "Images",
      name: "images",
      type: "file",
      initialValue: [],
      className: "col-span-12",
      validationSchema: Yup.mixed()
        .required("Required")
        .test("fileType", "Required", (value: any) => {
          return files?.length === 0 ? false : true;
        }),
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
  const displayFiles = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const removeFile = (fileToRemove: File, formik: FormikProps<any>) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file !== fileToRemove);
      // Set the "image" field as touched to trigger validation
      formik.setFieldTouched("image", true);
      return newFiles;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
    const droppedFiles = e.dataTransfer.files;
    displayFiles(Array.from(droppedFiles));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<any>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      displayFiles(selectedFiles);

      // Reset the error if files are selected
      const formikTouched = { ...formik.touched };
      formikTouched["image"] = false;
      formik.setTouched(formikTouched);
    } else {
      // Set the error if no files are selected
      const formikErrors = { ...formik.errors };
      formikErrors["image"] = "Required";
      formik.setErrors(formikErrors);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-600");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
  };
  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("msg", values.msg);
      formData.append("order", orderId);
      formData.append("paymentType", item?.paymentMode);
      formData.append("type", "CANCELLED");
      files?.length > 0 &&
        files?.map((item: any) => formData.append("images", item));

      const res = await mutation(`retrieve`, {
        method: "POST",
        isAlert: true,
        body: formData,
        isFormData: true,
      });
      if (res?.status === 200) {
        mutate();
        resetForm();
        toast.success(res?.results?.msg);
        close(false);
        cancelMutate();
        setFiles([]);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        close(false);
        setFiles([]);
      }}
      maxWidth="xl"
    >
      <div className="md:w-[35rem] w-full h-full bg-white gap-2   rounded-lg flex flex-col p-4">
        <div className="flex justify-between gap-2">
          <p className=" text-xl font-medium text-gray-800">Cancel Order</p>
          <p className=" text-gray-600">
            {item?.paymentMode === "ONLINE" ? (
              <p className="bg-green-300 text-white px-2 py-1 rounded-lg">
                {item?.paymentMode}
              </p>
            ) : (
              <p className="bg-red-300 text-white px-2 py-1 rounded-lg">
                {item?.paymentMode}
              </p>
            )}
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
                      className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                    >
                      <div className=" text-theme font-semibold">
                        {inputItem.label}
                      </div>
                      {inputItem.type === "file" ? (
                        <div className=" flex flex-col gap-3">
                          <div className=" flex w-full flex-col gap-1">
                            <div
                              className={`w-full relative border-2 border-dashed rounded-lg p-6
                            ${
                              formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name]
                                ? "border-red-500"
                                : "border-gray-300 "
                            }
                            `}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <input
                                type="file"
                                className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                                onChange={(e) => handleFileChange(e, formik)}
                                multiple
                                accept="" // Accept only CSV files
                              />
                              <div className="text-center">
                                <img
                                  className="mx-auto h-12 w-12"
                                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                  alt=""
                                />

                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer"
                                  >
                                    <span>Drag and drop</span>
                                    <span className="text-[#E24031]">
                                      {" "}
                                      or browse
                                    </span>
                                    <span> to upload</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      multiple
                                      accept=""
                                    />
                                  </label>
                                </h3>
                              </div>
                            </div>
                            {formik?.touched[inputItem?.name] &&
                              formik?.errors[inputItem?.name] && (
                                <div className="text-red-500 text-xs">
                                  {formik?.touched[inputItem?.name] &&
                                    (formik?.errors[inputItem?.name] as any)}
                                </div>
                              )}
                          </div>
                          <div className="  w-full grid grid-cols-5 gap-3 place-content-center">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="text-center py-2 flex flex-col gap-1 "
                              >
                                <div className=" flex flex-col gap-1 items-center">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-14 h-14"
                                  />
                                  <div>
                                    {file.name?.length >= 20
                                      ? file.name?.slice(0, 18) + `...`
                                      : file.name}
                                  </div>
                                </div>
                                <div
                                  className=" cursor-pointer bg-red-50 font-medium text-gray-800 py-1 px-2 rounded-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(file, formik);
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <CustomInputField
                          key={inputItem?.key}
                          name={inputItem?.name}
                          type={inputItem?.type}
                          options={inputItem?.options}
                          value={formik?.values[inputItem?.name]}
                          multiline={inputItem.multiline}
                          rows={inputItem.rows}
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
                      )}
                    </div>
                  )}
                </Field>
              ))}
              <div className="col-span-12 w-full ">
                {item?.paymentMode === "ONLINE" && (
                  <p className=" text-gray-800">
                    {" "}
                    * Paid Amount will be returned to the Payment Source
                  </p>
                )}
              </div>

              <div className="flex items-center col-span-12 justify-end flex-col gap-2 pt-2">
                <Button loading={isLoading} type="submit">
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

export default CancelOrderForm;
