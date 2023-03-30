import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers,
});

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
