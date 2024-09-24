import { useState } from "react";
import { Row, Col } from "antd";
import data from "./prompt-my.json";
import CategorySection from "./CategorySection";
import ObjectSection from "./ObjectSection";
import TagSection from "./TagSection";
import SelectedTagsSection from "./SelectedTagsSection";
import ResultSection from "./ResultSection";

const getCategories = (data) => {
  const categoriesSet = new Set(data.map(tag => tag.name));
  return Array.from(categoriesSet);
};

const getObjects = (currentCategory, data) => {
  const groups = data.filter(tag => tag.name === currentCategory).map(tag => tag.groups)[0];
  const tags = groups.map(item => item.name);
  return tags;
};

const getTags = (currentCategory, currentObject, data) => {
  const groups = data.filter(tag => tag.name === currentCategory).map(tag => tag.groups)[0];
  const tags = groups.filter(item => item.name === currentObject).map(item => {
    const tags = item.tags;
    const tagsArray = Object.entries(tags || []).map(([key, value]) => ({
      category: currentCategory,
      object: currentObject,
      displayName: key,
      langName: value
    }));
    return tagsArray;
  });
  return tags;
};

const getTagsData = (data) => {
  const tags = [];
  data.forEach(cate => {
    cate.groups.forEach(group => {
      if(group.tags) {
        let items = Object.entries(group.tags|| []);        
        let tagObjects = items.map(([key, value]) => ({
          category: cate.name,
          object: group.name,
          displayName: key,
          langName: value
        }));
        tags.push(...tagObjects);
      }
    });
  });
  return tags;
}

const PromptTags = ({
  selectedTags,
  setSelectedTags,
  promptText,
})=>{
  const categories = getCategories(data);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  const objects = getObjects(activeCategory, data);
  const [activeObject, setActiveObject] = useState(objects[0]);
  
  const tags = getTags(activeCategory, activeObject, data)[0];

  const tagsData = getTagsData(data);
  const handleCategoryClick = (object) => {
    setActiveCategory(object);
  };

  const handleObjectClick = (attribute) => {
    setActiveObject(attribute);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevSelectedTags => {
      const isSelected = prevSelectedTags.some(t => t.displayName === tag.displayName);
      return isSelected ? prevSelectedTags.filter(t => t.displayName !== tag.displayName) : [...prevSelectedTags, tag];
    });
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <h3 className="m-2 font-bold">1️⃣选择对象</h3>
          <CategorySection categories={categories} selectedCategory={activeCategory} onCategoryClick={handleCategoryClick} />
          <h3 className="m-2 font-bold">2️⃣选择属性</h3>
          <ObjectSection objects={objects} activeObject={activeObject} onObjectClick={handleObjectClick} />
          <h3 className="m-2 font-bold">3️⃣选择标签</h3>
          <TagSection tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
          <h3 className="m-2 font-bold">当前选中</h3>
          <SelectedTagsSection 
            selectedTags={selectedTags} 
            onTagClick={handleTagClick} 
            setActiveCategory={setActiveCategory}
            setActiveObject={setActiveObject}
          />
        </Col>
        <Col xs={24} lg={6}>
          <ResultSection 
            selectedTags={selectedTags} 
            setSelectedTags={setSelectedTags} 
            tagsData={tagsData} 
            promptText={promptText}
          />
        </Col>
      </Row>
    </>
  );
};
export default PromptTags;
