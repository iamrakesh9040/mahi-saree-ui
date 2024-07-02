// import { CustomerRegister, OrganizationRegister } from "@/components/forms";
import CustomerRegister from "@/components/forms/CustomerRegister";
import { PublicLayout } from "@/layouts";

const Register = () => {
  return (
    <PublicLayout title="SignUp | Shree Odisha Handloom" ogImage="https://shreyanecom-recent.vercel.app/logo.png">
      <section className="main-container py-10 flex  w-full h-full items-center justify-center">
        <div className="flex flex-col md:flex-row gap-1 h-full md:w-[80%] w-full items-center justify-center  bg-white rounded-2xl p-2 border-2">
          <div className="w-full flex justify-center ">
            <img
              src="/SignIn.png"
              alt="image"
              className="w-[30rem] h-full object-contain"
            />
          </div>
          <div className="w-full h-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex gap-3 flex-col justify-center items-center rounded-lg py-10">
            <p className="title mb-1">Welcome!</p>
            <p className="text-slate-800 mb-1">
              Hey enter your details to create your account
            </p>

            <div className="md:w-2/3 px-10 md:px-0">
              <CustomerRegister />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Register;
