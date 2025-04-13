import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { deletePasswordAPI, updatePasswordAPI } from "../../api/PasswordAPI";
import { setUpdatePasswordModalOpen, setPasswords } from "../../features/PasswordSlice";
import { useEffect, useState } from "react";

const UpdatePasswordModal = () => {
  const dispatch = useDispatch();
  
  const passwords = useSelector((state: RootState) => state.password.passwords);
  const selectedPasswordObject = useSelector((state: RootState) => state.password.selectedPasswordObject);
  const updatePasswordModalOpen = useSelector((state: RootState) => state.password.updatePasswordModalOpen);  

  const [passwordUsageInput, setPasswordUsageInput] = useState<string | null>(selectedPasswordObject?.usage || '');
  const [passwordUsernameInput, setPasswordUsernameInput] = useState<string | null>(selectedPasswordObject?.username || '');
  const [passwordPasswordInput, setPasswordPasswordInput] = useState<string | null>(selectedPasswordObject?.password || '');
  
  const handleModalOpen = (status: boolean) => {
    dispatch(setUpdatePasswordModalOpen(status));
  };

  const handleDeletePassword = async () => {
    const updatedPasswords = passwords.filter((password) => password.id !== selectedPasswordObject?.id);
    dispatch(setPasswords(updatedPasswords));
    if (selectedPasswordObject) await deletePasswordAPI(selectedPasswordObject?.id);
    handleModalOpen(false);
  }

  const handleUpdatePassword = async () => {

    // const updatedPasswords = passwords.map((password) => password.id === selectedPasswordObject?.id ? {...password, usage: passwordUsageInput, username: passwordUsernameInput, password: passwordPasswordInput } : password);
    let updatedPasswordObject = null;
    const updatedPasswords = passwords.map((password) => {
      if (password.id === selectedPasswordObject?.id) {
        const updated = {
          ...password,
          usage: passwordUsageInput,
          username: passwordUsernameInput,
          password: passwordPasswordInput,
        };
        updatedPasswordObject = updated;
        return updated;
      }
      return password;
    });

    dispatch(setPasswords(updatedPasswords));
    if (updatedPasswordObject) await updatePasswordAPI(updatedPasswordObject);
    handleModalOpen(false);
  }

  useEffect(() => {
    setPasswordUsageInput(selectedPasswordObject?.usage || '');
    setPasswordUsernameInput(selectedPasswordObject?.username || '');
    setPasswordPasswordInput(selectedPasswordObject?.password || '');
  }, [selectedPasswordObject]);

  return (
    <Dialog open={updatePasswordModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="max-w-lg border border-gray-700 bg-black text-white rounded-[10px] w-[420px]">
          <DialogTitle className="flex items-center justify-center py-3 font-bold mb-2 border-b-[1px] border-gray-700">Update Password</DialogTitle>
          <section className="flex flex-col gap-2 text-[14px] p-4">
          <input
            value={passwordUsageInput || ''}
            onChange={(e) => setPasswordUsageInput(e.target.value)}
            className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
            placeholder="insert usage"
          />
          <input
            value={passwordUsernameInput || ''}
            onChange={(e) => setPasswordUsernameInput(e.target.value)}
            className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
            placeholder="insert username"
          />
          <input
            value={passwordPasswordInput || ''}
            onChange={(e) => setPasswordPasswordInput(e.target.value)}
            className="focus:outline-none focus:border-gray-500 border-gray-800 border-[1px] bg-black p-2 py-3 rounded-[5px] text-[12px]"
            placeholder="insert password"
          />
          </section>
          <div className="flex gap-4 justify-end mt-2 border-t-[1px] border-gray-700 py-3 pr-3">
            <button className="text-[13px] px-2 py-1 border-[1px] rounded-[5px] w-[100px] hover:cursor-pointer hover:bg-slate-700 border-gray-600" onClick={() => handleModalOpen(false)}>
              Cancel
            </button>
            <button 
              onClick={() => handleDeletePassword()}
              className="text-[13px] px-2 py-1 rounded-[5px] w-[100px] hover:cursor-pointer bg-red-500 hover:bg-red-600">
              Delete
            </button>
            <button 
              onClick={() => handleUpdatePassword()}
              className="text-[13px] px-2 py-1 rounded-[5px] w-[100px] hover:cursor-pointer bg-blue-500 hover:bg-blue-600">
              Update
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdatePasswordModal;
