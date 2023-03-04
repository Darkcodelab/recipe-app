import express from "express";

const router = express.Router();

// controllers
import {
  loginUser,
  registerUser,
  verifyToken,
} from "../../controllers/userController";

// @route /api/user/register
// @method POST
router.post("/register", registerUser);

// @route /api/user/login
// @method POST
router.post("/login", loginUser);

// @route /api/user/verifyToken
// @method GET
router.get("/verifyToken", verifyToken);

export default router;
