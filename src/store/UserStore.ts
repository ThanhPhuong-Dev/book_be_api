import { Collection, Db, ObjectId } from "mongodb";
import { IUser } from "../interface/IUser";
import { UserModel } from "../model/UserModel";

export class UserStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("users");
  }

  async create(data: Partial<UserModel>) {
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

  async update(userId: string, data: any) {
    return this.collection?.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: data,
      }
    );
  }

  async delete(userId: string) {
    return this.collection?.findOneAndDelete({ _id: new ObjectId(userId) });
  }
}
