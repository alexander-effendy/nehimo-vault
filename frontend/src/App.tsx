// importing BASICs
import { useEffect, useState } from "react";
import * as React from "react";

// importing CSS
import "./App.css";

// importing icons
import { VscKey } from "react-icons/vsc";
import { TfiLock } from "react-icons/tfi";
import { BsBoxSeam } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  AiOutlineCloud,
  AiTwotoneDollar,
  AiTwotoneHeart,
  AiOutlineGlobal,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";

import { IconType } from "react-icons";

// ################################################################################################## //

const App = () => {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <div className="w-screen h-screen flex items-center bg-black justify-center relative overflow-hidden">
      {isLocked && 
        <div className="absolute z-100 w-screen h-screen bg-black opacity-90 flex items-center justify-center">
          <span className="text-white">The app is currently locked. Tap the lock icon to unlock it.</span>
        </div>
      }
      {/* drop down on the left top */}
      <CategoryDropDown />

      {/* key icon to LOCK user out on the right top */}
      <TfiLock
        onClick={() => setIsLocked((isLocked) => !isLocked)}
        className="z-100 hover:cursor-pointer text-white absolute size-[20px] top-5 right-5 transition-all duration-1000 hover:text-yellow-300 "
      />

      {/* MAIN COMPONENT TO STORE PASSWORDS */}
      <section className="absolute flex content-start flex-wrap gap-[20px] bottom-0 w-full h-[560px] border-t-[0.5px] border-gray-700 p-[14px] px-[20px] overflow-y-auto">
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
      </section>

      <div className="text-white text-[40px]">{/* <VscKey /> */}</div>
    </div>
  );
};

// ################################################################################################## //

interface Category {
  key: number;
  categoryName: string;
  dateCreated: string;
  lastEdited: string;
  numberOfFile: number;
  icon: IconType;
}

const CategoryDropDown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<Category[]>([]);
  const fakeData: Category[] = [
    { 
      key: 1, 
      categoryName: "Work", 
      dateCreated: "2023-01-01", 
      lastEdited: "2023-01-15", 
      numberOfFile: 5, 
      icon: AiOutlineCloud 
    },
    { 
      key: 2, 
      categoryName: "Personal", 
      dateCreated: "2023-02-15", 
      lastEdited: "2023-02-20", 
      numberOfFile: 3, 
      icon: AiTwotoneDollar 
    },
    { 
      key: 3, 
      categoryName: "Finance", 
      dateCreated: "2023-03-10", 
      lastEdited: "2023-03-12", 
      numberOfFile: 7, 
      icon: AiTwotoneHeart 
    },
    { 
      key: 4, 
      categoryName: "Travel", 
      dateCreated: "2023-04-20", 
      lastEdited: "2023-04-25", 
      numberOfFile: 2, 
      icon: AiOutlineGlobal 
    },
    { 
      key: 5, 
      categoryName: "Shopping", 
      dateCreated: "2023-05-05", 
      lastEdited: "2023-05-10", 
      numberOfFile: 8, 
      icon: AiOutlineShoppingCart 
    },
    { 
      key: 6, 
      categoryName: "Health", 
      dateCreated: "2023-06-15", 
      lastEdited: "2023-06-20", 
      numberOfFile: 4, 
      icon: AiOutlineHeart 
    },
  ];

  useEffect(() => {
    setData(fakeData);
  }),
    [];
  return (
    <section className="absolute top-5 left-4 bg-yellow-100s w-[370px]">
      {/* menu button */}
      <div onClick={() => setIsOpen((open) => !open)} className="w-[290px] hover:cursor-pointer rounded-[5px] text-white ">
        <CategoryComponent 
          type="special" 
          categoryName="Work" 
          dateCreated="2023-01-01"
          lastEdited="2023-01-01"
          numberOfFile={3}
          icon={AiOutlineCloud} />
      </div>
      {/* menu dropdown */}
      {isOpen && (
        <div className="soft-scrollbar-right mt-[20px] flex flex-col gap-[20px] text-white h-[540px] overflow-y-auto overflow-x-hidden w-[380px] rounded-[7px]">
          {data.map((item) => (
            <CategoryComponent 
              categoryName={item.categoryName} 
              dateCreated={item.dateCreated}
              lastEdited={item.lastEdited}
              numberOfFile={item.numberOfFile}
              icon={item.icon} />
          ))}
        </div>
      )}
    </section>
  );
};

// ################################################################################################## //

interface CategoryComponentProp {
  categoryName: string;
  dateCreated: string;
  lastEdited: string,
  numberOfFile: number,
  icon: IconType;
  type?: string;
}

const CategoryComponent: React.FC<CategoryComponentProp> = ({ type, categoryName, dateCreated, lastEdited, numberOfFile, icon: Icon }) => {
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {

  }, [isDelete])
  return (
    <div>
      {((isDelete === true) && (type !== "special")) ? (
        <div className="flex flex-col items-center justify-center text-[13px] border-[0.7px] rounded-[10px] w-[370px] h-[170px] border-gray-400">
          <span className="text-gray-400">Are you sure you want to delete <span className="text-white">{categoryName}</span> ?</span>
          <section className="flex gap-2 mt-2">
            <button onClick={() => setIsDelete(false)} className="hover:cursor-pointer text-black bg-white p-1 px-2 rounded-[5px]">Cancel</button>
            <button onClick={() => setIsDelete(false)} className="hover:cursor-pointer hover:bg-red-700 text-white bg-red-500 p-1 px-2 rounded-[5px]">Yes</button>
          </section>
        </div>
      ) : (
        <div
          className={`group hover:bg-[#080808] hover:cursor-pointer shrink-0 relative ${
            type === "special" ? "border-yellow-400" : "hover:border-gray-200 border-gray-400"
          } border-[0.7px] rounded-[10px] w-[370px] h-[170px] flex flex-col`}
        >
          {type !== "special" && 
            <RiDeleteBin6Line 
              onClick={() => setIsDelete(true)} 
              className="absolute top-4 right-3 text-red-400 z-50" 
            />
          }
          <section className="relative flex flex-col gap-1 h-[120px]">
            <section className="flex p-3 items-center gap-2">
              <Icon className="text-white" />
              <span className="text-[16px]">{categoryName}</span>
            </section>
            <section className="absolute flex flex-col left-3 bottom-3 text-[13px] text-gray-400">
              <span>date created: {dateCreated}</span>
              <span>last updated: {lastEdited}</span>
            </section>
          </section>
          <section
            className={`flex absolute bottom-0 w-full border-t-[0.7px] ${
              type === "special" ? "border-yellow-400" : "group-hover:border-gray-200 border-gray-400"
            } h-[50px] px-[17px] py-[10px] gap-[6px]`}
          >
            <div className="border-[0.7px] w-[50px] rounded-[5px] border-gray-400 flex justify-center items-center gap-2">
              <BsBoxSeam />{numberOfFile}
            </div>
            <div className="border-[0.7px] w-[50px] rounded-[5px] border-gray-400 flex justify-center items-center gap-2">
              <BsBoxSeam />{numberOfFile}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const PasswordComponent = () => {
  return (
    <div className="border-gray-400 bg-yellow-100s border-[0.7px] shrink-0 rounded-[10px] p-2 w-[370px] h-[100px]">Password</div>
  )
}

// ################################################################################################## //

export default App;
