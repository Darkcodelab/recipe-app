import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe App API");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is listening on port ${PORT}`);
});
