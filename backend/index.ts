import dotenv from "dotenv";
import express, { Express } from "express";
import errorHandler from "./middlewares/errorHandler";

// routes handlers
import userHandler from "./routes/api/user";

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", userHandler);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is listening on port ${PORT}`);
});
