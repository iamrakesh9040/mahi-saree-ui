import useMutation from '@/hooks/useMutation';
import useSwr from '@/hooks/useSwr';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoMdEyeOff } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from "yup";
const ForgotPasswordEndForm = ({ setShow }: any) => {
    const { mutation, isLoading } = useMutation()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [timer, setTimer] = useState(180); // 3 minutes in seconds
    const router = useRouter()
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            toast.error("Your Otp is expired")
            setTimer(0);
            setShow("EMAIL")
        }
    }, [timer]);

    const LoginSchema = Yup.object({
        otp: Yup.number().required("This field is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleFormSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const res = await mutation(`customer/verifyPassword`, {
                method: "POST",
                body: {
                    otp: String(values.otp),
                    password: values.password
                }
            })
            if (res?.status === 200) {
                router.push("/login")
                toast.success("Password Changed successfully !")

            } else {
                toast.error(res?.results?.msg)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='flex w-full h-full flex-col gap-7 justify-between z-30 px-6 py-8 rounded-xl bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] relative'>
            <div className='w-full h-fit flex items-center justify-center'>
                <img
                    src="/logo.png"
                    className="w-[15rem] h-fit object-contain"
                    alt=""
                />
            </div>
            <div className='w-full h-full flex flex-col gap-2'>
                <p className='text-lg font-semibold text-gray-700'>Reset Password? 🔒</p>
                <p className='text-sm font-normal text-gray-500'>Enter your otp to reset your password.</p>
                <p className="font-semibold text-gray-700">Your OTP will expire in : <span className='text-red-500'>{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span></p>
            </div>


            <Formik
                initialValues={{
                    otp: null,
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleFormSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="w-full flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="uppercase text-xs font-medium px-1 text-gray-500">
                                OTP
                            </label>
                            <Field
                                type="number"
                                name="otp"
                                className={`outline-none border ${touched.otp && errors.otp
                                    ? "border-red-500"
                                    : "border-gray-200"
                                    } px-4 py-3 rounded-lg placeholder:text-sm`}

                            />
                            {touched.otp && errors.otp && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.otp}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full relative">
                            <p
                                onClick={() => setShowPassword(!showPassword)}
                                className=" absolute top-10 right-2"
                            >
                                {showPassword ? (
                                    <IoMdEyeOff className="text-xl cursor-pointer text-gray-400" />
                                ) : (
                                    <MdOutlineRemoveRedEye className="text-xl cursor-pointer text-gray-400" />
                                )}
                            </p>
                            <p className="text-gray-500 uppercase text-sm font-medium">
                                Password
                            </p>
                            <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`outline-none border placeholder:text-sm  rounded-md py-2 px-4 w-full ${errors.password && touched.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}

                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full relative">
                            <p
                                onClick={() => setShowConfirmPassword(!showPassword)}
                                className=" absolute top-10 right-2"
                            >
                                {showConfirmPassword ? (
                                    <IoMdEyeOff className="text-xl cursor-pointer text-gray-400" />
                                ) : (
                                    <MdOutlineRemoveRedEye className="text-xl cursor-pointer text-gray-400" />
                                )}
                            </p>
                            <p className="text-gray-500 uppercase text-sm font-medium">
                                Confirm Password
                            </p>
                            <Field
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`outline-none border placeholder:text-sm  rounded-md py-2 px-4 w-full ${errors.confirmPassword && touched.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}

                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-2.5 shadow-md text-sm font-medium text-white bg-primary rounded-lg"
                        >
                            {isLoading ? (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                `SUBMIT`
                            )}
                        </button>
                        <p className="w-full flex items-center justify-center gap-2">
                            <span className="text-sm font-medium text-primary">
                                <IoIosArrowBack />
                            </span>
                            <p
                                onClick={() => setShow("EMAIL")}
                                className="text-sm font-medium text-primary cursor-pointer"
                            >
                                Back to send otp?
                            </p>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPasswordEndForm