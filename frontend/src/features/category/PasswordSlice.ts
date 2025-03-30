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
}

const initialState: PasswordState = {
  passwords: [],
}

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPasswords(state, action) {
      state.passwords = action.payload;
    }
  },
});

export const { setPasswords } = passwordSlice.actions;
export default passwordSlice.reducer;