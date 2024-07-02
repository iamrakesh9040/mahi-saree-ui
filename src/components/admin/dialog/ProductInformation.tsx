import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

type Props = {
  open?: any;
  handleClose: () => void;
};
const ProductInformation = ({ open, handleClose }: Props) => {
  return (
    <Dialog open={Boolean(open)} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="!text-xl  !font-bold !text-theme">
        Product Info
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Product Name:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>gdhj</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Category:
          <span style={{ color: "black", fontSize: "15px" }}>
            {open?.category?.name}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Short Desc:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>nbamn</span>
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Color: <span style={{ color: "black", fontSize: "15px" }}>njhsa</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Measure Type:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>fjhkds</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Measure Unit:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>jjsgjhk</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          MRP:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {/* {productInfo?.mrp
                ? `${currencyFormatter(productInfo?.mrp)}`
                : '--'} */}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Sale Price:{" "}
          <span style={{ color: "black", fontSize: "15px" }}>
            {/* {productInfo?.salePrice
                ? `${currencyFormatter(productInfo?.salePrice)}`
                : '--'} */}
          </span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Stock:{" "}
          <span style={{ color: "black", fontSize: "15px" }}> djdshklj</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Shipping Return:{" "}
          <span style={{ color: "black", fontSize: "15px" }}> sdjh</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Size Fit:{" "}
          <span style={{ color: "black", fontSize: "15px" }}> jhcds</span>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          className="!text-theme"
        >
          Description:{" "}
          {/* <span style={{ color: 'black', fontSize: '15px' }}>
              {productInfo?.description}
            </span> */}
          <div
            className="flex flex-col pb-4 text-sm text-black"
            //   dangerouslySetInnerHTML={{
            //     __html: productInfo?.description,
            //   }}
          />
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProductInformation;
