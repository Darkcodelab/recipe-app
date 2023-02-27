import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
