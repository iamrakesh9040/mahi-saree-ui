/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useMutation from "@/hooks/useMutation";
import useAuth from "@/hooks/useAuth";
import { Dialog } from "@mui/material";
import { Button } from "@/core";

interface ProfileUpdateFormProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  open,
  onClose,
}) => {
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { mutation, isLoading } = useMutation();
  const { user, getUser } = useAuth();

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setProfileImage(URL.createObjectURL(imageFile));
      setSelectedImage(imageFile);
    }
  };

  const initialValues = useMemo(() => {
    return {
      name: user?.name,
      phone: user?.phone,
      gender: user?.gender,
      profileImage: "",
    };
  }, [user?.name, user?.phone, user?.gender]);

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      if (selectedImage !== null) {
        formData.append("image", selectedImage);
      }
      const res = await mutation(`user/update/${user?._id}`, {
        method: "PUT",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status === 200) {
        toast.success("Profile updated successfully");
        getUser();
        onClose();
        resetForm();
        setProfileImage("");
        setSelectedImage(null);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="xl">
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-[30rem] relative">
          <FaX
            onClick={() => {
              onClose();
              setProfileImage("");
              setSelectedImage(null);
            }}
            className="absolute top-3 right-4 cursor-pointer text-red-600"
          />
          <h2 className="text-xl text-center mb-4">Update Profile</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center ">
                  {selectedImage && (
                    <div className="">
                      <img
                        src={profileImage}
                        alt="Selected"
                        className="w-28 h-28 rounded-full"
                      />
                    </div>
                  )}
                  <div className=" flex flex-col gap-3 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                      <label
                        className="w-full h-full flex items-center justify-center object-cover bg-slate-100 cursor-pointer"
                        htmlFor="fileInput"
                      >
                        Click to <br />
                        Upload
                      </label>
                      <Field
                        type="file"
                        id="fileInput"
                        className="hidden"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="">
                  <label className="block mb-2 font-medium">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full border rounded p-2 outline-none"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full flex flex-col ">
                  <label className="block font-medium">Phone Number</label>
                  <div className=" flex flex-col gap-1">
                    <Field
                      type="text"
                      name="phone"
                      className="w-full border rounded p-2 outline-none"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="">
                  <label className="block mb-1 font-semibold">Gender</label>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label className="mb-2 cursor-pointer flex items-center gap-2">
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        className="cursor-pointer w-4 h-4"
                        defaultChecked={values?.gender === "MALE"}
                      />
                      <span>Male</span>
                    </label>
                    <label className="mb-2 cursor-pointer flex items-center gap-2">
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        className="cursor-pointer w-4 h-4"
                        defaultChecked={values?.gender === "FEMALE"}
                      />
                      <span>Female</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                      <Field
                        type="radio"
                        name="gender"
                        value="other"
                        className="cursor-pointer w-4 h-4"
                        defaultChecked={values?.gender === "OTHER"}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-end gap-1">
                  <Button loading={isLoading} type="submit">
                    Update
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

export default ProfileUpdateForm;
