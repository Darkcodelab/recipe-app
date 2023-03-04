import env from "../config";
import prisma from "../db";
import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET_KEY = env.JWT_SECRET_KEY;

// check if the given email already exists in the DB
async function checkExistingUser(email: string): Promise<Boolean> {
  const existinUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existinUser?.id) {
    return true;
  }
  return false;
}

// exlude the specified fields from the user object
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

// @route /api/user/register
// @method POST
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    // define zod schema
    const userSchema = z.object({
      name: z.string().min(1, { message: "This field has to be filled." }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email"),
      password: z
        .string()
        .min(8, { message: "password has to be atleast 8 characters long" }),
    });
    // validate with schema
    const validation = userSchema.safeParse({ name, email, password });
    if (validation.success === false) {
      res.json({ success: false, error: validation.error.issues[0].message });
      return;
    }
    // check for existing user
    if (await checkExistingUser(email)) {
      res.json({ success: false, error: "user already exists" });
      return;
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, 10),
      },
    });
    // validate newUser
    if (newUser) {
      const userWithoutPassword = exclude(newUser, ["password"]);
      res.json({ success: true, user: userWithoutPassword });
    } else {
      res.json({
        success: false,
        error: "Something went wrong while creating user",
      });
    }
  }
);

// @route /api/user/login
// @method POST
export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // define zod schema
    const userSchema = z.object({
      email: z.string().email("This is not a valid email"),
      password: z.string().min(1, "Password must not be empty"),
    });
    // validate with schema
    const validation = userSchema.safeParse({ email, password });
    if (validation.success === false) {
      res.json(validation);
      return;
    }
    const userFromDB = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userFromDB?.password) {
      res.json({ success: false, error: "Invalid credentials" });
      return;
    }
    // no user found with the given email
    if (!userFromDB) {
      res.json({ success: false, error: "Invalid credentials" });
    } else if (!bcrypt.compareSync(password, userFromDB.password)) {
      // password mismatch
      res.json({ success: false, error: "Invalid credentials" });
    } else {
      // successful login
      // create and send JWT token
      const userWithoutPassword = exclude(userFromDB, ["password"]);
      const token = jwt.sign(userWithoutPassword, JWT_SECRET_KEY, {
        expiresIn: "2 days",
      });
      res.json({ success: true, user: userWithoutPassword, token });
    }
  }
);

// @route /api/user/verifyToken
// @method POST
export const verifyToken = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let token = "";
    if (req?.headers?.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as User;
      if (decoded?.id) {
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        if (user?.id) {
          const userWithoutPassword = exclude(user, ["password"]);
          res.json({ success: true, user: userWithoutPassword });
          return;
        }
      }
    } catch (error: any) {
      console.log(error);
    }
    res.json({ success: false, error: "Invalid token" });
  }
);
