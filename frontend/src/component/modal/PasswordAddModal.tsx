import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import {addPassword, setAddPasswordModalOpen } from "../../features/category/PasswordSlice";
import { useState } from "react";
import { addPasswordAPI } from "../../api/PasswordAPI";

const AddPasswordModal = () => {
  const dispatch = useDispatch();
  const addPasswordModalOpen = useSelector((state: RootState) => state.password.addPasswordModalOpen);  
  const selectedCategoryObject = useSelector((state: RootState) => state.category.selectedCategoryObject);

  const [passwordUsageInput, setPasswordUsageInput] = useState<string | null>(null);
  const [passwordUsernameInput, setPasswordUsernameInput] = useState<string | null>(null);
  const [passwordPasswordInput, setPasswordPasswordInput] = useState<string | null>(null);

  const handleModalOpen = (status: boolean) => {
    dispatch(setAddPasswordModalOpen(status));
  };

  const handleAddPassword = async () => {

    const data = {
      categoryId: selectedCategoryObject?.id, 
      usage: passwordUsageInput,
      username: passwordUsernameInput,
      password: passwordPasswordInput,
    };

    const np = await addPasswordAPI(data);
    dispatch(addPassword(np));
    handleModalOpen(false)
  }

  return (
    <Dialog open={addPasswordModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="max-w-lg border border-gray-700 bg-black text-white rounded-[10px] w-[300px]">
          <DialogTitle className="flex items-center justify-center py-3 font-bold mb-2 border-b-[1px] border-gray-700">Add Password</DialogTitle>
          <section className="flex flex-col gap-2 text-[14px] p-4">
          <input
              onChange={(e) => setPasswordUsageInput(e.target.value)}
              className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
              placeholder="insert usage"
            />
          <input
            onChange={(e) => setPasswordUsernameInput(e.target.value)}
            className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
            placeholder="insert username"
          />
          <input
            onChange={(e) => setPasswordPasswordInput(e.target.value)}
            className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
            placeholder="insert password"
          />
          </section>
          <div className="flex gap-4 justify-end mt-2 border-t-[1px] border-gray-700 py-3 pr-3">
            <button className="text-[13px] px-2 py-1 border-[1px] rounded-[5px] w-[100px] hover:cursor-pointer hover:bg-slate-700 border-gray-600" onClick={() => handleModalOpen(false)}>
              Cancel
            </button>
            <button className="text-[13px] px-2 py-1 rounded-[5px] w-[100px] hover:cursor-pointer bg-red-700 hover:bg-red-900" onClick={() => handleAddPassword()}>
              Add
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddPasswordModal;
