import { AiFillApple } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

const HeaderCategory = () => {
  return (
    <section className="flex flex-col rounded-[10px] h-[55px] pt-2 px-1">
      <section className="w-full flex  text-white justify-between bg-yellow-500s h-[40px]">
        <section className="flex items-center gap-1">
          <AiFillApple className="text-white size-[25px] pb-[3px] flex my-auto" />
          <span className="text-[13px]">Categories</span>
        </section>
        <section className="flex my-auto hover:cursor-pointer hover:bg-gray-800 transition-all duration-500 rounded-[7px] p-1">
          <GoPlus size={20} />
        </section>
      </section>
    </section>
  );
};

export default HeaderCategory;