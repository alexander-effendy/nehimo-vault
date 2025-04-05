import { createSlice } from '@reduxjs/toolkit';

export interface PasswordComponentProp {
  id: number;
  categoryid: number;
  usage: string;
  username: string;
  password: string;
  date_created: string;
  last_edited: string;
}

interface PasswordState {
  passwords: PasswordComponentProp[];
  addPasswordModalOpen: boolean;
}

const initialState: PasswordState = {
  passwords: [],
  addPasswordModalOpen: false,
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
      state.addPasswordModalOpen= action.payload;
    },
  },
});

export const { setPasswords, addPassword, setAddPasswordModalOpen } = passwordSlice.actions;
export default passwordSlice.reducer;