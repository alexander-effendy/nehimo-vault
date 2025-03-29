import fakeCategoryData from "../data/categoryDataFake";
import { AiFillApple } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";

import CategoryComponent from "./CategoryComponentNew";

import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await fetch('http://127.0.0.1:8000/categories/');
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const CategoryList = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'], 
    queryFn: fetchCategories
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  console.log(data)

  return (
    <section className="flex flex-col bg-[#101010] absolute top-[40px] left-[7px] h-[680px] w-[238px] rounded-[10px] px-2">
      {/* HEADER */}
      <HeaderCategory />
      <SearchBar />

      {/* ACTUAL CATEGORY LIST */}
      <section className="flex flex-col rounded-[10px] h-[600px] soft-scrollbar-right pt-2">
        {fakeCategoryData.map((item, index) => (
          <CategoryComponent 
            key={index}
            id={item.id}
            functionalName={item.functionalName}
            categoryType={item.categoryType}
            icon={item.icon}
            lastEdited={item.lastEdited}
            dateCreated={item.dateCreated}
          />
        ))}
      </section>
    </section>
  );
};

const HeaderCategory = () => {
  return (
    <section className="flex flex-col rounded-[10px] h-[55px] pt-2 px-1">
      <section className="w-full flex  text-white justify-between bg-yellow-500s h-[40px]">
        <section className="flex items-center gap-1">
          <AiFillApple className="text-white size-[25px] pb-[3px] flex my-auto" />
          <span className="text-[13px]">Categories</span>
        </section>
        <section className="flex my-auto hover:cursor-pointer hover:bg-gray-800 transition-all duration-500 rounded-[7px] p-1">
          <GoPlus size={20} />
        </section>
      </section>
    </section>
  );
};

const SearchBar = () => {
  return (
    <div className="flex px-2 py-1 rounded-[5px] hover:cursor-pointer hover:bg-stone-900 transition-all duration-500 rounded-[7px] p-1">
      <IoIosSearch size={20} className="text-white" />
    </div>
  );
};

export default CategoryList;
