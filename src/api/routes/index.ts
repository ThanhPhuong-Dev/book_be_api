import { Express } from "express";
import UserRouter from "../routes/UserRouter";
import BookRouter from "../routes/BookRouter";
import OrderRouter from "../routes/OrderRouter";
const Routes = (app: Express) => {
  app.use("/api/user", UserRouter);
  app.use("/api/book", BookRouter);
  app.use("/api/order", OrderRouter);
};

export default Routes;
