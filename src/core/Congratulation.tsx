import { Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from ".";
import CongratulationLoader from "./CongratulationLoader";

const Congratulations = ({ open, close, response }: any) => {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      PaperProps={{
        style: {
          borderRadius: 18, // Adjust the value according to your preference
        },
      }}
    >
      <div className="md:w-[34rem] w-full h-fit md:p-10 p-5 bg-white flex flex-col gap-5 items-center">
        <CongratulationLoader />
        <p className="md:text-3xl text-lg font-semibold text-gray-900">
          Congrats! Your Order Placed...
        </p>
        <p className=" text-gray-600">Thank you for Shopping. Visit again!</p>
        <Button
          onClick={() => {
            close(false);
            router.push(`/my-account/orders/${response}`);
          }}
          className="px-6 py-1.5 text-lg font-semibold"
        >
          Okay
        </Button>
      </div>
    </Dialog>
  );
};
export default Congratulations;
