import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";

import { setSelectedCategory } from '../../features/category/CategorySlice';

import { CategoryComponentProp } from "@/features/category/CategorySlice";

import catmeme from '../../assets/catmeme.png';
import { useEffect } from "react";

const CategoryComponent:React.FC<CategoryComponentProp> = ({ id, name, type }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);

  const handleCategoryClick = (id: number) => {
    dispatch(setSelectedCategory(id));
  }

  useEffect(() => {
  }, [selectedCategory])

  return (
    <div 
      key={id}
      onClick={() => handleCategoryClick(id)}
      className={`${selectedCategory === id ? 'bg-stone-800' : 'hover:bg-stone-900'} flex h-[52px] rounded-[5px] p-1 hover:cursor-pointer`}
    >
      <img className="size-[45px] rounded-[5px] border-[1px] border-gray-500"
        src={catmeme}
      />

      {/* name and type */}
      <section className="flex flex-col items-start flex-grow p-1 px-2">
        <span className="text-[13px] text-white">{name}</span>
        <span className="text-[12px] text-gray-500">{type}</span>
      </section>

    </div>
  )
}

export default CategoryComponent;