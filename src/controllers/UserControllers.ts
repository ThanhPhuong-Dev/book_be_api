import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import { UserModel } from "../model/UserModel";
import { ObjectId } from "mongodb";
import { ValidateEmail } from "../utils/IsValidateEmail";

const userServices = new UserServices();
class UserControllers {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      console.log(req.body);

      if (!email || !password || !confirmPassword) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: "ERR",
          message: "Mật khẩu khác nhau",
        });
      }
      if (!ValidateEmail(email)) {
        return res.status(400).json({
          status: "ERR",
          message: "Email không chính xác",
        });
      }

      const dataUser = new UserModel({
        name,
        email,
        password,
      });
      const response = await userServices.createUser(dataUser);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log("chay dc");

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }
      if (!ValidateEmail(email)) {
        return res.status(401).json({
          status: "ERR",
          message: "Email không chính xác",
        });
      }

      const response = await userServices.login(email, password);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getUserDetails(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({
          status: "ERR",
          message: "Id required",
        });
      }
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({
          status: "ERR",
          message: "Id Không chính xác",
        });
      }
      const response = await userServices.userDetails(userId);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const response = await userServices.getUserAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}

const userController = new UserControllers();
export default userController;
