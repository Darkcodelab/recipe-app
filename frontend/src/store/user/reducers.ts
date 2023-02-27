import type { User } from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";

const reducers = {
  setUser: (state: User, action: PayloadAction<User>) => {
    state = action.payload;
    return state;
  },
};

export default reducers;
