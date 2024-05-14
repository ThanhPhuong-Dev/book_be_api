import { Collection, Db, ObjectId } from "mongodb";
import { IUser } from "../interface/IUser";

export class UserStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("users");
  }

  async create(data: Partial<IUser>) {
    return this.collection?.insertOne(data as Document);
  }

  async checkEmail(email: string) {
    return this.collection?.findOne({
      email: email,
    });
  }

  async checkUserId(userId: string) {
    return this.collection?.findOne({
      _id: new ObjectId(userId),
    });
  }

  async getUser(userId: string) {
    return this.collection?.findOne({
      _id: new ObjectId(userId),
    });
  }
  async getUserAll() {
    return this.collection?.find({}).toArray();
  }
}
