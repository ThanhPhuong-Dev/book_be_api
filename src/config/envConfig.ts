import dotenv from "dotenv";
import { IEnvConfig } from "../interface/IEvnConfig";
dotenv.config();
export const EnvConfig: IEnvConfig = {
  mongoSettings: {
    mongoUrl: process.env.MONGOURL || "",
    mongoDatabase: process.env.DATABASE || "",
  },
  jsonWebToken: {
    access_token: process.env.ACCESS_TOKEN || "",
    refresh_token: process.env.REFRESH_TOKEN || "",
  },
};
