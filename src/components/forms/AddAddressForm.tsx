import React, { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import useMutation from "@/hooks/useMutation";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";
const AddAddressForm = ({
  setOpen,
  mutate,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutate?: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const Schema = [
    {
      key: "1",
      label: "Full Name *",
      name: "name",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4  col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "2",
      label: "Phone Number *",
      name: "phoneNumber",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "3",
      label: "ALternate Phone Number",
      name: "altPhoneNumber",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().optional(),
    },

    {
      key: "4",
      label: "State *",
      name: "state",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "5",
      label: "City *",
      name: "city",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "6",
      label: "Pincode *",
      name: "pincode",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "7",
      label: "Address *",
      name: "address",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "8",
      label: "Landmark",
      name: "landmark",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "9",
      label: "Address Type *",
      name: "addressType",
      type: "radio-group",
      initialValue: "HOME",
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
      const res = await mutation(`address`, {
        method: "POST",
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
        mutate && mutate();
        resetForm();
        toast.success("Address Added Successfully");
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
        <p className="text-lg font-semibold text-gray-900">Add Address Form</p>
        <p
          onClick={() => setOpen(false)}
          className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium  cursor-pointer"
        >
          Close
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleOperation}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
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

export default AddAddressForm;
