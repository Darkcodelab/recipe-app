import express, { Express } from "express";
import errorHandler from "./middlewares/errorHandler";
import env from "./config";
import cors from "cors";

// routes handlers
import userHandler from "./routes/api/user";

const app: Express = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.105:5173"],
  })
);

// routes
app.use("/api/user", userHandler);

// error handler
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[server]: Server is listening on port ${env.PORT}`);
});
