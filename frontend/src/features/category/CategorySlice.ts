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
}

const initialState: CategoryState = {
  categories: [],
  selectedCategoryId: null
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
    }
  },
});

export const { setCategories, addCategory, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
