import { Button } from "@/core";
import CustomInputField from "@/core/CustomInputFiled";
import { useMutation } from "@/hooks";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const InstagramFrom = () => {
  const { mutation, isLoading } = useMutation();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const Schema = [
    {
      key: "5",
      label: "Instagram Type",
      name: "name",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
    {
      key: "5",
      label: "Instagram Link",
      name: "link",
      type: "text",
      initialValue: "",
      className: "lg:col-span-4 col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
  ];

  const initialValues: { [key: string]: string } = Schema.reduce(
    (accumulator: { [key: string]: string }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );

  const validationSchema: { [key: string]: Yup.StringSchema } = Schema.reduce(
    (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  const handleOperation = async (values: any) => {
    try {
      const res = await mutation(`socialMediaLinks/instagram`, {
        method: "POST",
        body: {
          link: values?.link,
          type: values?.name,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        setIsEditFormVisible(true);
        toast.success(res?.results?.msg);
      } else {
        toast.info(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleOperation}
      >
        {(formik) => (
          <Form className="grid grid-cols-12 gap-2 md:gap-4 w-full">
            {Schema.map((inputItem: any) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: FieldProps<string>) => (
                  <div
                    className={`flex flex-col justify-start gap-2 ${inputItem.className}`}
                  >
                    <CustomInputField
                      key={inputItem?.key}
                      name={inputItem?.name}
                      type={inputItem?.type}
                      options={inputItem?.options}
                      value={formik?.values[inputItem?.name]}
                      onChange={(e: any) => {
                        formik.handleChange(e);
                      }}
                      disabled={inputItem?.disabled}
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
                      label={inputItem.label}
                    />
                  </div>
                )}
              </Field>
            ))}
            <div className="flex w-full items-center col-span-2 justify-center  gap-2 pt-2">
              <Button loading={isLoading} type="submit">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstagramFrom;
