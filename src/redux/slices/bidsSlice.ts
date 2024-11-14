import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bid {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface BidsState {
  list: Bid[];
  loading: boolean;
  error: string | null;
}

const initialState: BidsState = {
  list: [],
  loading: false,
  error: null,
};

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    addBid: (state, action: PayloadAction<Bid>) => {
      state.list.push(action.payload);
    },
    updateBidStatus: (state, action: PayloadAction<{ id: string; status: Bid['status'] }>) => {
      const bid = state.list.find(b => b.id === action.payload.id);
      if (bid) {
        bid.status = action.payload.status;
      }
    },
    setBids: (state, action: PayloadAction<Bid[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addBid, updateBidStatus, setBids } = bidsSlice.actions;
export default bidsSlice.reducer;