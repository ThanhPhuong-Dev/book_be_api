import { Express } from "express";
import UserRouter from "../routes/UserRouter";
import BookRouter from "../routes/BookRouter";
import OrderRouter from "../routes/OrderRouter";
import RatingRouter from "../routes/RatingRouter";
const Routes = (app: Express) => {
  app.use("/api/user", UserRouter);
  app.use("/api/book", BookRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/rating", RatingRouter);
};

export default Routes;
