// IMPORT SYSTEM
import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { RootState } from "@/store/store";

// IMPORT INTERFACES
import { CategoryComponentProp, setSelectedCategory } from "../../features/CategorySlice";

// IMPORT COMPONENTS
import CategoryComponent from "./CategoryComponent";
import HeaderCategory from "./HeaderCategory";
import SearchBar from "../SearchBar";

import { useDispatch, useSelector } from 'react-redux';

// IMPORT REDUX SLICES
import { setCategories } from '../../features/CategorySlice';

// import APIs
import { fetchCategories } from "../../api/CategoryAPI";

const CategoryList = () => {
  const dispatch = useDispatch();
  
  // redux states
  const categories = useSelector((state: RootState) => state.category.categories);
  const searchCategory = useSelector((state: RootState) => state.category.searchCategory);
  
  // local states
  const [localCategoryList, setLocalCategoryList] = useState<CategoryComponentProp[]>([]);

  const { data: categoryData, error: categoryError, isError: isCategoryError, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // use effect for categories
  useEffect(() => {
    if (!isCategoryError && categoryData) {
      if (Object.keys(categoryData).length === 0) return;
      categoryData.sort((a: CategoryComponentProp, b: CategoryComponentProp) => a.id - b.id);
      dispatch(setCategories(categoryData));
      if (categoryData.length > 0) dispatch(setSelectedCategory(1));
      setLocalCategoryList(categoryData)
    }
  }, [categoryData, dispatch, categoryError]);

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
    setLocalCategoryList(categories)
  }, [categories])

  if (isCategoryLoading) return <div>Categories Loading...</div>;
  if (categoryError) return <div>Error fetching categories: {categoryError.message}</div>;

  return (
    <section className="flex flex-col bg-[#101010] absolute top-[40px] left-[7px] h-[680px] w-[238px] rounded-[10px] pl-2">
      <section className="pr-2">
        <HeaderCategory />
        <SearchBar />
      </section>
      
      {/* ACTUAL CATEGORY LIST */}
      <section className="flex flex-col rounded-[10px] h-[600px] soft-scrollbar-right pt-2 pb-2">
        {localCategoryList.map((item: CategoryComponentProp, index: number) => (
          <CategoryComponent 
            key={index}
            id={item.id}
            name={item.name}
            type={item.type}
            icon={item.icon}
            last_edited={item.last_edited}
            date_created={item.date_created}
            colour={item.colour}
          />
        ))}
      </section>
    </section>
  );
};

export default CategoryList;