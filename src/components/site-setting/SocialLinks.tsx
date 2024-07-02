/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useState } from "react";
import SocialLinkEditForm from "./SocialLinkEditForm";
import * as Yup from "yup";
import FacebookForm from "./FacebookForm";
import WhatsappForm from "./WhatsappFrom";
import InstagramFrom from "./InsrtgramForm";
import YoutubeFrom from "./YoutubeForm";

const SocialLinks = () => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  return (
    <motion.div layout className="w-full flex flex-col gap-10">
      <>
        {isEditFormVisible ? (
          <SocialLinks />
        ) : (
          <>
            <div>
              <FacebookForm />
              <WhatsappForm />
              <InstagramFrom />
              <YoutubeFrom />
            </div>
          </>
        )}
      </>
    </motion.div>
  );
};

export default SocialLinks;
