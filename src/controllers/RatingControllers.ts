import { Request, Response } from "express";
import { OrderServices } from "../services/OrderServices";
import { RatingModel } from "../model/RatingModel";
import { RatingServices } from "../services/RatingServices";

const ratingServices = new RatingServices();

export class RatingControllers {
  async Evaluate(req: Request, res: Response) {
    try {
      const { userID, ISBN, rating } = req.body;

      if (!userID || !ISBN || !rating) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }

      const ratingModel = new RatingModel(req.body);
      const resv = await ratingServices.Evaluate(ratingModel);
      return res.status(200).json(resv);
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}
