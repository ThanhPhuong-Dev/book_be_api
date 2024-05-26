import { Collection, Db, ObjectId } from "mongodb";
import { RatingModel } from "../model/RatingModel";
import { UserDataModel } from "../model/UserDataModel";

export class UserDataStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("userData");
  }

  async max() {
    const result = this.collection?.findOne({}, { sort: { "User-ID": -1 } });
    return result;
  }

  async add(data: UserDataModel) {
    return this.collection?.insertOne(data as any);
  }
}
