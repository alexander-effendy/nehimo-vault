import { PasswordComponentProp } from "@/features/PasswordSlice";
import { useState } from "react";
import { formatCreatedDate } from "../../utils/date";
import { PiDotsThreeOutlineLight } from "react-icons/pi";

const PasswordComponent: React.FC<PasswordComponentProp> = ({ id, categoryid, usage, username, password, date_created, last_edited}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const adjust = 0;
  return (
    <div key={categoryid} className="shrink-0 relative flex items-center h-[40px] text-[11px] text-gray-500 px-[34px]">
      <span className="w-[25px]">{id}</span>  
      <span className={`w-[150px] truncate`}>{usage}</span>
      <span className="w-[160px] truncate">{username}</span>
      <span onClick={() => setShowPassword(prevState => !prevState)} className={`flex items-center select-none highlightable hover:cursor-pointer w-[160px] truncate ${!showPassword && 'pt-[5px]'}`}>{showPassword ? password : '*****************'}</span>
      <span className="w-[70px] flex items-center justify-start">{formatCreatedDate(date_created)}</span>
      <PiDotsThreeOutlineLight className="absolute right-7 text-gray-700 hover:text-gray-500 hover:cursor-pointer" size={15}/>
    </div>
  )
}

export default PasswordComponent;