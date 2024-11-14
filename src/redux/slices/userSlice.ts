import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  timeBalance: number;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  timeBalance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateTimeBalance: (state, action: PayloadAction<number>) => {
      state.timeBalance += action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateTimeBalance, clearUser } = userSlice.actions;
export default userSlice.reducer;