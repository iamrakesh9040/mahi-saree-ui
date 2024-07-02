import { PublicLayout } from "@/layouts";
import React from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@/hooks";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface TextAreaProps {
  rows: number;
  cols: number;
  placeholder: string;
  className: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const { isLoading, mutation } = useMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await mutation(`contact`, {
          method: "POST",
          body: {
            email: values?.email,
            name: values?.name,
            query: values?.message,
          },
          isAlert: true,
        });
        if (res?.status === 200) {
          toast.success(res?.results?.msg);
          resetForm();
          setSubmitting(true);
        } else {
          toast.error(res?.results?.msg);
        }
      } catch (error) {
        Swal.fire(
          "Info",
          "Server not available, Please try after sometime!",
          "info"
        );
      }
    },
  });

  return (
    <PublicLayout
      title="Contact Us | Shree Odisha Handloom"
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <main className="main-container relative  md:px-60 md:py-10 py-5  w-full">
        <aside className="group relative flex  md:flex-row flex-col justify-between md:gap-12 md:p-7 p-5 md:h-[39rem]  overflow-hidden  bg-teal-700 shadow-lg rounded-2xl hover:shadow-cyan-3003">
          <p className="absolute p-14 rounded-full bg-cyan-400 -right-8 -top-8 z-0"></p>
          <p className="absolute p-12 rounded-full bg-cyan-500 -bottom-5 right-96 z-0"></p>
          <p className="absolute p-12 rounded-full bg-orange-400 -top-5 -left-5"></p>
          <p className="absolute p-12 rounded-full bg-lime-400 top-20 left-56"></p>

          <div className="flex flex-col justify-evenly md:gap-5 gap-1 p-3  md:w-[50%] rounded-3xl z-10">
            <h1 className="font-bold md:text-5xl text-3xl font-sub text-white group-hover:scale-110 duration-500">
              Lets talk about everything !
            </h1>
            <p className="font-semibold text-justify font-sub text-teal-50">
              Get real answers from verified users and our software experts!
            </p>
            <aside className="h-full w-full overflow-hidden">
              <img
                src="contact.png"
                className="object-contain w-full h-[23rem] group-hover:scale-110 duration-500"
                alt="Contactimage"
              />
            </aside>
          </div>
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center gap-3 px-10 py-5 md:py-0 md:w-[40%]  bg-white shadow-lg  rounded-xl z-10"
          >
            <aside className="flex flex-col gap-3">
              <h2 className="font-sub font-bold md:text-2xl text-xl group-hover:scale-110 duration-500">
                Have A Question In Mind?
              </h2>
              <p className="w-24 h-1 bg-teal-400"></p>
            </aside>
            <aside className="flex flex-col gap-2  w-full">
              <label
                htmlFor="name"
                className="uppercase text-sm font-bold text-slate-500 font-sub"
              >
                Your Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`check ring-2  outline-none ring-gray-300 focus:ring-3 focus:ring-green-500 rounded-md p-2  font-semibold text-slate-500 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your full name !"
              />
              <p id="nameerror" className="text-red-500">
                {formik.touched.name && formik.errors.name}
              </p>
            </aside>
            <aside className="flex flex-col gap-2  w-full">
              <label
                htmlFor="name"
                className="uppercase text-sm font-bold text-slate-500 font-sub"
              >
                Your Email<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`check ring-2  outline-none ring-gray-300 focus:ring-3 focus:ring-green-500 rounded-md p-2  font-semibold text-slate-500 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your Email !"
              />
              <p id="nameerror" className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </p>
            </aside>

            <aside className="flex flex-col gap-2  w-full">
              <label
                htmlFor="message"
                className="uppercase text-sm font-bold text-slate-500 font-sub"
              >
                Your Query<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`check ring-2  outline-none ring-gray-300 focus:ring-3 focus:ring-green-500 rounded-md p-2  font-semibold text-slate-500 ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your queries !"
                rows={5}
                cols={0}
              />
              <p id="messageerror" className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </p>
            </aside>

            <div className="relative flex flex-col justify-center gap-3 ">
              <p id="successMessage" className="text-green-500"></p>
              <button
                type="submit"
                disabled={isLoading}
                className="font-sub px-10 py-2 bg-blue-800 text-white font-bold uppercase rounded-lg hover:scale-105 duration-500"
              >
                {isLoading ? "Submitting..." : "Send mesage"}
              </button>
            </div>
          </form>
        </aside>
      </main>
    </PublicLayout>
  );
};

export default Contact;
