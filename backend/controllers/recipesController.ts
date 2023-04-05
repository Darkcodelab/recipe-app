import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import axios from "axios";
import env from "../config";

const EDAMAM_API_URI = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${env.EDAMAM_APP_ID}&app_key=${env.EDAMAM_APP_KEY}`;

// @route /api/recipes
// @method POST
// @access private
export const fetchRecipes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // check authorization
    if (!res.locals.user) {
      res.status(401).json({ success: false, error: "UnAuthorized" });
      return;
    }
    // request body fields validation
    const { recipeData } = req.body;
    const recipeDataSchema = z.object({
      q: z.string(),
      diet: z.string(),
      dishType: z.string(),
      cuisineType: z.string(),
      mealType: z.string(),
    });
    const validation = recipeDataSchema.safeParse(recipeData);
    if (validation.success === false) {
      res.json({ success: false, error: "Invalid fields" });
      return;
    }
    const url = new URL(EDAMAM_API_URI);
    for (const key in recipeData) {
      const d = recipeData[key];
      if (d) url.searchParams.append(key, recipeData[key]);
    }
    const { data } = await axios.get(url.toString());
    res.json({ success: true, recipes: data.hits });
  }
);
