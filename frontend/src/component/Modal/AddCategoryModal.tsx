import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { setAddCategoryModalOpen } from '../../features/category/CategorySlice';

const AddCategoryModal = () => {
  const dispatch = useDispatch();

  const addCategoryModalOpen = useSelector((state: RootState) => state.category.addCategoryModalOpen);

  const handleModalOpen = (status: boolean) => {
    dispatch(setAddCategoryModalOpen(status))
  }
  return (
    <>
      <Dialog open={addCategoryModalOpen} onClose={() => handleModalOpen(false)} className="relative z-280">
        <div className="fixed inset-0 flex w-screen items-center justify-center pb-20">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => handleModalOpen(false)}>Cancel</button>
              <button onClick={() => handleModalOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default AddCategoryModal;