import OrganizationRegister from "@/components/forms/SellerRegistration";

const SellerRegistration = () => {
  return (
    <section
      className="main-container top-spacing flex flex-col gap-10 w-full"
      id="registration"
    >
      <div className="w-full h-fit relative flex flex-col gap-10 ">
        <p className="w-full text-start flex flex-col gap-1 ">
          <span className="sub-title">Become A Seller On YardHealth</span>
          <span className=" w-40 h-0.5 bg-primary rounded-full"></span>
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <div className="w-full md:w-2/3 bg-slate-50 p-4 md:p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <OrganizationRegister />
        </div>
      </div>
    </section>
  );
};

export default SellerRegistration;
