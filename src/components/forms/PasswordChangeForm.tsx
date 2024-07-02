import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useAuth, useMutation } from "@/hooks";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/core";
interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const PasswordChangeForm = () => {
  const router = useRouter();
  const { mutation, isLoading } = useMutation();
  const { logout } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    props: { resetForm: () => void }
  ) => {
    try {
      // Your API call or any other logic for handling form submission
      const res = await mutation(`user`, {
        method: "PUT",
        body: {
          oldPassword: values.currentPassword,
          password: values.newPassword,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        toast.success(res?.results?.msg);
        logout();
        router.push("/login");
      } else {
        Swal.fire("Error", res?.results?.msg, "error");
      }
      // Reset the form after successful submission
      props.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }: FormikProps<FormValues>) => (
        <Form className="flex flex-col gap-5 w-[90%] items-center">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="currentPassword"
              className="font-medium text-gray-800 text-[1rem]"
            >
              Current Password
            </label>
            <div
              className={`w-full ring-1 p-1 rounded outline-none relative ${
                touched.currentPassword && errors.currentPassword
                  ? "ring-red-500"
                  : "ring-gray-300"
              } hover:ring-blue-400`}
            >
              <Field
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className=" w-full outline-none text-sm md:text-base p-2"
                placeholder="Enter your current password"
              />
              <span
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className=" absolute right-2 top-1/4"
              >
                {showCurrentPassword ? (
                  <BsEyeFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                ) : (
                  <BsEyeSlashFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="currentPassword"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="newPassword"
              className="font-medium text-gray-800 text-[1rem]"
            >
              New Password
            </label>
            <div
              className={`w-full ring-1 p-1 rounded outline-none relative ${
                touched.newPassword && errors.newPassword
                  ? "ring-red-500"
                  : "ring-gray-300"
              } hover:ring-blue-400`}
            >
              <Field
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className=" outline-none w-full text-sm md:text-base p-2"
                placeholder="Enter your new password"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className=" absolute right-2 top-1/4"
              >
                {" "}
                {showNewPassword ? (
                  <BsEyeFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                ) : (
                  <BsEyeSlashFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="confirmPassword"
              className="font-medium text-gray-800 text-[1rem]"
            >
              Confirm New Password
            </label>
            <div
              className={`w-full ring-1 p-1 relative rounded outline-none ${
                touched.confirmPassword && errors.confirmPassword
                  ? "ring-red-500"
                  : "ring-gray-300"
              } hover:ring-blue-400`}
            >
              <Field
                type={showNewConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className=" outline-none p-2 text-sm md:text-base w-full"
                placeholder="Enter confirm password"
              />
              <span
                onClick={() =>
                  setShowNewConfirmPassword(!showNewConfirmPassword)
                }
                className=" absolute right-2 top-1/4"
              >
                {showNewConfirmPassword ? (
                  <BsEyeFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                ) : (
                  <BsEyeSlashFill className="text-xl md:text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />
          </div>
          <Button loading={isLoading} type="submit">
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChangeForm;
