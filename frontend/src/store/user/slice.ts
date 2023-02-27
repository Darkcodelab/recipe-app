import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { useAppSelector } from "../hooks";
import { userLogin } from "./actions";

export type User = {
  id: number | null;
  name: string;
  email: string;
  favorites: string[];
  createdAt: string;
  updatedAt: string;
};

const initialState: User = {
  id: null,
  name: "",
  email: "",
  favorites: [],
  createdAt: "",
  updatedAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
