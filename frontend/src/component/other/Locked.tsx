import { useState } from "react";

// icons
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import catmeme from '../../assets/catmeme.png';

const LockedOverlay = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(prevState => !prevState)
  };

  return (
    <div className="absolute w-screen h-screen bg-black z-200 flex flex-col items-center justify-center gap-2">
      <section className="flex mb-[40px]">
      {/* <FaRedditAlien className="text-white size-[100px]"/> */}
      {/* <FaApple className="text-white size-[70px]"/> */}
      <img src={catmeme} className="size-[120px] rounded-full border-[1px] border-white"/>
      </section>
      <span className="z-401 text-white">The app is currently locked. Enter password to unlock.</span>
      <section className="relative w-[400px] flex items-center">
        <input className="border-[1px] border-stone-400 rounded-[5px] w-[400px] focus:outline-none text-white text-[12px] px-2 py-1" type={showPassword ? '' : 'password'} placeholder="Enter password to unlock" />
        {showPassword ? 
          <FaEyeSlash onClick={() => handleShowPasswordClick()} className="absolute right-2 text-white hover:cursor-pointer" /> : 
          <FaEye onClick={() => handleShowPasswordClick()} className="absolute right-2 text-white hover:cursor-pointer" />
        }
      </section>

      <button 
        // onClick={() => handleUnlockApp()}
        className="hover:cursor-pointer hover:bg-stone-400 hover:border-[0px] transition-all duration-500 text-black bg-stone-100 border-[1px] border-stone-600 rounded-[5px] w-[400px] text-[12px] p-1"
      >
        Enter
      </button>
      
    </div>
  )
}

export default LockedOverlay;