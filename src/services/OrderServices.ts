import { store } from "../config/connectMongoDb";
import { sendEmailCreateOrder } from "../utils/EmailService";

export class OrderServices {
  async buyBook(data: any) {
    try {
      const { email, orderItems } = data;
      const text = await store.order().buy(data);
      if (text) {
        await sendEmailCreateOrder(email, orderItems);
        return {
          status: "OK",
          data: text,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrderAll() {
    try {
      const text = await store.order().get();

      return {
        status: "OK",
        data: text,
        total: Number(text?.length),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrderUser(id: string) {
    try {
      const getAllUserId = await store.order().getUser(id);
      if (getAllUserId) {
        const orderUser = getAllUserId.map((order: any) => {
          return order?.orderItems;
        });
        const orderUserArr = [].concat(...orderUser);
        return {
          status: "OK",
          data: getAllUserId,
          totalOrderUser: orderUserArr,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  //   async orderCancel(userId: string) {
  //     try {
  //       const userOrder = await store.order().getOrderUser(userId);

  //       if (!userOrder) {
  //         return {
  //           status: "errr",
  //           message: "khong cos",
  //         };
  //       }

  //       const { orderItems, ...newUserOrder } = userOrder;
  //       const userCancel = orderItems?.filter((item: any) => item._id != userId);

  //       if (userCancel.length === 0) {
  //         // Nếu mảng orderItems trở thành rỗng, xóa đối tượng Order
  //         const deletedOrder = await store.order().getOrderUser(userOrder?._id);
  //         return {
  //           status: "OK",
  //           message: "Order deleted",
  //           data: deletedOrder,
  //         };
  //       }

  //       const updatedOrder = await Order.findOneAndUpdate(
  //         { "orderItems._id": userId },
  //         { newUserOrder, orderItems: userCancel },
  //         { new: true }
  //       );

  //       resolve({ status: "OK", message: "Remove Success", data: updatedOrder });
  //     } catch (e) {
  //       reject(e);
  //     }
  //   }
}
