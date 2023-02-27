import axios from "axios";
import { AppDispatch } from "../store";
import { setUser } from "./slice";

const backendURL = "http://localhost:3001";

type userData = {
  user: {
    name?: string;
    email: string;
    password: string;
  };
};

export const userLogin =
  (userData: userData) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        userData.user
      );
      if (data.success === true) {
        localStorage.setItem("userToken", data.token);
        dispatch(setUser(data.user));
      }
      return data;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

export const userRegister = async (userData: userData) => {
  try {
    const { data } = await axios.post(
      `${backendURL}/api/user/register`,
      userData.user
    );
    return data;
  } catch (error: any) {
    return { success: false, error: error?.message };
  }
};
