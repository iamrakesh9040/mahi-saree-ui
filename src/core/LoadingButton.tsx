const Button = ({
  sx,
  type = "submit",
  loading,
  disabled,
  children,
  onClick,
  circularProgressClass,
}: {
  sx?: string;
  type?: "submit" | "button" | "reset";
  loading?: boolean;
  disabled?: boolean;
  children: JSX.Element | JSX.Element | string;
  onClick?: () => void;
  circularProgressClass?: string;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${loading ? "" : ""} py-2 w-full rounded-md ${sx}`}
    >
      {loading ? (
        <div className={`loading loading-bars ${circularProgressClass}`}></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
