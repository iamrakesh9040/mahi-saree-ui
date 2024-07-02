import React, { useState } from "react";

const ExpandText = ({ text, limit }: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const words = text?.split(" ");
  const displayText = expanded ? text : words?.slice(0, limit).join(" ");

  return (
    <p className="text-sm text-gray-500">
      {displayText}
      {!expanded && words?.length > limit && (
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={toggleExpand}
        >
          Read More
        </span>
      )}
      {expanded && (
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={toggleExpand}
        >
          Read Less
        </span>
      )}
    </p>
  );
};
export default ExpandText;
