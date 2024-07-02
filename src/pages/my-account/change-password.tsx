import { PasswordChangeForm } from "@/components/forms";
import { PublicLayout } from "@/layouts";
import AccountLayout from "@/layouts/my-account";

const ChangePassword: React.FC = () => {
  return (
    <PublicLayout>
      <AccountLayout>
        <div className="flex justify-center items-center">
          <div className="w-[35rem] rounded-lg p-8 flex flex-col gap-10 items-center bg-white shadow-[0px_0px_2px_1px_#00000024]">
            <p className="font-semibold text-2xl md:text-3xl text-gray-800">
              CHANGE PASSWORD
            </p>
            <PasswordChangeForm />
          </div>
        </div>
      </AccountLayout>
    </PublicLayout>
  );
};

export default ChangePassword;