import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { z } from "zod";

export const fetchRecipes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!res.locals.user) {
      res.status(401).json({ success: false, error: "UnAuthorized" });
      return;
    }
    const { recipeData } = req.body;
    const recipeDataSchema = z.object({
      query: z.string(),
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
    res.json({ success: true, recipes: [{ id: 1, recipe: "One" }] });
  }
);
