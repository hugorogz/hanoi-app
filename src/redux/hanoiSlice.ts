import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  steps: [],
  loading: false,
};

const hanoiSlice = createSlice({
  name: 'hanoi',
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<[]>) => {
      state.steps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSteps, setLoading } = hanoiSlice.actions;

export default hanoiSlice.reducer;
