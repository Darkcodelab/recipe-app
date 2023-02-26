import express from "express";

const router = express.Router();

// controllers
import { loginUser, registerUser } from "../../controllers/userController";

// @route /api/user/register
// @method POST
router.post("/register", registerUser);

// @route /api/user/login
// @method POST
router.post("/login", loginUser);

export default router;
