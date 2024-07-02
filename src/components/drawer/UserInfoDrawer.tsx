import { DialogContent, DialogTitle, Drawer, Typography } from "@mui/material";

type Props = {
  open: any;
  onClose: () => void;
  item: any;
};
const UserInfoDrawer = ({ open, onClose, item }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="w-[30vw]">
        <h1 className="text-2xl font-bold text-white text-center  bg-black p-4">
          {" "}
          User Details
        </h1>
        <div className="p-5 flex flex-col gap-4 pb-3 bg-white rounded-lg">
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Name:</span>
            <span className="text-secondary font-normal">{item?.name}</span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Email:</span>
            <span className="text-secondary font-normal">{item?.email}</span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Phone Number:</span>
            <span className="text-secondary font-normal">{item?.phone}</span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Role:</span>
            <span className="text-secondary font-normal">{item?.role}</span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Gender:</span>
            <span className="text-secondary font-normal">
              {item?.gender ? item?.gender : "Not Provided"}
            </span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>Number Of Orders:</span>
            <span className="text-secondary font-normal">
              {item?.orderCount}
            </span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>IsActive:</span>
            <span className="text-secondary font-normal">
              {item?.IsActive ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="flex items-center  gap-3 text-md font-medium">
            <span>IsBlocked:</span>
            <span className="text-secondary font-normal">
              {item?.IsBlocked ? "Blocked" : "Not Blocked"}
            </span>
          </p>
        </div>
      </div>
    </Drawer>
  );
};

export default UserInfoDrawer;
