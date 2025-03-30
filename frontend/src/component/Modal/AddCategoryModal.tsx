import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAddCategoryModalOpen, addCategory } from "../../features/category/CategorySlice";
import { useState } from "react";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const addCategoryModalOpen = useSelector((state: RootState) => state.category.addCategoryModalOpen);
  const categories = useSelector((state: RootState) => state.category.categories);

  const [categoryNameInput, setCategoryNameInput] = useState<string | null>(null);
  const [categoryTypeInput, setCategoryTypeInput] = useState<string | null>(null);

  const handleAddCategory = () => {
    console.log(categoryNameInput, categoryTypeInput);

    const newCategory = {
      name: categoryNameInput,
      type: categoryTypeInput,
      icon: null,
      id: categories.length + 1,
      date_created: new Date().toISOString(),
    }

    dispatch(addCategory(newCategory));
    handleModalOpen(false);
  };

  const handleModalOpen = (status: boolean) => {
    dispatch(setAddCategoryModalOpen(status));
  };
  return (
    <>
      <Dialog open={addCategoryModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
        <div className="fixed inset-0 flex w-screen items-center justify-center pb-15">
          <DialogPanel className="max-w-lg space-y-4 border border-gray-500 bg-black text-white p-5 rounded-[10px] w-[600px]">
            <DialogTitle className="font-bold">Add Category</DialogTitle>
            <section className="flex flex-col gap-3 text-[14px]">
              <input onChange={(e) => setCategoryNameInput(e.target.value)} className="focus:outline-none bg-stone-800 p-1 px-2 rounded-[5px]" placeholder="insert category name" />
              <input onChange={(e) => setCategoryTypeInput(e.target.value)} className="focus:outline-none bg-stone-800 p-1 px-2 rounded-[5px]" placeholder="insert category type" />
            </section>

            <div className="flex gap-4 justify-end">
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
