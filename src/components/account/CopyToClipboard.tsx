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
      <span className="text-xl mr-1"></span>
      {copied ? (
        <p className=" flex items-center text-green-500 text-sm">
          <BsCheck2All className=" text-2xl" />
          <span>Copid!</span>
        </p>
      ) : (
        <FaRegCopy className=" text-2xl text-gray-500 hover:text-blue-600" />
      )}
    </button>
  );
};

export default CopyToClipboard;
