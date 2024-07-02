/* eslint-disable @next/next/no-img-element */
import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation, useSwr } from "@/hooks";
import { AdminLayout } from "@/layouts";
import { Delete } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Banner = () => {
  const [open, setOpen] = useState(false);
  const { data, mutate, isValidating } = useSwr(`banner`);
  const { isLoading, mutation } = useMutation();

  const deleteOperation = async (id: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A5B",
      cancelButtonColor: "#3AAF9F",
      confirmButtonText: "Yes, Delete!",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        const res = await mutation(`banner/${id}`, {
          method: "DELETE",
          isAlert: true,
        });
        if (res?.status === 200) {
          toast.success(res?.results?.msg);
          mutate();
        } else {
          toast.error(res?.results?.msg);
        }
      }
    });
  };

  return (
    <>
      <AddNewBanner open={open} close={setOpen} />
      <AdminLayout>
        <div className="px-4 py-4 h-full overflow-y-auto flex flex-col gap-6">
          <div
            className={`md:text-lg text-xs font-bold text-primary  gap-3 flex lg:items-center  lg:flex-row flex-col gap-3`}
          >
            <div className=" flex items-center gap-3">
              <MdGroups2 className="text-xl" />
              <p>Banner Images</p>
            </div>
            <div className=" flex items-center gap-1 bg-primary px-2 py-1.5 rounded-md cursor-pointer">
              <BiAddToQueue className=" text-white text-xl" />

              <p
                onClick={() => setOpen(true)}
                className=" text-white text-sm font-medium tracking-wider"
              >
                Add New Banner
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            {data?.map((item: any) => (
              <div key={item?._id} className="flex items-end relative">
                <img
                  src={item?.image}
                  alt="bannerImage"
                  className=" rounded-md w-full h-fit object-cover"
                />
                <div
                  onClick={() => deleteOperation(item?._id)}
                  className="absolute top-0 right-0 p-2 cursor-pointer"
                >
                  <Delete className="text-red-500 text-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Banner;

const AddNewBanner = ({ open, close }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const { data, pagination, mutate, isValidating } = useSwr(`banner`);
  const { isLoading, mutation } = useMutation();

  const Schema = [
    {
      key: "5",
      label: "Banner Image",
      name: "image",
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
  const displayFiles = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const resetFiles = () => {
    setFiles([]);
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

  const handleBannerUpload = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const formData = new FormData();
      files?.map((item) => formData.append("image", item));
      const res = await mutation(`banner`, {
        method: "POST",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        setFiles([]);
        mutate();
        close();
        resetForm();
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      PaperProps={{
        style: {
          borderRadius: 18,
        },
      }}
    >
      <div className="lg:w-[40rem] w-[20rem] p-5 flex flex-col gap-6">
        <p className="text-gray-900 font-semibold text-xl w-full flex items-center justify-between">
          <span>Add New Banner</span>
          <span onClick={() => close(false)} className=" cursor-pointer">
            {" "}
            <IoClose className="text-3xl text-red-500" />
          </span>
        </p>
        <div className="p-10 shadow-[0px_0px_5px_1px_#00000024] bg-white rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleBannerUpload}
          >
            {(formik) => (
              <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
                {Schema.map((inputItem: any) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: FieldProps<string>) => (
                      <div
                        className={`flex flex-col justify-start gap-2 ${inputItem.className}`}
                      >
                        {inputItem.type === "file" ? (
                          <div className=" flex flex-col gap-3">
                            <div className="font-semibold text-themeDarkGray">
                              {inputItem.label}
                            </div>
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
                            <div className="w-full grid grid-cols-5 gap-3 place-content-center">
                              {files.map((file, index) => (
                                <div
                                  key={index}
                                  className="text-center py-2 flex flex-col gap-1"
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
                        )}
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex w-full items-center col-span-12 justify-center  gap-2 pt-2">
                  <Button loading={isLoading} type="submit">
                    Save Banner
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};
