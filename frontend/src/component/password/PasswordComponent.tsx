import { PasswordComponentProp } from "@/features/category/PasswordSlice";
import { useState } from "react";
import { formatCreatedDate } from "../../utils/date";

const PasswordComponent: React.FC<PasswordComponentProp> = ({ id, categoryid, usage, username, password, date_created, last_edited}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex items-center h-[40px] text-[11px] text-gray-500 px-[34px]">
      <span className="w-[25px]">{id}</span>  
      <span className="w-[150px] truncate">{usage}</span>
      <span className="w-[180px] truncate">{username}</span>
      <span onClick={() => setShowPassword(prevState => !prevState)} className="hover:cursor-pointer w-[173px] truncate">{showPassword ? password : '*****************'}</span>
      <span className="w-[70px]">{formatCreatedDate(date_created)}</span>
    </div>
  )
}

export default PasswordComponent;