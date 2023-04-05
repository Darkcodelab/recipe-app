import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./reducers";
import { backendURL } from "../../config";

export type User = {
  id: number | null;
  name: string;
  email: string;
  favorites: string[];
  createdAt: string;
  updatedAt: string;
};

let initialState: User = {
  id: null,
  name: "",
  email: "",
  favorites: [],
  createdAt: "",
  updatedAt: "",
};

const userToken = localStorage.getItem("userToken");

if (userToken) {
  axios.defaults.headers.common["Authorization"] = `JWT ${userToken}`;
  try {
    const { data } = await axios.get(`${backendURL}/api/user/verifyToken`);
    if (data.success === true) {
      initialState = data.user;
    }
  } catch (error) {
    console.log("Error while verifying token");
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
