import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  skill: string;
  date: string;
}

interface TransactionsState {
  list: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  list: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.list.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTransactions, addTransaction, setLoading, setError } = transactionsSlice.actions;
export default transactionsSlice.reducer;