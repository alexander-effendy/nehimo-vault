// IMPORT ICONS
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";

import { setSearchCategory } from '../features/category/CategorySlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleChangeReduxSearchBar = (newValue: string) => {
    dispatch(setSearchCategory(newValue))
  }

  return (
    <div className="bg-yellow-100s flex px-2 py-1 rounded-[5px] hover:cursor-pointer hover:bg-stone-900 transition-all duration-500 rounded-[7px] p-1">
      <IoIosSearch size={20} className="flex my-auto text-white" />
      <input 
        onChange={(e) => handleChangeReduxSearchBar(e.target.value)}
        className="flex flex-grow px-2 text-gray-200 text-[12px] py-1 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
