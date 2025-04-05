import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CategoryComponentProp, setDeleteCategoryModalOpen, setCategories, setSelectedCategory } from "../../features/category/CategorySlice";

import { deleteCategoryAPI } from "../../api/CategoryAPI";
import { useEffect, useState } from "react";

const DeleteCategoryModal = () => {
  const dispatch = useDispatch();
  const deleteCategoryModalOpen = useSelector((state: RootState) => state.category.deleteCategoryModalOpen);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const categories = useSelector((state: RootState) => state.category.categories);
  const selectedCategoryObject = useSelector((state: RootState) => state.category.selectedCategoryObject);

  const [category, setCategory] = useState<CategoryComponentProp | null>(null);

  const handleDeleteCategory = () => {
    // remove that category from categories form redux (frontend)
    const updatedCategories = categories.filter((category) => category.id !== selectedCategory);
    dispatch(setCategories(updatedCategories));

    // delete category backend --> db
    console.log(selectedCategory)
    deleteCategoryAPI(selectedCategory);

    // CategoryContent should show the first one!
    setSelectedCategory(1);
    handleModalOpen(false);
  };

  const handleModalOpen = (status: boolean) => {
    if (selectedCategory) {
      setCategory(categories[selectedCategory - 1])
    } else {
      setCategory(categories[0]);
    }
    dispatch(setDeleteCategoryModalOpen(status));
  };

  useEffect(() => {
    console.log(category)
  }), [category];

  return (
    <Dialog open={deleteCategoryModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
      <div className="fixed inset-0 flex w-screen items-center">
        <DialogPanel className="absolute right-40 max-w-lg border border-gray-700 bg-black text-white rounded-[10px] w-[400px]">
          <DialogTitle className="flex items-center justify-center py-3 font-bold mb-2 border-b-[1px] border-gray-700">Delete Category</DialogTitle>
          <section className="flex flex-col gap-1 text-[14px] p-4">
            <span>Are you sure you want to delete the category <span className="font-bold text-blue-300">{selectedCategoryObject?.name}</span>?</span>
            <span className="text-[12px] text-gray-400">Deleting this category will also delete all the passwords in it.</span>
          </section>
          <div className="flex gap-4 justify-end mt-2 border-t-[1px] border-gray-700 py-3 pr-3">
            <button className="text-[13px] px-2 py-1 border-[1px] rounded-[5px] w-[100px] hover:cursor-pointer hover:bg-slate-700 border-gray-600" onClick={() => handleModalOpen(false)}>
              Cancel
            </button>
            <button className="text-[13px] px-2 py-1 rounded-[5px] w-[100px] hover:cursor-pointer bg-red-700 hover:bg-red-900" onClick={() => handleDeleteCategory()}>
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteCategoryModal;
