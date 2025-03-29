// importing BASICs
import React, { useEffect, useState } from "react";

// importing fake data
import fakeCategoryData, { fakeCategoryInterface } from './data/categoryDataFake';

// importing tsx components
import PasswordComponent from "./component/PasswordComponent";
import CategoryComponent from "./component/CategoryComponent";
import Header from "./component/Header";
import CategoryList from "./component/CategoryList";
import MainContent from "./component/MainContent";

// importing CSS
import "./App.css";

// importing icons
import { TfiLock } from "react-icons/tfi";
import { AiOutlineCloud } from "react-icons/ai";

// ################################################################################################## //

const LockedOverlay = () => {
  return (
    <div className="absolute  w-screen h-screen bg-black z-200 flex items-center justify-center">
      <span className="text-white">The app is currently locked. Tap the lock icon to unlock it.</span>
    </div>
  )
}

const App = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    console.log('App.tsx starting');
  }, []);

  return (
    <div className={`w-screen h-screen flex items-center bg-black justify-center relative overflow-hidden ${isLocked && 'blur-sm'}`}>
      <Header />

      <TfiLock
        onClick={() => setIsLocked((isLocked) => !isLocked)}
        size={15}
        className="z-230 hover:cursor-pointer text-white absolute top-3 right-3 transition-all duration-1000 hover:text-yellow-300 "
      />

      {/* overlay layer that covers everything except the dropdown */}
      {/* {dropDownIsOpen &&       
        <Overlay />
      } */}

      {isLocked &&       
        <LockedOverlay />
      }

      {/* Category List */}
      <CategoryList />

      {/* Password List */}
      <MainContent />

      {/* <CategoryDropDown dropDownIsOpen={dropDownIsOpen} setDropdownIsOpen={setDropdownIsOpen} /> */}
      
      {/* <section className="absolute flex flex-col gap-[20px] bottom-0 w-full h-[560px] p-[14px] px-[20px] overflow-x-hidden overflow-y-auto">
        <PasswordComponent />
        <PasswordComponent />
        <PasswordComponent />
      </section> */}
    </div>
  );
};

// ################################################################################################## //

interface CategoryDropDownProps {
  dropDownIsOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ dropDownIsOpen, setDropdownIsOpen }) => {

  const [data, setData] = useState<fakeCategoryInterface[]>(fakeCategoryData);

  return (
    <section className="absolute top-5 left-4 w-[370px] z-120">
      {/* menu button */}
      <div onClick={() => setDropdownIsOpen((open) => !open)} className="w-[290px] hover:cursor-pointer rounded-[5px] text-white ">
        <CategoryComponent type="special" categoryName="Work" dateCreated="2023-01-01" lastEdited="2023-01-01" numberOfFile={3} icon={AiOutlineCloud} />
      </div>
      {/* menu dropdown */}
      {dropDownIsOpen && (
        <div className="soft-scrollbar-right mt-[20px] flex flex-col gap-[20px] text-white h-[380px] overflow-y-auto overflow-x-hidden w-[380px] rounded-[7px]">
          {data.map((item) => (
            <CategoryComponent categoryName={item.categoryName} dateCreated={item.dateCreated} lastEdited={item.lastEdited} numberOfFile={item.numberOfFile} icon={item.icon} />
          ))}
        </div>
      )}
    </section>
  );
};

// ################################################################################################## //

export default App;
