/* eslint-disable @next/next/no-img-element */
import LoginForm from "@/components/forms/LoginForm";
import { PublicLayout } from "@/layouts";

const Login = () => {
  return (
    <PublicLayout
      title="Sign In | Shree Odisha Handloom"
      ogImage="https://shreyanecom-recent.vercel.app/logo.png"
    >
      <section className="main-container py-10 flex justify-center items-center w-full h-full ">
        <div className="flex gap-1 h-full md:h-[34rem] w-[70rem] border-2 bg-white rounded-2xl shadow-md p-2 items-center justify-center flex-col-reverse md:flex-row">
          <div className="md:w-[50%] h-full  flex flex-col gap-7 justify-center items-center py-10 ">
            <p className="font-bold text-4xl">Welcome Back !</p>
            <p className=" font-semibold text-gray-500 text-center md:px-0 px-10">
              Hey enter your details to Login into your account
            </p>

            <LoginForm />
          </div>
          <div className="md:w-[50%] h-full flex  ">
            <img
              src="/SignIn.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Login;
