import { IconType } from "react-icons";

interface CategoryComponentProp {
  id: number,
  functionalName: string;
  categoryType: string;
  icon: IconType;
  lastEdited: string;
  dateCreated: string;
}

import catmeme from '../assets/catmeme.png';

const CategoryComponent:React.FC<CategoryComponentProp> = ({ id, functionalName, categoryType, icon, lastEdited, dateCreated }) => {
  return (
    <div 
      key={id}
      className="flex h-[52px] rounded-[5px] hover:bg-stone-900 p-1 hover:cursor-pointer"
    >
      {/* later icon */}
      <img className="size-[45px] rounded-[5px] border-[1px] border-gray-500"
        src={catmeme}
      />

      {/* name and type */}
      <section className="flex flex-col items-start flex-grow p-1 px-2">
        <span className="text-[13px] text-white">{functionalName}</span>
        <span className="text-[12px] text-gray-500">{categoryType}</span>
      </section>

    </div>
  )
}

export default CategoryComponent;