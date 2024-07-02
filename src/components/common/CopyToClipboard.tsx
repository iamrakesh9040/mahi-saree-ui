import { useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";

interface CopyToClipboardProps {
  symbol: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ symbol }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(symbol);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button onClick={copyToClipboard} className="flex items-center  ">
      <span className="text-xl"></span>
      {copied ? (
        <p className=" flex items-center text-blue-500 text-sm">
          <BsCheck2All className=" text-2xl" />
          <span>Copid!</span>
        </p>
      ) : (
        <div className=" flex items-center text-blue-500 text-sm gap-2 flex-row">
          <div className=""></div>
          <div className="">
            <FaRegCopy size={20} className=" text-2xl" />
          </div>
        </div>
      )}
    </button>
  );
};

export default CopyToClipboard;
