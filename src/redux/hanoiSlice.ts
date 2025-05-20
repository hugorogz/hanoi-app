import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  results: [],
  loading: false,
};

const hanoiSlice = createSlice({
  name: 'hanoi',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<[]>) => {
      state.notes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setResults, setLoading } = hanoiSlice.actions;

export default hanoiSlice.reducer;
