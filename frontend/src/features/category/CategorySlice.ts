// src/features/category/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { IconType } from "react-icons";

export interface CategoryComponentProp {
  id: number;
  name: string;
  type: string;
  date_created: string;
  last_edited: string;
  icon: IconType;
}

interface CategoryState {
  categories: CategoryComponentProp[];
  selectedCategoryId: number | null;
  searchCategory: string | null;
  addCategoryModalOpen: boolean;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategoryId: null,
  searchCategory: null,
  addCategoryModalOpen: false,
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
    setSearchCategory(state, action) {
      state.searchCategory = action.payload;
    },
    setAddCategoryModalOpen(state, action) {
      state.addCategoryModalOpen = action.payload;
    }
  },
});

export const { 
  setCategories, 
  addCategory, 
  setSelectedCategory, 
  setSearchCategory, 
  setAddCategoryModalOpen } = categorySlice.actions;
export default categorySlice.reducer;
