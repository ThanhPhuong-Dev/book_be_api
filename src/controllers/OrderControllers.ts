import { Request, Response } from "express";
import { OrderServices } from "../services/OrderServices";

const orderService = new OrderServices();
export class OrderControllers {
  async buyBook(req: Request, res: Response) {
    try {
      const data = req.body;

      const resv = await orderService.buyBook(data);
      return res.status(200).json(resv);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getOrderAll(req: Request, res: Response) {
    try {
      const response = await orderService.getOrderAll();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e,
      });
    }
  }

  async getOrderUser(req: Request, res: Response) {
    try {
      const userID = req.params.id;

      if (!userID) {
        return res.status(200).json({
          status: "ERROR",
          message: "the userID is required",
        });
      }
      const response = await orderService.getOrderUser(userID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e,
      });
    }
  }

  //   async orderCancel(req: Request, res: Response) {
  //     try {
  //       const userID = req.params.id;

  //       if (!userID) {
  //         return res.status(200).json({
  //           status: "ERROR",
  //           message: "the userID is required",
  //         });
  //       }
  //       const response = await orderService.orderCancel(userID);
  //       return res.status(200).json(response);
  //     } catch (e) {
  //       return res.status(400).json({
  //         message: e,
  //       });
  //     }
  //   }
}
