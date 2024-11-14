import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Request {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  estimatedHours: number;
  bidCount: number;
  category: string;
  userId: string;
  createdAt: string;
}

interface RequestsState {
  list: Request[];
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: '1',
        title: 'Website Development for Local Business',
        description: 'Need a modern website for my restaurant with online ordering capabilities',
        status: 'open',
        estimatedHours: 20,
        bidCount: 5,
        category: 'Development',
        userId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Logo Design for Tech Startup',
        description: 'Looking for a minimalist, modern logo design for my AI startup',
        status: 'open',
        estimatedHours: 5,
        bidCount: 8,
        category: 'Design',
        userId: 'user2',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Content Writing for Blog Posts',
        description: 'Need 5 SEO-optimized blog posts about sustainable living',
        status: 'in_progress',
        estimatedHours: 10,
        bidCount: 3,
        category: 'Writing',
        userId: 'user3',
        createdAt: new Date().toISOString(),
      },
    ];
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Request>) => {
      state.list.unshift(action.payload);
    },
    updateRequest: (state, action: PayloadAction<Partial<Request> & { id: string }>) => {
      const index = state.list.findIndex(request => request.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action: PayloadAction<Request[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addRequest, updateRequest } = requestsSlice.actions;
export default requestsSlice.reducer;