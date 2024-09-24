import React from "react";

const CategorySection = ({ categories = [], selectedCategory, onCategoryClick }) => {
  const handleClick = React.useCallback(
    (category) => {
      onCategoryClick(category);
    },
    [onCategoryClick]
  );

  return (
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`m-1 px-3 py-1 text-sm font-medium leading-5 transition-colors duration-150 rounded-lg focus:outline-none border ${
            category === selectedCategory ? "bg-indigo-500 text-white border-indigo-500" : "text-gray-500 border-gray-300 hover:bg-gray-50"
          }`}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySection;