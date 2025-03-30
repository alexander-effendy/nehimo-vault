// IMPORT SYSTEM
import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { RootState } from "@/store/store";

// IMPORT INTERFACES
import { CategoryComponentProp } from "../features/category/CategorySlice";

// IMPORT COMPONENTS
import CategoryComponent from "./CategoryComponentNew";
import HeaderCategory from "./HeaderCategory";
import SearchBar from "./SearchBar";

import { useDispatch, useSelector } from 'react-redux';

// IMPORT REDUX SLICES
import { setCategories } from '../features/category/CategorySlice';

// import APIs
import { fetchCategories } from "../api/categoryAPI";

const CategoryList = () => {
  const dispatch = useDispatch();
  
  // redux states
  const categories = useSelector((state: RootState) => state.category.categories);
  const searchCategory = useSelector((state: RootState) => state.category.searchCategory);
  
  // local states
  const [localCategoryList, setLocalCategoryList] = useState<CategoryComponentProp[]>([]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (!isError && data) {
      dispatch(setCategories(data));
      setLocalCategoryList(data)
    }
  }, [data, dispatch, error]);

  useEffect(() => {
    if (searchCategory) {
      let newSearchCategory = searchCategory?.toLowerCase();
      const newList = categories.filter(item => item.name.toLowerCase().includes(newSearchCategory));
      setLocalCategoryList(newList)
    } else {
      if (searchCategory === null || searchCategory.length === 0) {
        setLocalCategoryList(categories)
      }
    }
  }, [searchCategory])

  useEffect(() => {
    console.log('categories change detected')
    setLocalCategoryList(categories)
  }, [categories])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  return (
    <section className="flex flex-col bg-[#101010] absolute top-[40px] left-[7px] h-[680px] w-[238px] rounded-[10px] px-2">
      <HeaderCategory />
      <SearchBar />
      
      {/* ACTUAL CATEGORY LIST */}
      <section className="flex flex-col rounded-[10px] h-[600px] soft-scrollbar-right pt-2">
        {localCategoryList.map((item: CategoryComponentProp, index: number) => (
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