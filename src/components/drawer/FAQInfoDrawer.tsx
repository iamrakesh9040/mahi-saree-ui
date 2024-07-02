import { DialogContent, DialogTitle, Drawer, Typography } from "@mui/material";

type Props = {
  open: any;
  onClose: () => void;
  item: any;
};
const FAQInfoDrawer = ({ open, onClose, item }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <div className="lg:w-[30vw] w-[70vw] flex flex-col">
        <h1 className="p-3 md:p-5 bg-black sub-title text-white">
          Show FAQ Info
        </h1>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-base">Question: -</h1>
            <p>{item?.question}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-base">Answer: -</h1>
            <p>{item?.answer}</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FAQInfoDrawer;
