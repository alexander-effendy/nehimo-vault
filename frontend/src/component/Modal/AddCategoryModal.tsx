import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAddCategoryModalOpen, addCategory } from "../../features/category/CategorySlice";
import { useState } from "react";

import { addCategoryAPI } from "../../api/CategoryAPI";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const addCategoryModalOpen = useSelector((state: RootState) => state.category.addCategoryModalOpen);
  const categories = useSelector((state: RootState) => state.category.categories);

  const [categoryNameInput, setCategoryNameInput] = useState<string | null>(null);
  const [categoryTypeInput, setCategoryTypeInput] = useState<string | null>(null);

  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleAddCategory = () => {
    console.log(categoryNameInput, categoryTypeInput);

    if (!categoryNameInput || !categoryTypeInput) {
      setShowWarning(true)
      return;
    }

    const newCategory = {
      name: categoryNameInput,
      type: categoryTypeInput,
      icon: null,
      id: categories.length + 1,
      date_created: new Date().toISOString(),
    }
    // update redux store first (optimistic update)
    dispatch(addCategory(newCategory));
    // then calls API

    const newCategoryAPI = {
      name: categoryNameInput,
      type: categoryTypeInput,
      icon: null,
    }
    addCategoryAPI(newCategoryAPI);

    handleModalOpen(false);
  };

  const handleModalOpen = (status: boolean) => {
    if (!status) setShowWarning(false);
    dispatch(setAddCategoryModalOpen(status));
  };
  return (
    <>
      <Dialog open={addCategoryModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
        <div className="fixed inset-0 flex w-screen items-center justify-center pb-15">
          <DialogPanel className="max-w-lg border border-gray-500 bg-black text-white p-5 rounded-[10px] w-[600px]">
            <DialogTitle className="font-bold mb-2">Add Category</DialogTitle>
            {showWarning && <span className="leading-none text-red-500 text-[13px]">Inputs cannot be empty!</span>}
            <section className="flex flex-col gap-3 text-[14px]">
              <input onChange={(e) => setCategoryNameInput(e.target.value)} className="focus:outline-none border-gray-600 border-[1px] bg-black p-2 rounded-[5px]" placeholder="insert category name" />
              <input onChange={(e) => setCategoryTypeInput(e.target.value)} className="focus:outline-none border-gray-600 border-[1px] bg-black p-2 rounded-[5px]" placeholder="insert category type" />
            </section>

            <div className="flex gap-4 justify-end mt-5">
              <button className="text-[13px] border px-2 py-1 rounded-[5px]" onClick={() => handleModalOpen(false)}>
                Cancel
              </button>
              <button className="text-[13px] border px-2 py-1 rounded-[5px]" onClick={() => handleAddCategory()}>
                Add
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default AddCategoryModal;
