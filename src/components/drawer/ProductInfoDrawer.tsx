import { DialogContent, DialogTitle, Drawer, Typography } from "@mui/material";

type Props = {
  open: any;
  onClose: () => void;
  item: any;
};
const ProductInfoDrawer = ({ open, onClose, item }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <h1 className="p-3 md:p-5 bg-black sub-title text-white">
        Show Product Info
      </h1>
      <DialogContent dividers className="lg:w-[40vw] w-[70vw]">
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex flex-col lg:items-center gap-2"
        >
          <p className="font-semibold">Product Name:</p>{" "}
          <span
            className="capitalize"
            style={{ color: "black", fontSize: "15px" }}
          >
            {item?.name}
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
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Category:</p>{" "}
          <span
            className="capitalize"
            style={{ color: "black", fontSize: "15px" }}
          >
            {item?.category}
          </span>
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex lg:items-center flex-col gap-2"
        >
          <p className="font-semibold"> Color:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.color}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">MRP:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>{item?.mrp}</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Sale Price:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.price}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Discount:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.discount}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Stock:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.stocks}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex items-center gap-2"
        >
          <p className="font-semibold">Size:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>{item?.size}</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="text-black flex lg:items-center flex-col gap-2"
        >
          <p className="font-semibold">Description:</p>{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {item?.description}
          </span>
          <div
            className="flex flex-col pb-4 text-sm text-black"
            //   dangerouslySetInnerHTML={{
            //     __html: productInfo?.description,
            //   }}
          />
        </Typography>
      </DialogContent>
    </Drawer>
  );
};

export default ProductInfoDrawer;
