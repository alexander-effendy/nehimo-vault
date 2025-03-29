import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { CategoryComponentProp } from "@/features/category/CategorySlice";

import catmeme from "../assets/catmeme.png";
import { current } from "@reduxjs/toolkit";

const MainContent = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const categories = useSelector((state: RootState) => state.category.categories);

  const [currentCategory, setCurrentCategory] = useState<CategoryComponentProp | null>(null);

  const handleLoadCategory = () => {
    if (categories.length !== 0) {
      if (selectedCategory) {
        setCurrentCategory(categories[selectedCategory -1]);
      } else {
        setCurrentCategory(categories[0]);
      }
    }
  };

  useEffect(() => {
    handleLoadCategory();
    console.log(currentCategory);
  }, [selectedCategory]);
  return (
    <section className="flex flex-col bg-[#101010] absolute top-[40px] left-[252px] h-[680px] w-[671px] rounded-[10px]">
      {/* HEADER */}
      <section
        style={{
          background: "linear-gradient(to bottom, #9168a5 0%, #6f507f 40%, #503958 100%)",
        }}
        className="w-full h-[210px] rounded-t-[10px] flex pt-6 pl-4 pb-6"
      >
        {/* show the image */}
        <img src={catmeme} className="size-[170px] rounded-[5px] shadow-lg" />
        {currentCategory && (
          <section className="pl-4 border-[1px]ss border-white flex flex-col gap-2 flex-grow justify-end">
            <span className="text-gray-200 text-[12px]">{currentCategory.type}</span>
            <span className="pl-[19px] text-white font-bold text-[65px] transform scale-x-110 leading-none truncate w-[430px]">{currentCategory.name}</span>
            
            <section className="flex items-center gap-[6px] leading-none">
              <span className="text-[12px] text-gray-400 font-semibold">Alexander Effendy</span>
              <div className="size-[3px] rounded-full bg-gray-400"></div>
              <div className="text-[11px] text-gray-400">{currentCategory.date_created}</div>
            </section>
          </section>
        )}
      </section>

      {/* LIST */}
      <section
        style={{
          background: "linear-gradient(to bottom, #3b2a43 0%, #101010 40%, #101010 100%)",
        }}
        className="w-full h-[470px] rounded-b-[10px]"
      ></section>
    </section>
  );
};

export default MainContent;
