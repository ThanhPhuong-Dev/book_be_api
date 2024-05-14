import { store } from "../config/connectMongoDb";
import { IUser } from "../interface/IUser";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel";
import { generalAccessToken } from "./jwtServices";
export class UserServices {
  async createUser(data: IUser) {
    try {
      const isUser = await store.user().checkEmail(data.email);

      if (isUser !== null) {
        return {
          status: "ERR",
          message: "Email này đã tồn tại",
        };
      }
      const hashPassword = bcrypt.hashSync(data.password, 10);

      const newUser = await store
        .user()
        .create({ ...data, password: hashPassword });
      return {
        status: "OK",
        message: "Tạo tài khoản thành công",
        data: newUser,
      };
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async login(email: string, password: string) {
    try {
      const checkUser: IUser | any = await store.user().checkEmail(email);
      if (!checkUser) {
        return {
          status: "ERR",
          message: "Người dùng không tồn tại",
        };
      }
      const checkPassword = bcrypt.compareSync(password, checkUser.password);
      if (!checkPassword) {
        return {
          status: "ERR",
          message: "Sai mật khẩu ",
        };
      }

      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      return {
        status: "OK",
        message: "Đăng nhập thành công",
        access_token: access_token,
      };
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async userDetails(userID: string) {
    try {
      const isUserId = await store.user().checkUserId(userID);
      if (isUserId === null) {
        return {
          status: "ERR",
          message: "Người dùng không tồn tại",
        };
      }

      const user = await store.user().getUser(userID);
      return {
        status: "OK",
        message: "Thành công",
        data: user,
      };
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getUserAll() {
    try {
      console.log("phuong");
      const dataUser = await store.user().getUserAll();
      return {
        status: "OK",
        message: "Thành công",
        data: dataUser,
      };
    } catch (error) {
      console.log("Error", error);
    }
  }
}
