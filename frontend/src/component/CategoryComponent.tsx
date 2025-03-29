import React, { useState, useEffect } from 'react';

import { IconType } from "react-icons";

interface CategoryComponentProp {
  categoryName: string;
  lastEdited: string;
  numberOfFile: number;
  icon: IconType;
  type?: string;
  dateCreated: string;
}

import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";

const CategoryComponent: React.FC<CategoryComponentProp> = ({ type, categoryName, dateCreated, lastEdited, numberOfFile, icon: Icon }) => {
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {}, [isDelete]);
  return (
    <div>
      {isDelete === true && type !== "special" ? (
        <div className="bg-black flex flex-col items-center justify-center text-[13px] border-[0.7px] rounded-[10px] w-[370px] h-[170px] border-gray-400">
          <span className="text-gray-400">
            Are you sure you want to delete <span className="text-white">{categoryName}</span> ?
          </span>
          <section className="flex gap-2 mt-2">
            <button onClick={() => setIsDelete(false)} className="hover:cursor-pointer text-black bg-white p-1 px-2 rounded-[5px]">
              Cancel
            </button>
            <button onClick={() => setIsDelete(false)} className="hover:cursor-pointer hover:bg-red-700 text-white bg-red-500 p-1 px-2 rounded-[5px]">
              Yes
            </button>
          </section>
        </div>
      ) : (
        <div
          className={`bg-black z-100 group hover:bg-[#080808] hover:cursor-pointer shrink-0 relative ${
            type === "special" ? "border-yellow-400" : "hover:border-gray-200 border-gray-400"
          } border-[0.7px] rounded-[10px] w-[370px] h-[170px] flex flex-col`}
        >
          {type !== "special" && <RiDeleteBin6Line onClick={() => setIsDelete(true)} className="absolute top-4 right-3 text-red-400 z-50" />}
          <section className="relative flex flex-col gap-1 h-[120px]">
            <section className="flex p-3 items-center gap-2">
              {(Icon as React.FC<any>)({ className: "text-white" })}
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
            } h-[50px] px-[10px] py-[10px] gap-[6px]`}
          >
            <div className="border-[0.7px] w-[50px] rounded-[5px] border-gray-400 flex justify-center items-center gap-2">
              <BsBoxSeam />
              {numberOfFile}
            </div>
            <div className="border-[0.7px] w-[50px] rounded-[5px] border-gray-400 flex justify-center items-center gap-2">
              <BsBoxSeam />
              {numberOfFile}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;