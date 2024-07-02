

import { Button } from "@/core";
import { Dialog, Drawer } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import { MdCancel, MdDeleteOutline, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import * as Yup from "yup";

const EditProductImage = ({ openDialog, setOpenDialog, data, mutate }: any) => {
    const [open, setOpen] = useState(false)
    const deleteImage = async (item: any) => {
        // try {
        //     const res = await mutation(`product`, {
        //         method: "DELETE",
        //         body: {
        //             prodId: data?._id,
        //             imageId: item?._id,
        //             imagePath: item?.imagePath
        //         },
        //         isAlert: true
        //     })
        //     if (res?.status === 200) {
        //         toast.success(res?.results?.msg)
        //         mutate()
        //         setOpenDialog(false)
        //     } else {
        //         toast.error(res?.results?.msg)
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    return (
        <>
            <AddNewImageDialog openDialog={open} setOpenDialog={setOpen} mutate={mutate} prodId={data?.id} parentDialog={setOpenDialog} />
            <Drawer
                open={openDialog && openDialog}
                onClose={() => setOpenDialog && setOpenDialog(false)}
                anchor="right"
            >
                <div className="w-[20rem] h-screen flex flex-col gap-2 relative">
                    {/* {
                        isLoading && <p className=" absolute z-30 left-0 w-full h-full flex items-center justify-center">
                            <CustomLoader />
                        </p>
                    } */}
                    <div className="w-full  px-5 py-5 bg-blue-950 text-white font-medium flex items-center relative">
                        Product Image Update
                        <MdCancel
                            className="absolute top-5 right-2 text-2xl text-red-500 cursor-pointer"
                            onClick={() => setOpenDialog && setOpenDialog(false)}
                        />
                    </div>
                    <div className="w-full px-1 rounded-lg  flex items-center justify-center">
                        <p onClick={() => setOpen(true)} className=" w-full border text-gray-800 flex items-center rounded-lg justify-center py-2 cursor-pointer hover:bg-primary/50 hover:text-white font-medium duration-200">Add New Image</p>
                    </div>
                    <div className=" w-full grid grid-cols-1 gap-5 p-4">
                        {
                            data?.images?.map((item: any, i: number) => (
                                <div key={i} className="w-full h-32 border p-2 rounded-lg flex items-center justify-center relative">
                                    <p onClick={() => deleteImage(item)} className=" absolute top-2 right-2 flex flex-col gap-4">
                                        <MdDeleteOutline className="text-2xl text-red-700 cursor-pointer" />
                                    </p>
                                    <img src={item?.imageUrl} alt="" className=" w-full h-full  object-contain" />
                                </div>
                            ))
                        }

                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default EditProductImage;


const AddNewImageDialog = ({ openDialog, setOpenDialog, mutate, prodId, parentDialog }: any) => {
    // const { mutation, isLoading } = useMutation()
    const [files, setFiles] = useState<File[]>([]);
    const Schema = [


        {
            key: "5",
            label: "Product Image",
            name: "productImages",
            type: "file",
            initialValue: [],
            className: "col-span-12",
            validationSchema: Yup.mixed().optional()
            ,
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
            formik.setFieldTouched('image', true);
            return newFiles;
        });
    };


    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-indigo-600");
        const droppedFiles = e.dataTransfer.files;
        displayFiles(Array.from(droppedFiles));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>) => {
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
    const handleOperation = async (values: any, { resetForm }: FormikHelpers<any>) => {
        // try {
        //     const formData = new FormData();
        //     files?.map((item, i) => (
        //         formData.append("image", item)
        //     ))
        //     const res = await mutation(`product/addNewImage/${prodId}`, {
        //         method: "POST",
        //         body: formData,
        //         isFormData: true,
        //         isAlert: true,

        //     })
        //     if (res?.status === 200) {
        //         mutate()
        //         resetForm();
        //         setOpenDialog(false)
        //         parentDialog(false)
        //         setFiles([]);

        //         toast.success(res?.results?.msg)
        //     } else {
        //         toast.success(res?.results?.msg)
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    return (
        <Dialog
            open={openDialog && openDialog}
            onClose={() => {
                setOpenDialog && setOpenDialog(false)
                setFiles([])
            }}
            maxWidth="xl"
        >
            <div className="w-[60rem] p-4 flex flex-col gap-8 relative">

                <p onClick={() => setOpenDialog(false)} className=" absolute top-3 right-3 z-10">
                    <MdCancel className=" text-2xl text-red-500 cursor-pointer" />
                </p>
                <p className="font-semibold text-gray-800 text-xl">Add Product New Image</p>
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

                                            <div className=" flex flex-col gap-3">
                                                <div className="font-semibold text-themeDarkGray">
                                                    {inputItem.label}
                                                </div>
                                                <div className=" flex w-full flex-col gap-1">
                                                    <div
                                                        className={`w-full relative border-2 border-dashed rounded-lg p-6
                            ${formik?.touched[inputItem?.name] &&
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
                                        </div>
                                    )}
                                </Field>
                            ))}
                            <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                                <Button
                                    // loading={isLoading}
                                    disabled={files?.length === 0}
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
    )
}