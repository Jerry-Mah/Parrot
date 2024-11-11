// redux/printerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const printerSlice = createSlice({
  name: "printer",
  initialState: {
    ready: false,
  },
  reducers: {
    setReady: (state, action) => {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = printerSlice.actions;
export default printerSlice.reducer;