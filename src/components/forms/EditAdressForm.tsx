import React, { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";
import { RxCross1 } from "react-icons/rx";
const EditAddressForm = ({
  setOpen,
  addressData,
  mutate,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  addressData: any;
  mutate: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const Schema = [
    {
      key: "1",
      label: "Full Name *",
      name: "name",
      type: "text",
      initialValue: addressData?.name,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "2",
      label: "Phone Number *",
      name: "phoneNumber",
      type: "text",
      initialValue: addressData?.phone,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "Alternate Phone Number *",
      name: "altPhoneNumber",
      type: "text",
      initialValue: addressData?.alternativePhoneNumber,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "State *",
      name: "state",
      type: "text",
      initialValue: addressData?.state,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "4",
      label: "City *",
      name: "city",
      type: "text",
      initialValue: addressData?.city,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "5",
      label: "Pincode *",
      name: "pincode",
      type: "text",
      initialValue: addressData?.pincode,
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "6",
      label: "Address *",
      name: "address",
      type: "text",
      initialValue: addressData?.address,
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "7",
      label: "Landmark",
      name: "landmark",
      type: "text",
      initialValue: addressData?.landmark ? addressData?.landmark : "",
      className: "col-span-12",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "8",
      label: "Address Type *",
      name: "addressType",
      type: "radio-group",
      initialValue: addressData?.type,
      options: [
        {
          label: "HOME",
          value: "HOME",
        },
        {
          label: "OFFICE",
          value: "OFFICE",
        },
        {
          label: "OTHER",
          value: "OTHER",
        },
      ],
      className: "col-span-6",
      validationSchema: Yup.string().required("Required"),
    },
  ];

  const initialValues = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const res = await mutation(`address/${addressData?._id}`, {
        method: "PUT",
        body: {
          name: values?.name,
          phone: values?.phoneNumber,
          alternativePhoneNumber: values?.altPhoneNumber
            ? values?.altPhoneNumber
            : undefined,
          state: values?.state,
          city: values?.city,
          pincode: values?.pincode,
          address: values?.address,
          landmark: values?.landmark,
          type: values?.addressType,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        mutate();
        resetForm();
        toast.success(res?.results?.msg);
        setOpen(false);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return (
    <div className="w-full bg-white flex flex-col border rounded-xl p-5 gap-5">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">
          Update Address Form
        </p>
        <p
          onClick={() => setOpen(false)}
          className="text-2xl rounded-lg text-red-500 font-medium  cursor-pointer"
        >
          <RxCross1 />
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleOperation}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className="grid grid-cols-12 gap-2 md:gap-4 w-full">
            {Schema.map((inputItem: any) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: FieldProps<string>) => (
                  <div
                    className={`flex flex-col justify-start gap-2 ${inputItem.className}`}
                  >
                    <div className=" text-theme font-semibold">
                      {inputItem.label}
                    </div>
                    <CustomInputField
                      key={inputItem?.key}
                      name={inputItem?.name}
                      type={inputItem?.type}
                      options={inputItem?.options}
                      value={formik?.values[inputItem?.name]}
                      onChange={(e: any) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      fullWidth
                      formik={formik}
                      loading={inputItem?.loading}
                      error={Boolean(
                        formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]
                      )}
                      helperText={
                        formik?.touched[inputItem?.name] &&
                        (formik?.errors[inputItem?.name] as string)
                      }
                    />
                  </div>
                )}
              </Field>
            ))}
            <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
              <Button loading={isLoading} type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAddressForm;
