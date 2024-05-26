import { store } from "../config/connectMongoDb";
import { RatingModel } from "../model/RatingModel";

export class RatingServices {
  async Evaluate(data: RatingModel) {
    return new Promise(async (resolve, reject) => {
      try {
        const { ISBN, rating, userID } = data;
        const isBook = store.book().IsISBN(ISBN);

        if (isBook === null) {
          resolve({
            status: "ERR",
            message: "Đánh giá thất bại(Không có ISBN sách này)",
          });
        }

        const addEvaluate = await store.rating().evaluate({
          "User-ID": Number(userID),
          ISBN,
          "Book-Rating": rating,
        });

        resolve({
          status: "OK",
          data: addEvaluate,
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
