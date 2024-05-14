import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { store } from "./config/connectMongoDb";
import Routes from "./api/routes";
import cors from "cors";

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

store.connect();
Routes(app);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// "start": "ts-node-dev --respawn --transpileOnly src/server.ts"
