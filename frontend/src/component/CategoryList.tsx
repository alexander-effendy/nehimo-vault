// IMPORT SYSTEM
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { RootState } from "@/store/store";

// IMPORT INTERFACES
import { CategoryComponentProp } from "../features/category/CategorySlice";

// IMPORT COMPONENTS
import CategoryComponent from "./CategoryComponentNew";
import HeaderCategory from "./HeaderCategory";

import { useDispatch, useSelector } from 'react-redux';

// IMPORT REDUX SLICES
import { setCategories } from '../features/category/CategorySlice';

// IMPORT ICONS
import { IoIosSearch } from "react-icons/io";

const fetchCategories = async () => {
  const response = await fetch('http://127.0.0.1:8000/categories/');
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const SearchBar = () => {
  return (
    <div className="flex px-2 py-1 rounded-[5px] hover:cursor-pointer hover:bg-stone-900 transition-all duration-500 rounded-[7px] p-1">
      <IoIosSearch size={20} className="text-white" />
    </div>
  );
};

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (!isError && data) {
      dispatch(setCategories(data));
    }
  }, [data, dispatch, error]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  return (
    <section className="flex flex-col bg-[#101010] absolute top-[40px] left-[7px] h-[680px] w-[238px] rounded-[10px] px-2">
      {/* HEADER */}
      <HeaderCategory />
      <SearchBar />

      {/* ACTUAL CATEGORY LIST */}
      <section className="flex flex-col rounded-[10px] h-[600px] soft-scrollbar-right pt-2">
        {categories.map((item: CategoryComponentProp, index: number) => (
          <CategoryComponent 
            key={index}
            id={item.id}
            name={item.name}
            type={item.type}
            icon={item.icon}
            last_edited={item.last_edited}
            date_created={item.date_created}
          />
        ))}
      </section>
    </section>
  );
};

export default CategoryList;