import React from "react";

const SelectedTagsSection = ({ selectedTags = [], onTagClick }) => {
  // 按对象和属性对标签进行分组
  const tagsByObjectAndAttribute = React.useMemo(() => {
    return selectedTags.reduce((acc, tag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = {};
      }
      if (!acc[tag.category][tag.object]) {
        acc[tag.category][tag.object] = [];
      }
      acc[tag.category][tag.object].push(tag);
      return acc;
    }, {});
  }, [selectedTags]);

  // 将undefined对象和属性移到末尾
  const sortedTagsByObjectAndAttribute = React.useMemo(() => {
    const undefinedTags = tagsByObjectAndAttribute.undefined;
    delete tagsByObjectAndAttribute.undefined;
    tagsByObjectAndAttribute['undefined'] = undefinedTags;
    return tagsByObjectAndAttribute;
  }, [tagsByObjectAndAttribute]);

  return (
    <>
      {Object.entries(sortedTagsByObjectAndAttribute).flatMap(([category, tagsByAttribute]) =>
        Object.entries(tagsByAttribute || []).map(([object, tags]) => (
          <React.Fragment key={`${category}-${object}`}>
          <span className="text-gray-500 ml-2">{category}</span>
          <span className="text-gray-500 ml-1">{object}</span>
            {tags.map((tag, index) => (
              <React.Fragment key={tag.displayName}>
                <div className="inline-block m-2 rounded cursor-pointer shadow-md transition duration-150 ease-in-out transform hover:scale-105" onClick={() => onTagClick(tag)}>
                  <span className="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-2 py-1 rounded-l">
                    {tag.displayName.length > 20 ? tag.displayName.slice(0, 20) + "..." : tag.displayName}
                  </span>
                  <span className="bg-gradient-to-r from-teal-800 to-teal-900 text-white px-2 py-1 rounded-r">{tag.langName}</span>
                </div>
                {index === tags.length - 1 && <br />}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))
      )}
    </>
  );
};

export default SelectedTagsSection;