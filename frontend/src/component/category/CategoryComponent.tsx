import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";

import { categoryChooser } from '../../utils/CategoryUtils';

import { setSelectedCategory, setSelectedCategoryObject, CategoryComponentProp } from '../../features/CategorySlice';

import catmeme from '../../assets/catmeme.png';
import { useEffect } from "react";

const CategoryComponent:React.FC<CategoryComponentProp> = ({ id, name, type }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const afterDeleteEffect = useSelector((state: RootState) => state.category.afterDeleteEffect);
  const categories = useSelector((state: RootState) => state.category.categories);

  const handleCategoryClick = (id: number | null) => {
    dispatch(setSelectedCategory(id));
    const cob = categoryChooser(categories, id);
    dispatch(setSelectedCategoryObject(cob));
  }

  useEffect(() => {
    // void
  }, [selectedCategory]);

  useEffect(() => {
    const categoryId = categories[0]?.id || null;
    handleCategoryClick(categoryId);
  }, [afterDeleteEffect])

  return (
    <div 
      key={id}
      onClick={() => handleCategoryClick(id)}
      className={`${selectedCategory === id ? 'bg-stone-800' : 'hover:bg-stone-900'} flex h-[52px] rounded-[5px] p-1 hover:cursor-pointer w-[98%]`}
    >
      <img className="size-[45px] rounded-[5px] border-[1px] border-gray-500"
        src={catmeme}
      />
      <section className="flex flex-col items-start flex-grow p-1 px-2">
        <span className="text-[13px] text-white">{name}</span>
        <span className="text-[12px] text-gray-500">{type}</span>
      </section>
    </div>
  )
}

export default CategoryComponent;