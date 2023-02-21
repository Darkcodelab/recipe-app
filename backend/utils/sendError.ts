import { Request, Response } from "express";

export default function sendError(
  statusCode: number,
  err: string,
  req: Request,
  res: Response
) {
  res.status(statusCode);
  throw new Error(err);
}
