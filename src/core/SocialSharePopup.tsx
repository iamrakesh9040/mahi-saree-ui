import React, { useState } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

interface SocialSharePopupProps {
  productUrl: string; // Add this line to define the type
  onClose: () => void;
}
const SocialSharePopup: React.FC<SocialSharePopupProps> = ({
  productUrl,
  onClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(productUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <dialog
      open={isDialogOpen}
      // TransitionComponent={Transition}
      // keepMounted
      aria-describedby="alert-dialog-slide-description"
      style={{ padding: "32px" }}
    ></dialog>
  );
};

export default SocialSharePopup;
