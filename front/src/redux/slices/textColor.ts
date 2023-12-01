import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TextColorState = {
  backgroundTextColor: string;
};

const initialState: TextColorState = {
  backgroundTextColor:
    localStorage.getItem("backgroundTextColor") !== null
      ? localStorage.getItem("backgroundTextColor")!
      : "white",
};

const textColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    updateTextColor: (state, action: PayloadAction<string>) => {
      state.backgroundTextColor = action.payload;
      localStorage.setItem("backgroundTextColor", action.payload);
    },
    clearTextFormatting: (state) => {
      state.backgroundTextColor = "white";
      localStorage.removeItem("backgroundTextColor");
    },
  },
});

export const textColorActions = textColorSlice.actions;
const textColorReducer = textColorSlice.reducer;
export default textColorReducer;
