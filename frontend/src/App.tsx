// importing BASICs
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// importing fake data

// importing tsx components
import Header from "./component/Header";
import CategoryList from "./component/category/CategoryList";
import CategoryContent from "./component/category/CategoryContent";

// importing CSS
import "./App.css";

// importing icons
import { TfiLock } from "react-icons/tfi";
import AddCategoryModal from "./component/modal/CategoryAddModal";

// ################################################################################################## //

const LockedOverlay = () => {
  return (
    <div className="absolute w-screen h-screen bg-black z-200 flex items-center justify-center">
      <span className="text-white">The app is currently locked. Tap the lock icon to unlock it.</span>
    </div>
  )
}

const ModalOverlay = () => {
  return (
    <div className="absolute w-screen h-screen bg-black opacity-80 z-200 flex items-center justify-center">
    
    </div>
  )
}

const App = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const addCategoryModalOpen = useSelector((state: RootState) => state.category.addCategoryModalOpen);

  useEffect(() => {
    // console.log('App.tsx starting');
  }, []);

  return (
    <div className={`w-screen h-screen flex items-center bg-black justify-center relative overflow-hidden ${isLocked && 'blur-sm'}`}>
      <Header />
      <TfiLock
        onClick={() => setIsLocked((isLocked) => !isLocked)}
        size={15}
        className="z-230 hover:cursor-pointer text-white absolute top-3 right-3 transition-all duration-1000 hover:text-yellow-300 "
      />

      <AddCategoryModal />
      {addCategoryModalOpen && <ModalOverlay />}
      {isLocked && <LockedOverlay />}

      {/* Category List */}
      <CategoryList />

      {/* Password List */}
      <CategoryContent />
    </div>
  );
};

export default App;
