import type { PayloadAction } from "@reduxjs/toolkit";

const reducers = {
  setRecipes: (state: any, action: PayloadAction<any>) => {
    state = action.payload;
    return state;
  },
};

export default reducers;
