const CustomLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="h-screen w-full flex  justify-center items-center">
        <img
          alt="loader Image"
          src="/loder.gif"
          className="rounded-full h-40 w-40"
        />
      </div>
    </div>
  );
};

export default CustomLoader;
