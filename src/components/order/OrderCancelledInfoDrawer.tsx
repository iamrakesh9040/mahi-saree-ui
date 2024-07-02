import { DialogContent, Drawer, Typography } from "@mui/material";

const OrderCancelledInfoDrawer = ({ open, onClose, item }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <h1 className="p-3 md:p-5 bg-black text-xl tracking-wider font-semibold text-white">
        Cancelled Order Info
      </h1>
      <DialogContent
        dividers
        className="lg:w-[27vw] w-[15rem] flex flex-col gap-2"
      >
        <p className="font-semibold">Image: </p>
        <div className="flex gap-5">
          {item?.image?.map((data: any, id: any) => (
            <div key={id} className="flex">
              <img className="w-44" src={data?.imageUrl} alt="img" />
            </div>
          ))}
        </div>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex md:items-center md:flex-row flex-col gap-2"
        >
          <p className="font-semibold">Order Id:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.orderId}
          </span>
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex md:items-center md:flex-row flex-col gap-2"
        >
          <p className="font-semibold">Cancellation Reason:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.title}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Comment:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>{item?.msg}</span>
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold"> Status:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.status}
          </span>
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Type:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>{item?.type}</span>
        </Typography>
      </DialogContent>
    </Drawer>
  );
};

export default OrderCancelledInfoDrawer;
