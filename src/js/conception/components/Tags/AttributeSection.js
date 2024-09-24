import React from "react";

const AttributeSection = ({ attributes = [], selectedAttribute, onAttributeClick }) => {
  const handleClick = React.useCallback(
    (attribute) => {
      onAttributeClick(attribute);
    },
    [onAttributeClick]
  );

  return (
    <div className="flex flex-wrap">
      {attributes.map((attribute) => (
        <button
          key={attribute}
          onClick={() => handleClick(attribute)}
          className={`m-1 px-3 py-1 text-sm font-medium leading-5 transition-colors duration-150 rounded-lg focus:outline-none border ${
            attribute === selectedAttribute ? "bg-indigo-500 text-white border-indigo-500" : "text-gray-500 border-gray-300 hover:bg-gray-50"
          }`}>
          {attribute}
        </button>
      ))}
    </div>
  );
};

export default AttributeSection;