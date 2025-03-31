// interface PasswordListProp {
//   categoryId: number;
// }

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

import { fetchPasswords } from "../../api/PasswordAPI";
import { setPasswords } from "../../features/category/PasswordSlice";

import { PasswordComponentProp } from "../../features/category/PasswordSlice";
import PasswordComponent from "./PasswordComponent";
import { FaListUl } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";

const PasswordList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const passwords = useSelector((state: RootState) => state.password.passwords);
  const categories = useSelector((state: RootState) => state.category.categories);

  const [passwordsByCategory, setPasswordsByCategory] = useState<PasswordComponentProp[]>([]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["passwords"],
    queryFn: fetchPasswords,
  });

  useEffect(() => {
    const currentPasswords = passwords.filter((password) => password.categoryid === selectedCategory);
    setPasswordsByCategory(currentPasswords);
  }, [selectedCategory]);

  useEffect(() => {
    if (!isError && data) {
      dispatch(setPasswords(data));
    }
  }, [isError, data]);

  
  if (isLoading) return <div>Retrieving password loading</div>
  if (error) return <div>Retrieving password list error</div>

  return (
    <div className="flex flex-col">
      <section className="border-b-[1px]s border-gray-500 w-full h-[80px] flex px-5 justify-between">
        <section className="flex my-auto gap-4">
          <button className="text-gray-400 hover:text-white hover:cursor-pointer">
            <FiEdit size={25} />
          </button>
          <button className="text-gray-400 hover:text-white hover:cursor-pointer">
            <RiDeleteBin6Line size={25} />
          </button>
          <button className="text-gray-400 hover:text-white hover:cursor-pointer">
            <IoColorPaletteOutline size={25} />
          </button>
        </section>
        <section className="flex my-auto gap-4">
          <button className="text-gray-400 hover:text-white hover:cursor-pointer">
            <IoIosSearch size={20} />
          </button>
          <button className="flex gap-1 flex items-center text-gray-400 gap-2 text-[12px]">
            <span>Sort by</span><FaListUl/>
          </button>
        </section>
       
      </section>

      {/* HEADER TABLE FOR PASSWORD LIST */}
      <section className="border-b-[0.2px] border-gray-700 h-[30px] mx-5 text-gray-400 flex text-[11px] bg-yellow-500s px-3 items-center">
        <span>#</span>
        <span className="ml-[20px]">Usage</span>
        <span className="ml-[117px]">Username</span>
        <span className="ml-[108px] highlightable">Password</span>
        <span className="ml-[135px]"><IoCalendarNumberOutline size={16} /></span>
      </section>
      {/* map the list of passwords here (within a password list) */}
      <section className="flex flex-col mt-3">
        {passwordsByCategory.map((password, index) => (
          <PasswordComponent
            key={password.id}
            id={index + 1}
            categoryid={password.categoryid}
            usage={password.usage}
            username={password.username}
            password={password.password}
            date_created={password.date_created}
            last_edited={password.last_edited}
          />
        ))}
      </section>
    </div>
  );
};

export default PasswordList;

// export interface PasswordComponentProp {
//   id: number;
//   categoryid: number;
//   usage: string;
//   username: string;
//   password: string;
//   date_created: string;
//   last_edited: string;
// }
