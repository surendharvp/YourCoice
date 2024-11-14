import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Skill {
  id: string;
  title: string;
  provider: string;
  rating: number;
}

interface SkillsState {
  list: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async () => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', title: 'Web Development', rating: 4.5, provider: 'John Doe' },
      { id: '2', title: 'Graphic Design', rating: 4.2, provider: 'Jane Smith' },
      { id: '3', title: 'Language Tutoring', rating: 4.8, provider: 'Mike Johnson' },
      { id: '4', title: 'Cooking Lessons', rating: 4.0, provider: 'Emily Brown' },
    ];
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default skillsSlice.reducer;