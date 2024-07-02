import { Dialog } from "@mui/material";
import React, { useState } from "react";

const SupportReply = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <div>bdgh</div>
    </Dialog>
  );
};

export default SupportReply;
