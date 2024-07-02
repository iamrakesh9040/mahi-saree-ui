import { ORDERCONFIRMED } from "@/animation";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
}
const CongratulationLoader = ({
  image,
  animeHight = 200,
  animeWidth = 200,
}: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : ORDERCONFIRMED,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isPaused={false}
      isClickToPauseDisabled={true}
      height={animeHight}
      width={animeWidth}
    />
  );
};

export default CongratulationLoader;
