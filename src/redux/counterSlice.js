import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
  openModel: false,
  data: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    togglemodel: (state, action) => {
      state.openModel = !state.openModel;
      state.data = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { togglemodel, decrement, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
