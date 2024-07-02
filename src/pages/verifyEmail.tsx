/* eslint-disable @next/next/no-img-element */

import useSwr from "@/hooks/useSwr";
import Link from "next/link";
import { useRouter } from "next/router";

const UserVerification = () => {
  const router = useRouter();

  const { data, isValidating } = useSwr(
    router?.query?.token && router?.query?.id
      ? `user/verifyEmail?token=${router?.query?.token}&id=${router?.query?.id}`
      : ``
  );
  return (
    <div className="w-full h-screen items-center justify-center flex ">
      <div className="bg-white p-6 flex flex-col gap-4 items-center  md:mx-auto shadow-[0px_0px_5px_2px_#00000024] rounded-xl">
        {isValidating ? (
          <img
            className=" w-24 h-24 object-contain"
            src="/home/waiting.png"
            alt=""
          />
        ) : data ? (
          <img
            className=" w-24 h-24 object-contain"
            src="/home/success.png"
            alt=""
          />
        ) : (
          <img
            className=" w-24 h-24 object-contain"
            src="/home/cancel.png"
            alt=""
          />
        )}

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {isValidating
              ? "User Verifying !"
              : data
              ? "User Verified Successfully!"
              : "User verification failed !"}
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure login process.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            {data ? (
              <Link
                href="/login"
                className="px-12 uppercase bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                login here
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;
