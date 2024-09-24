import React from "react";

const ObjectSection = ({ objects = [], activeObject, onObjectClick }) => {
  const handleClick = React.useCallback(
    (object) => {
      onObjectClick(object);
    },
    [onObjectClick]
  );

  return (
    <div className="flex flex-wrap">
      {objects.map((object) => (
        <button
          key={object}
          onClick={() => handleClick(object)}
          className={`m-1 px-3 py-1 text-sm font-medium leading-5 transition-colors duration-150 rounded-lg focus:outline-none border ${
            activeObject === object ? "bg-teal-500 text-white border-teal-500" : "text-gray-500 border-gray-300 hover:bg-gray-50"
          }`}>
          {object}
        </button>
      ))}
    </div>
  );
};

export default ObjectSection;