import * as Yup from "yup";
import { Dialog } from "@mui/material";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-toastify";
import CustomInputField from "@/core/CustomInputFiled";
import { Button } from "@/core";
import { useMutation } from "@/hooks";
import moment from "moment";
const DeliveryAddForm = ({ openDialog, setOpenDialog, mutate, data }: any) => {
  const { mutation, isLoading } = useMutation();
  const today = moment().format("YYYY-MM-DD");
  const Schema = [
    {
      key: "1",
      label: "Delivery Date",
      name: "delivery",
      type: "date",
      initialValue: data?.delivery
        ? moment(data?.delivery).format("YYYY-MM-DD")
        : "",
      className: "col-span-12",
      min: today,
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

  const handleOperation = async (values: any) => {
    try {
      const res = await mutation(`order/${data?.id}`, {
        method: "PUT",
        body: {
          deliveryDate: values?.delivery,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        setOpenDialog(false);
        toast.success(res?.results?.msg);
        mutate();
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };

  return (
    <>
      <div className="w-fit">
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog && setOpenDialog(false)}
        >
          <div className="md:w-[30rem] w-[20rem] bg-white rounded-xl flex flex-col gap-5 items-center p-4">
            <p className="text-xl font-semibold text-gray-800">
              Delivery Update Form
            </p>
            <div className="w-full p-4 ">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleOperation}
              >
                {(formik) => (
                  <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
                    {Schema.map((inputItem: any) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: FieldProps<string>) => (
                          <div
                            className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                          >
                            <div className=" text-theme font-semibold">
                              {inputItem.label}
                            </div>
                            <input
                              key={inputItem?.key}
                              name={inputItem.name}
                              type={inputItem.type}
                              value={formik.values[inputItem.name]}
                              onChange={(e: any) => {
                                formik.handleChange(e);
                              }}
                              onBlur={formik.handleBlur}
                              min={inputItem.min}
                              className="border-2 p-3 rounded-lg border-blue-400"
                            />
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="flex items-center col-span-12 justify-end flex-col gap-2 pt-2">
                      <Button loading={isLoading} type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default DeliveryAddForm;
