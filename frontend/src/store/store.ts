import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user/slice";
import recipeReducer from "./recipe/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
