export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  })
    .format(value)
    .split(".")[0]
    .replace(" ", ",");
};
