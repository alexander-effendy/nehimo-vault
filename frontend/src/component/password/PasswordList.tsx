import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

import { setDeleteCategoryModalOpen } from "../../features/category/CategorySlice";
import {setAddPasswordModalOpen } from "../../features/category/PasswordSlice";

import { fetchPasswords } from "../../api/PasswordAPI";
import { setPasswords } from "../../features/category/PasswordSlice";

import { PasswordComponentProp } from "../../features/category/PasswordSlice";

import PasswordComponent from "./PasswordComponent";
import ColourPicker from "../../utils/ColourPicker";

import { FaListUl } from "react-icons/fa6";
import { IoColorPaletteOutline } from "react-icons/io5";


const PasswordList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const passwords = useSelector((state: RootState) => state.password.passwords);
  const [colourPickerOpen, setColourPickerOpen] = useState<boolean>(false);

  const colourPickerRef = useRef<HTMLDivElement>(null);

  const [passwordsByCategory, setPasswordsByCategory] = useState<PasswordComponentProp[]>([]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["passwords"],
    queryFn: fetchPasswords,
  });

  useEffect(() => {
    const currentPasswords = passwords.filter((password) => password.categoryid === selectedCategory);
    setPasswordsByCategory(currentPasswords);
  }, [selectedCategory, passwords]);

  useEffect(() => {
    if (!isError && data) {
      dispatch(setPasswords(data));
      const currentPasswords = data.filter((password: PasswordComponentProp) => password.categoryid === selectedCategory);
      setPasswordsByCategory(currentPasswords);
    }
  }, [isError, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colourPickerRef.current && !colourPickerRef.current.contains(event.target as Node)) {
        setColourPickerOpen(false);
      }
    };

    if (colourPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colourPickerOpen]);

  
  if (isLoading) return <div></div>
  if (error) return <div>Error!</div>

  const handleDeleteCategoryModalOpen = () => {
    dispatch(setDeleteCategoryModalOpen(true));
  }

  const handleAddPasswordModalOpen = (status: boolean) => {
    dispatch(setAddPasswordModalOpen(status));
  }

  return (
    <div className="flex flex-col">
      <section className="border-b-[1px]s border-gray-500 w-full h-[80px] flex px-5 justify-between">
        <section className="flex my-auto gap-4 bg-blacsk items-center">
          <button className="text-gray-400 hover:text-white hover:cursor-pointer hover:bg-gray-500 rounded-full transition-all duration-400 p-1">
            <GoPlus size={25} onClick={() => handleAddPasswordModalOpen(true)}/>
          </button>
          <button className="text-gray-400 hover:text-white hover:cursor-pointer p-1">
            <RiDeleteBin6Line onClick={() => handleDeleteCategoryModalOpen()} size={25} />
          </button>
          <button className="text-gray-400 hover:text-white hover:cursor-pointer p-1">
            <IoColorPaletteOutline onClick={() => setColourPickerOpen(prevState => !prevState)} size={25} />
          </button>
          {colourPickerOpen && <div ref={colourPickerRef}><ColourPicker /></div>}
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
        <span className="ml-[115px]">Created</span>
      </section>
      {/* map the list of passwords here (within a password list) */}
      <section className="flex flex-col mt-3 overflow-y-auto h-[340px]">
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