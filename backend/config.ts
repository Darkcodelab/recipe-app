import dotenv from "dotenv";
import { cleanEnv, str, num, url } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  JWT_SECRET_KEY: str(),
  PORT: num({ default: 3001 }),
  DATABASE_URL: url(),
  EDAMAM_APP_KEY: str(),
  EDAMAM_APP_ID: str(),
});

export default env;
