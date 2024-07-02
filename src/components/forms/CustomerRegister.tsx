import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Link from "next/link";
import LoadingButton from "../common/LoadingButton";
import { useAuth, useMutation } from "@/hooks";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(" Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required(" Email is required"),
  phoneNumber: Yup.string().required(" Phone Number is required"),
  referralCode: Yup.string(),
  password: Yup.string()
    .required("New Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
const CustomerRegister = () => {
  const { mutation, isLoading } = useMutation();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const res = await mutation(`user`, {
        method: "POST",
        isAlert: true,
        body: {
          name: values?.name,
          email: values?.email,
          phone: values?.phoneNumber,
          role: "USER",
          password: values?.password,
        },
      });
      if (res?.status === 200) {
        toast.success(res?.results?.msg);
        resetForm();
      } else {
        Swal.fire("Error", res?.results?.msg, "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          countryCode: "",
          phoneNumber: "",
          referralCode: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[1rem] font-semibold text-gray-800">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.name && errors.name ? "ring-red-500" : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.name && errors.name ? "#EF4444" : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[1rem] font-semibold text-gray-800">
                Email<span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="email"
                placeholder="Enter your  email"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.email && errors.email
                    ? "ring-red-500"
                    : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.email && errors.email ? "#EF4444" : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[1rem] font-semibold text-gray-800">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your  phone number"
                  className={`w-full font-normal outline-none ring-1 rounded-md ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                  style={{
                    borderColor:
                      touched.phoneNumber && errors.phoneNumber
                        ? "#EF4444"
                        : "#D1D5DB",
                  }}
                />
              </div>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[1rem] font-semibold text-gray-800">
                Password<span className="text-red-500">*</span>
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.password && errors.password
                    ? "ring-red-500"
                    : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.password && errors.password ? "#EF4444" : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[1rem] font-semibold text-gray-800">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "ring-red-500"
                    : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.confirmPassword && errors.confirmPassword
                      ? "#EF4444"
                      : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <span className="flex items-center justify-center gap-2">
              Already have an account ?{" "}
              <Link
                className="text-sm font-semibold text-primary"
                href="/login"
              >
                Login now
              </Link>
            </span>
            <div className="flex  w-full justify-center">
              <Button loading={isLoading} type="submit">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.section>
  );
};

export default CustomerRegister;
