import { Router } from "express";
const router = Router();

// middlewares
import authorizeUser from "../../middlewares/authorizeUser";

// controllers
import { fetchRecipes } from "../../controllers/recipesController";

// @route /api/recipes
// @method POST
// @access private
router.post("/", authorizeUser, fetchRecipes);

export default router;
