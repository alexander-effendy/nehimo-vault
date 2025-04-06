// IMPORT ICONS
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";

import { setSearchCategory } from '../features/CategorySlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleChangeReduxSearchBar = (newValue: string) => {
    dispatch(setSearchCategory(newValue))
  }

  return (
    <div className="relative flex rounded-[5px] p-1">
      <IoIosSearch size={20} className="flex my-auto text-white absolute top-[10px] left-2" />
      <input 
        onChange={(e) => handleChangeReduxSearchBar(e.target.value)}
        className="hover:cursor-pointer transition-all duration-500 w-full h-[30px] rounded-[7px] flex flex-grow pl-7 text-gray-200 text-[12px] py-1 focus:outline-none focus:bg-stone-900 "
      />
    </div>
  );
};

export default SearchBar;
