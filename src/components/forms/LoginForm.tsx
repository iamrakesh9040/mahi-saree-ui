import { Button } from "@/core";
import { useAuth, useMutation } from "@/hooks";
import { saveToLocalStorage } from "@/utils";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill, BsLockFill } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const { mutation, isLoading } = useMutation();
  const { getUser } = useAuth();
  const handleLoginSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const res = await mutation(`user/login`, {
        method: "POST",
        body: {
          email: values?.email,
          password: values?.password,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        res?.results?.token &&
          saveToLocalStorage("ACCESS_TOKEN", res?.results?.token);
        await getUser();
        if (res?.results?.data?.role === "ADMIN") {
          push("/admin");
        } else {
          push("/my-account");
        }
        resetForm();
        toast.success("Login Successful");
      } else {
        Swal.fire("Error", res?.results?.msg, "error");
      }
    } catch (error) {
      Swal.fire(
        "Info",
        "Server not available, Please try after sometime!",
        "info"
      );
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
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4 justify-center w-full lg:px-20 px-10">
            <div className="relative z-0 w-full flex flex-col gap-3 border-b-2 rounded-sm ">
              <p className="text-gray-600">User Email</p>
              <span
                className={`flex items-center gap-3 ${
                  errors.email && touched.email ? "error-border" : ""
                }`}
              >
                <MdMarkEmailUnread className="text-3xl text-primary " />
                <Field
                  id="email"
                  type="text"
                  name="email"
                  className={`outline-none w-full px-3  border-gray-600 text-gray-600 ${
                    errors.email && touched.email ? "border-red-600" : ""
                  }`}
                  placeholder="Enter your email"
                />
              </span>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-600"
              />
            </div>

            <div className="relative z-0 w-full flex flex-col gap-3 border-b-2 rounded-sm ">
              <p className="text-gray-600">Password</p>
              <span
                className={`flex items-center gap-3 justify-between ${
                  errors.password && touched.password ? "error-border" : ""
                }`}
              >
                <BsLockFill className="text-3xl text-primary" />
                <Field
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`outline-none w-full px-3  border-gray-600 text-gray-600 ${
                    errors.password && touched.password ? "border-red-600" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <BsEyeFill className="text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                  ) : (
                    <BsEyeSlashFill className="text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                  )}
                </span>
              </span>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-600"
              />
            </div>

            <span className="flex justify-end">
              <Link
                className="text-sm font-semibold text-primary"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </span>

            <span className="flex items-center justify-center gap-2">
              {"Don't"} have an account ?{" "}
              <Link
                className="text-sm font-semibold text-primary"
                href="/register"
              >
                Register now
              </Link>
            </span>

            <span className="flex justify-center items-center">
              <Button loading={isLoading} type="submit">
                Login
              </Button>
            </span>
          </Form>
        )}
      </Formik>
    </motion.section>
  );
};

export default LoginForm;
