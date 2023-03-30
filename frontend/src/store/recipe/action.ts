import axios from "axios";
import { backendURL } from "../../config";
import { AppDispatch } from "../store";
import { setRecipes } from "./slice";

export const fetchRecipes =
  (recipeData: any) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/recipes`, {
        recipeData,
      });
      if (data.success === true) {
        dispatch(setRecipes(data.recipes));
      }
      return data;
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };
