import { currencyFormatter } from "@/utils/currency";
import {
  Category,
  ExpandMore,
  MonetizationOn,
  Person,
  Storefront,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
};
const BillingDrawer = ({ open, onClose }: any) => {
  const Details = open;
  return (
    <>
      <Drawer
        anchor="right"
        open={Details}
        onClose={() => onClose && onClose()}
      >
        <Container
          style={{
            width: "32vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            className="!text-primary"
            align="left"
            sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
            variant="h5"
          >
            View Order Details
          </Typography>
          <div>
            <Typography
              align="left"
              color=""
              sx={{
                fontWeight: "",
                marginTop: "2vh",
                paddingLeft: "1.5vw",
                paddingBottom: "0px",
                marginBottom: "2vh",
              }}
              variant="body1"
            >
              {Details?._id}
              <br />
              {moment(Details?.createdAt)?.format("llll")}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-primary"
              sx={{
                paddingLeft: "1.4vw",
                mb: 0,
                marginTop: "1vh",
                fontWeight: "bold",
              }}
            >
              Product Details
            </Typography>

            <Tooltip title="Product Details">
              <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "" }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    className="!bg-primary"
                    src={Details?.rider?.photoURL}
                  >
                    <Category />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="XTRONICS XTROPAN 2000 HF OPG WITH CEPH ATTACHMENT"
                  secondary={
                    Details?.quantity
                      ? `${Details?.product?.measureUnit} ${Details?.product?.measureType} × ${Details?.quantity} `
                      : "--"
                  }
                />
              </ListItem>
            </Tooltip>
            <Typography
              className="!text-primary"
              sx={{
                paddingLeft: "1.4vw",
                mb: 0,
                marginTop: "1vh",
                fontWeight: "bold",
              }}
            >
              Customer Details
            </Typography>

            <Tooltip title="Customer Details">
              <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "" }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    className="!bg-primary"
                    src={Details?.rider?.photoURL}
                  >
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`John Doe (john@example.com)`}
                  secondary="1234567890"
                />
              </ListItem>
            </Tooltip>
            {/* {Details?.store && ( */}
            <>
              <Typography
                className="!text-primary"
                sx={{
                  paddingLeft: "1.4vw",
                  mb: 0,
                  marginTop: "1vh",
                  fontWeight: "bold",
                }}
              >
                Store Details
              </Typography>
              <Tooltip title="Store Details">
                <ListItem sx={{ paddingLeft: "1.4vw" }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      className="!bg-primary"
                      src={Details?.driver?.photoURL}
                    >
                      <Storefront />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="YardHealth"
                    secondary="admin.yardhealth@gmail.com"
                  />
                </ListItem>
              </Tooltip>
            </>
            {/* )} */}
            <Divider />
            {/* {Details?.billing && ( */}
            <Tooltip title="Amount">
              <ListItem sx={{ paddingLeft: "1.4vw" }}>
                <ListItemAvatar>
                  <Avatar variant="rounded" className="!bg-primary">
                    <MonetizationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    Details?.billing?.totalPrice
                      ? `${currencyFormatter(Details?.totalPrice)}`
                      : "--"
                  }
                  primary={"Total Price"}
                />
              </ListItem>
            </Tooltip>
            {/* )} */}
            <Divider />
            <Typography
              align="left"
              className="!text-primary"
              sx={{
                fontWeight: "",
                marginTop: "2vh",
                paddingLeft: "1.10vw",
                paddingBottom: "0px",
                marginBottom: "1.5vh",
              }}
              variant="body1"
            >
              Shipped From:{" "}
              <span
                style={{
                  color: "black",
                }}
              >
                Bhubaneswar , Odisha
              </span>
              <br />
              Shipped To:{" "}
              <span
                style={{
                  color: "black",
                }}
              >
                Nayan Tower , Khandagiri , Bhubaneswar
              </span>
            </Typography>
            <Divider />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className="!text-primary"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "0vh",
                  }}
                >
                  Bill Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh" }} className="bg-white">
                <ListItem
                  sx={{ marginBottom: "0vh" }}
                  secondaryAction={
                    Details?.totalPrice
                      ? `${currencyFormatter(Details?.totalPrice)}`
                      : "--"
                  }
                >
                  <ListItemText primary={"Base Price"} />
                </ListItem>
                {Details?.billing?.couponDiscount?.benefitAmount ? (
                  <ListItem
                    sx={{ marginBottom: "0vh" }}
                    secondaryAction={
                      Details?.billing?.couponDiscount?.benefitAmount
                        ? `${currencyFormatter(
                            Details?.billing?.couponDiscount?.benefitAmount
                          )}`
                        : "--"
                    }
                  >
                    <ListItemText primary={"Coupon Discount"} />
                  </ListItem>
                ) : null}
                <ListItem
                  sx={{ marginBottom: "0vh" }}
                  secondaryAction={
                    Details?.billing?.deliveryCharge
                      ? `${currencyFormatter(99)}`
                      : "--"
                  }
                >
                  <ListItemText primary={"Delivery Charge"} />
                </ListItem>
                <Divider />

                <ListItem
                  sx={{
                    marginTop: "0vh",
                    marginBottom: "0vh",
                    padding: "0vh 1.11vw",
                  }}
                  // disableGutters
                  secondaryAction={currencyFormatter(99)}
                >
                  <ListItemText primary={"Coupon Savings"} />
                </ListItem>
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={currencyFormatter(200)}
                >
                  <ListItemText primary={"Rounded Off"} />
                </ListItem>
                <Divider />
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  secondaryAction={
                    Details?.billing?.totalPrice
                      ? `${currencyFormatter(Details?.billing?.totalPrice)}`
                      : "--"
                  }
                >
                  {Details?.billing?.GST ? (
                    <ListItemText
                      primary={"Total Bill"}
                      secondary={`includes ${currencyFormatter(
                        Details?.billing?.GST
                      )} Taxes`}
                    />
                  ) : (
                    <ListItemText
                      primary={"Total Bill"}
                      secondary={
                        currencyFormatter(100)
                          ? `${currencyFormatter(100)}`
                          : "--"
                      }
                    />
                  )}
                </ListItem>

                <Divider />
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "1vh" }}
                  // disableGutters
                  secondaryAction={`${currencyFormatter(999)}`}
                >
                  <ListItemText
                    primary={"Total Payable"}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem sx={{ marginTop: "1vh" }}>
                  <ListItemText
                    primary={"Payment"}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "1vh" }}
                  secondaryAction={
                    currencyFormatter(100) ? `${currencyFormatter(100)}` : "--"
                  }
                >
                  <ListItemText
                    primary={
                      Details?.billing?.paymentMethod
                        ? Details?.billing?.paymentMethod
                        : "--"
                    }
                  />
                </ListItem>
              </AccordionDetails>
            </Accordion>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default BillingDrawer;
