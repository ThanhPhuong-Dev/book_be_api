import { Collection, Db, ObjectId } from "mongodb";
import { RatingModel } from "../model/RatingModel";

export class RatingStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("rating_vaild");
  }

  async evaluate(data: any) {
    return this.collection?.insertOne(data as any);
  }

  async checkISBN(ISBN: string) {
    return this.collection?.findOne({
      ISBN: ISBN,
    });
  }

  async update(ISBN: string, data: any) {
    return this.collection?.updateOne(
      {
        ISBN: ISBN,
      },
      {
        $set: data,
      }
    );
  }
}
