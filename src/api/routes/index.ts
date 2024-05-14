import { Express } from "express";
import UserRouter from "../routes/UserRouter";
import BookRouter from "../routes/BookRouter";
const Routes = (app: Express) => {
  app.use("/api/user", UserRouter);
  app.use("/api/book", BookRouter);
};

export default Routes;
