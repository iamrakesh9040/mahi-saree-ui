import { FormikHelpers } from "formik";
import * as Yup from "yup";

type ColorType = {
  id: string;
  color: string;
};

const colorMutation = () => {
  const colorSchema = [
    {
      key: "1",
      name: "name",
      label: "Color Name",
      type: "text",
      required: true,
      validationSchema: Yup.string().required("Color Name is required"),
      initialValue: "",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "hexCode",
      label: "Color Code",
      type: "text",
      required: true,
      validationSchema: Yup.string().required("Color Code is required"),
      initialValue: "",
      className: "col-span-12",
    },
  ];

  const colorSchemaInitialValue = colorSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const colorSchemaValidation = colorSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema | Yup.NumberSchema }
  );
  return {
    colorSchema,
    colorSchemaInitialValue,
    colorSchemaValidation,
  };
};
type formikProps = FormikHelpers<{ [key: string]: string }>;
type colorValueType =
  | ColorType
  | {
      [key: string]: string;
    };

export { colorMutation };
export type { formikProps, colorValueType };
