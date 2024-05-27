import { store } from "../config/connectMongoDb";
import { RatingModel } from "../model/RatingModel";

export class RatingServices {
  async Evaluate(data: RatingModel) {
    try {
      const { ISBN, rating, userID } = data;
      const isBook = store.book().IsISBN(ISBN);

      if (isBook === null) {
        return {
          status: "ERR",
          message: "Đánh giá thất bại(Không có ISBN sách này)",
        };
      }

      const checkUserAndBook = await store.rating().isUserAndBook(ISBN, userID);
      let addEvaluate;
      if (checkUserAndBook !== null) {
        addEvaluate = await store.rating().update(ISBN, userID, rating);
      } else {
        addEvaluate = await store.rating().evaluate({
          "User-ID": Number(userID),
          ISBN,
          "Book-Rating": rating,
        });
      }

      return {
        status: "OK",
        data: addEvaluate,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
