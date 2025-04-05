import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { CategoryComponentProp } from "@/features/category/CategorySlice";
import DeleteCategoryModal from "../modal/CategoryDeleteModal";

import catmeme from '../../assets/catmeme.png';

import PasswordList from "../password/PasswordList";

// imporr utils functions
import getDarkerColor from "../../utils/ColourGenerator";
import { formatCreatedDate } from "../../utils/date";

const CategoryContent = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const selectedCategoryObject = useSelector((state: RootState) => state.category.selectedCategoryObject);
  const categories = useSelector((state: RootState) => state.category.categories);

  const [baseColor, setBaseColor] = useState<string | null | undefined>('#bdbdbd');

  const [currentCategory, setCurrentCategory] = useState<CategoryComponentProp | null>(null);

  const handleLoadCategory = () => {
    if (Object.keys(categories).length !== 0) {
      if (selectedCategory) {
        console.log(selectedCategory)
        setCurrentCategory(selectedCategoryObject);
        if (selectedCategoryObject) {
          setBaseColor(selectedCategoryObject?.colour);
        }
      } else {
        setCurrentCategory(categories[0]);
        setBaseColor(categories[0].colour);
      }
    }

    console.log(categories);
  };

  useEffect(() => {
    handleLoadCategory();
  }, [categories, selectedCategoryObject]);

  useEffect(() => {
    console.log('load category')
    console.log('selected is: ' + selectedCategory)
    handleLoadCategory();
  })

  interface InfoProp {
    type: string;
    name: string;
    date_created: string;
  }

  // rendering mini components
  const Info: React.FC<InfoProp> = ({ type, name, date_created }) => {
    return (
      <section className="pl-4 border-[1px]ss border-white flex flex-col gap-2 flex-grow justify-end">
        <span className="text-gray-200 text-[12px]">{type}</span>
        <span className="pl-[19px] text-white font-bold text-[40px] transform scale-x-110 leading-none pb-[5px] truncate w-[447px]">{name}</span>
        <section className="flex items-center gap-[6px] leading-none">
          <span className="text-[12px] text-gray-400 font-semibold">Alexander Effendy</span>
          <div className="size-[3px] rounded-full bg-gray-400"></div>
          <div className="text-[11px] text-gray-400">created {formatCreatedDate(date_created)}</div>
        </section>
      </section>
    );
  };

  return (
    <section className="flex flex-col absolute top-[40px] left-[252px] h-[680px] w-[671px] rounded-[10px]">
      {/* HEADER */}
      <DeleteCategoryModal />
      <section
        style={{
          background: `linear-gradient(to bottom, ${baseColor} 0%, ${getDarkerColor(baseColor, 0.18)} 40%, ${getDarkerColor(baseColor, 0.22)} 100%)`,
          boxShadow: `inset 30px -55px 90px -30px rgba(0, 0, 0, 0.4)`,
        }}
        className="w-full h-[210px] rounded-t-[10px] flex pt-10 pl-4 pb-6"
      >
        {/* show the image */}
        <img src={catmeme} className="size-[150px] rounded-[5px] shadow-lg" />
        {currentCategory && <Info type={currentCategory.type} name={currentCategory.name} date_created={currentCategory.date_created} />}
        
      </section>

      {/* LIST */}
      <section
        style={{
          background: `linear-gradient(to bottom, ${getDarkerColor(baseColor, 0.328)} 0%, #101010 30%, #101010 100%)`,
        }}
        className="w-full h-[470px] rounded-b-[10px]"
      >
        <PasswordList />
      </section>
    </section>
  );
};

export default CategoryContent;
