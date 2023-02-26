import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config";
import prisma from "../db";

const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req?.headers?.authorization?.split(" ")[0] === "JWT") {
    try {
      const decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        env.JWT_SECRET_KEY
      ) as User;
      if (!decoded?.id) {
        res.locals.user = undefined;
        next();
        return;
      }
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (!user || user?.id) {
        res.locals.user = undefined;
        next();
      } else {
        res.locals.user = user;
        next();
      }
    } catch (error) {
      res.locals.user = undefined;
      next();
    }
  } else {
    res.locals.user = undefined;
    next();
  }
};

export default authorizeUser;
