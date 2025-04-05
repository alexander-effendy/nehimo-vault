import { createSlice } from '@reduxjs/toolkit';
import { IconType } from "react-icons";

export interface CategoryComponentProp {
  id: number;
  name: string;
  type: string;
  date_created: string;
  last_edited: string;
  icon: IconType;
  colour: string;
}

interface CategoryState {
  categories: CategoryComponentProp[];
  selectedCategoryId: number | null;
  selectedCategoryObject: CategoryComponentProp | null;
  searchCategory: string | null;
  addCategoryModalOpen: boolean;
  deleteCategoryModalOpen: boolean;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategoryId: null,
  selectedCategoryObject: null,
  searchCategory: null,
  addCategoryModalOpen: false,
  deleteCategoryModalOpen: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    setSelectedCategory(state, action) {
      state.selectedCategoryId = action.payload;
    },
    setSelectedCategoryObject(state, action) {
      state.selectedCategoryObject = action.payload;
    },
    setSearchCategory(state, action) {
      state.searchCategory = action.payload;
    },
    setAddCategoryModalOpen(state, action) {
      state.addCategoryModalOpen = action.payload;
    },
    setDeleteCategoryModalOpen(state, action) {
      console.log('open')
      console.log(action.payload)
      state.deleteCategoryModalOpen = action.payload;
    }
  },
});

export const { 
  setCategories, 
  addCategory, 
  setSelectedCategory,
  setSelectedCategoryObject,
  setSearchCategory, 
  setAddCategoryModalOpen,
  setDeleteCategoryModalOpen } = categorySlice.actions;

export default categorySlice.reducer;
