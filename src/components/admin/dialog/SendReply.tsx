import LoadingButton from "@/components/common/LoadingButton";
import TextInput from "@/core/TextInput";
import { Cancel, Send } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import { TextInput } from "components/core";
import { Form, Formik } from "formik";
// import { MessageSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";

type Props = {
  selectedUsers?: any;
  handleClose: () => void;
};

const MessageSchema = [
  {
    key: "1",
    label: "Subject",
    name: "subject",
    validationSchema: Yup.string()
      .required("Subject is Required")
      .max(50, "Subject must be less than 50 characters")
      .min(5, "Subject must be greater than 5 characters"),
    initialValue: "",
  },
  {
    key: "2",
    label: "Message",
    name: "message",
    multiline: true,
    rows: 4,
    validationSchema: Yup.string()
      .required("Message is Required")
      .max(350, "Message must be less than 350 characters")
      .min(5, "Message must be greater than 5 characters"),
    initialValue: "",
  },
];

const SendReply = ({ selectedUsers, handleClose }: Props) => {
  const initialValues = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });

  const validationSchema = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });

  const handleSendReply = async (
    values: { [key: string]: string },
    submitProps: any
  ) => {
    try {
      // Simulated API call
      const response = await fetch("/mail-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedUsers?.email,
          ...values,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        handleClose();
        Swal.fire({ text: responseData?.message, icon: "success" });
      } else {
        const errorData = await response.json();
        Swal.fire({ text: errorData?.error, icon: "error" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      submitProps.setSubmitting(false);
      submitProps?.resetForm();
    }
  };

  return (
    <>
      <Dialog
        open={Boolean(selectedUsers?.email)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSendReply}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <DialogTitle>Send Reply</DialogTitle>
              <DialogContent dividers>
                {MessageSchema.map((inputItem) => (
                  <TextInput
                    key={inputItem.key}
                    name={inputItem?.name}
                    label={inputItem?.label}
                    multiline={inputItem?.multiline}
                    rows={inputItem?.rows}
                  />
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleClose}
                  color="error"
                >
                  Close
                </Button>
                <Button
                //   variant="contained"
                //   startIcon={<Send />}
                //   disabled={!isValid}
                //   loading={isSubmitting}
                //   color="success"
                //   className="btn-background !bg-theme"
                //   type="submit"
                >
                  Send
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default SendReply;
