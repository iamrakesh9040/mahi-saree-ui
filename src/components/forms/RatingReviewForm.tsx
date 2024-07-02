import React, { useState } from "react";
import { Dialog, Rating, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@/core/LoadingButton";

const RatingReviewForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const [initialValues, setInitialValues] = useState({
    review: "",
    rating: 0,
    title: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    rating: Yup.number().required("Rating is required"),
    review: Yup.string().required("Review Required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async () => {},
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log form values to the console
    console.log("Form Values:", formik.values);
    // You can add your additional form submission logic here
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className=" bg-white p-8 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
            handleSubmit(e); // Handle the submission in the handleSubmit function
          }}
          className="relative flex w-[30rem] flex-col gap-4 p-8"
        >
          <p className="text-center text-xl font-semibold text-primary">
            Rate Product
          </p>
          <p className="text-sm tracking-wide text-gray-500">Your rating *</p>
          <Rating
            name="size-small"
            value={formik.values.rating}
            size="large"
            className="!w-fit"
            onChange={(event: any, newValue: any) => {
              formik.setFieldValue("rating", newValue);
            }}
          />

          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            fullWidth
            type="text"
            name="review"
            placeholder="Your Review"
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            className=""
            InputProps={{
              classes: {
                root: " ",
                notchedOutline: "sorting-select-outline",
              },
            }}
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.review && Boolean(formik.errors.review)}
            helperText={formik.touched.review && formik.errors.review}
          />
          <LoadingButton
            type="submit"
            sx="w-full bg-primary text-white h-10 flex items-center justify-center gap-2"
            disabled={formik.isSubmitting || formik.isValidating}
            circularProgressClass="loading-sm text-secondary"
          >
            Submit
          </LoadingButton>
        </form>
      </div>
    </Dialog>
  );
};

export default RatingReviewForm;
