import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAddCategoryModalOpen, addCategory } from "../../features/CategorySlice";
import { useState } from "react";

import { addCategoryAPI } from "../../api/CategoryAPI";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const addCategoryModalOpen = useSelector((state: RootState) => state.category.addCategoryModalOpen);
  // const categories = useSelector((state: RootState) => state.category.categories);

  const [categoryNameInput, setCategoryNameInput] = useState<string | null>(null);
  const [categoryTypeInput, setCategoryTypeInput] = useState<string | null>(null);

  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleAddCategory = async () => {
    if (!categoryNameInput || !categoryTypeInput) {
      setShowWarning(true);
      return;
    }

    // const newCategory = {
    //   name: categoryNameInput,
    //   type: categoryTypeInput,
    //   icon: null,
    //   id: categories.length + 1,
    //   date_created: new Date().toISOString(),
    //   colour: "#bdbdbd",
    // };
    // dispatch(addCategory(newCategory));

    const newCategoryAPI = {
      name: categoryNameInput,
      type: categoryTypeInput,
      icon: null,
      colour: "#bdbdbd",
    };

    const nc = await addCategoryAPI(newCategoryAPI);
    dispatch(addCategory(nc));
    handleModalOpen(false);
  };

  const handleModalOpen = (status: boolean) => {
    if (!status) setShowWarning(false);
    dispatch(setAddCategoryModalOpen(status));
  };
  return (
    <Dialog open={addCategoryModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="max-w-lg border border-gray-700 bg-black text-white rounded-[10px] w-[600px]">
          <DialogTitle className="flex items-center justify-center py-3 font-bold mb-2 border-b-[1px] border-gray-700">Add Category</DialogTitle>
          {showWarning && <span className="px-5 text-red-500 text-[13px]">Inputs cannot be empty</span>}
          <section className="flex flex-col gap-5 text-[14px] p-4">
            <input
              onChange={(e) => setCategoryNameInput(e.target.value)}
              className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
              placeholder="insert category name"
            />
            <input
              onChange={(e) => setCategoryTypeInput(e.target.value)}
              className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
              placeholder="insert category type"
            />
          </section>
          <div className="flex gap-4 justify-end mt-2 border-t-[1px] border-gray-700 py-3 pr-3">
            <button className="text-[13px] px-2 py-1 rounded-[5px] w-[100px] bg-red-700 hover:cursor-pointer hover:bg-red-900" onClick={() => handleModalOpen(false)}>
              Cancel
            </button>
            <button className="text-[13px] border-[1px] border-gray-600 px-2 py-1 rounded-[5px] w-[100px] hover:cursor-pointer hover:bg-slate-700" onClick={() => handleAddCategory()}>
              Add
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddCategoryModal;
