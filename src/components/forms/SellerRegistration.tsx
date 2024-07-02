import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import InputField from "@/core/InputField";
import { useState } from "react";
import LoadingButton from "@/core/LoadingButton";
import { BiCommentAdd } from "react-icons/bi";

const apiKey = "1190f33fcecf16326933c482a0615993";

const fetchData = async (GSTINNumber: any) => {
  try {
    const apiUrl = `http://sheet.gstincheck.co.in/check/${apiKey}/${GSTINNumber}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Handle the API response data
    return data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    throw error;
  }
};

const SellerRegistration = () => {
  const [id, setId] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const sellerDetailsSchema = [
    {
      key: 1,
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter Your Full Name",
      initialValue: "",
      required: true,
      type: "text",
      className: "md:col-span-6 col-span-12",
      validationSchema: Yup.string()

        .required("Name is required")
        .min(3, "Name should be minimum 3 characters long")
        .matches(/^[a-zA-Z\s]*$/, "numeric value not accepted"),
    },
    {
      key: 2,
      name: "storeDisplayName",
      label: "Store Display Name",
      placeholder: "Enter Store Display Name",
      initialValue: "",
      required: true,
      type: "text",
      className: "md:col-span-6 col-span-12",
      validationSchema: Yup.string()

        .required("Store Display Name is required")
        .min(3, "Store Display Name should be minimum 3 characters long")
        .matches(/^[a-zA-Z\s]*$/, "numeric value not accepted"),
    },
    {
      key: 3,
      name: "storeDescription",
      label: "Store Description",
      placeholder: "Enter Store Description",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string()

        .required("Store Description is required")
        .min(3, "Store Description should be minimum 10 characters long")
        .matches(/^[a-zA-Z\s]*$/, "numeric value not accepted"),
    },
    {
      key: 4,
      name: "phoneNumber",
      label: "Phone",
      placeholder: "Enter 10-digit Mobile Number",
      initialValue: "",
      required: true,
      type: "text",
      className: "md:col-span-6 col-span-12",
      validationSchema: Yup.string()
        .matches(/^[0-9]+$/, "Invalid number")
        .required("Phone number is required")
        .test("startsWith5or7or8or9", "Invalid number", (value) =>
          /^[5-9]/.test(value)
        )
        .min(10, "Minimum 10 digits")
        .max(10, "Maximum 10 digits")
        .test("noRepeatedDigits", "Invalid number", (value) => {
          const repeatedDigitPattern = /(\d)\1{4}/;
          return !repeatedDigitPattern.test(value);
        }),
    },
    {
      key: 5,
      name: "emailAddress",
      label: "Email Address",
      placeholder: "Enter Your Email Address",
      initialValue: "",
      required: true,
      type: "email",
      className: "md:col-span-6 col-span-12",
      validationSchema: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
    },
    // {
    //   key: 6,
    //   name: "storeAddress",
    //   label: "Store Address",
    //   placeholder: "Enter Your Store Address",
    //   initialValue: "",
    //   multiline: true,
    //   required: true,
    //   rows: 4,
    //   type: "text",
    //   className: "col-span-12",
    //   validationSchema: Yup.string().required("Store Address is required"),
    //   fieldType: "address",
    // },
    // {
    //   key: 7,
    //   name: "storePincode",
    //   label: "Store Pincode ",
    //   placeholder: "Enter 6-digit Store Pincode",
    //   initialValue: "",
    //   required: true,
    //   type: "text",
    //   className: "col-span-12",
    //   validationSchema: Yup.string()
    //     .matches(/^[0-9]{6}$/, "Invalid pincode. Must be 6 digits.")
    //     .required("Store Pincode is required"),
    // },
    {
      key: 8,
      name: "gstin",
      label: "GSTIN ",
      placeholder: "Enter GSTIN",
      initialValue: "",
      required: true,
      type: "text",
      className: "col-span-12",
      validationSchema: Yup.string()
        .matches(/^[0-9A-Za-z]{15}$/gm, "Invalid GSTIN. Must be 15 characters.")
        .required("GSTIN is required"),
    },
    {
      key: 9,
      name: "file",
      label: "Signature Upload ",
      placeholder: "Upload Your Signature",
      initialValue: "",
      required: true,
      type: "file",
      className: "col-span-12",
      validationSchema: Yup.string().required("Signature is required").trim(),
    },
  ];

  const initialValues = sellerDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema: { [key: string]: Yup.StringSchema } =
    sellerDetailsSchema.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );

  const handleGSTINBlur = async (value: string, formik: any) => {
    try {
      const data = await fetchData(value);

      if (data.message === "GSTIN  found.") {
        // GSTIN is valid
        formik.setFieldError("gstin", undefined);
      } else {
        // GSTIN is invalid
        formik.setFieldError("gstin", "Invalid GSTIN");
      }
    } catch (error) {
      // Handle errors
      console.error("Error validating GSTIN:", error);
      formik.setFieldError("gstin", "Error validating GSTIN");
    }
  };

  const handleSubmit = async (values: any, formik: any) => {
    // Perform your form submission logic
    console.log("Form data:", values);

    // If you want to perform additional actions after a successful submission
    // ...
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className="w-full grid grid-cols-12 gap-2 md:gap-4 bg-slate-50">
            {sellerDetailsSchema.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: FieldProps<string>) => (
                  <div
                    className={`flex flex-col justify-end gap-2 ${inputItem.className}`}
                  >
                    <div className="font-semibold ">
                      {inputItem.label} {inputItem?.required ? "*" : ""}
                    </div>
                    <div className="w-full">
                      <InputField
                        key={inputItem.name === "file" ? id : inputItem?.key}
                        id={id}
                        name={inputItem?.name}
                        type={inputItem?.type}
                        value={formik?.values[inputItem?.name]}
                        onChange={formik.handleChange}
                        onBlur={() =>
                          inputItem.name === "gstin" &&
                          handleGSTINBlur(formik.values.gstin, formik)
                        }
                        error={
                          inputItem?.name === "file" && file
                            ? false
                            : Boolean(
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )
                        }
                        helperText={
                          formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]
                        }
                        formik={formik}
                        setIsImage={setFile}
                        image={file}
                        onFileChange={(e) => {
                          e.target.files && setFile(e.target.files[0]);
                          formik.setFieldValue("file", e?.target?.files);
                        }}
                        fileAccept="image/*"
                        setId={setId}
                      />
                    </div>
                  </div>
                )}
              </Field>
            ))}
            <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2 ">
              <LoadingButton
                type="submit"
                sx="w-full bg-primary text-white h-10 flex items-center justify-center gap-2"
                disabled={formik.isSubmitting || formik.isValidating}
                circularProgressClass="loading-sm text-secondary"
              >
                <div className="flex items-center gap-2">
                  <BiCommentAdd className="text-xl mt-0.5" />
                  Register
                </div>
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </motion.section>
  );
};

export default SellerRegistration;
