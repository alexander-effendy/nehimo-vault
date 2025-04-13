import { createSlice } from '@reduxjs/toolkit';

export interface PasswordComponentProp {
  id: number;
  idx: number;
  categoryid: number;
  usage: string;
  username: string;
  password: string;
  date_created: string;
  last_edited: string;
}

export interface PasswordState {
  passwords: PasswordComponentProp[];
  addPasswordModalOpen: boolean;
  updatePasswordModalOpen: boolean;
  selectedPasswordObject: PasswordComponentProp | null;
}

const initialState: PasswordState = {
  passwords: [],
  addPasswordModalOpen: false,
  updatePasswordModalOpen: false,
  selectedPasswordObject: null,
}

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPasswords(state, action) {
      state.passwords = action.payload;
    },
    addPassword(state, action) {
      state.passwords.push(action.payload);
    },
    setAddPasswordModalOpen(state, action) {
      state.addPasswordModalOpen = action.payload;
    },
    setUpdatePasswordModalOpen(state, action) {
      state.updatePasswordModalOpen= action.payload;
    },
    setSelectedPasswordObject(state, action) {
      state.selectedPasswordObject = action.payload;
    },
  },
});

export const { 
  setPasswords, 
  addPassword, 
  setAddPasswordModalOpen, 
  setUpdatePasswordModalOpen,
  setSelectedPasswordObject } = passwordSlice.actions;
export default passwordSlice.reducer; 