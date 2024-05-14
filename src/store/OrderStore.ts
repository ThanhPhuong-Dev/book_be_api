import { Collection, Db, ObjectId } from "mongodb";

export class OrderStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("order");
  }

  async buy(data: any) {
    return this.collection?.insertOne(data as Document);
  }

  async get() {
    return this.collection?.find({}).toArray();
  }

  async getUser(userId: string) {
    return this.collection?.find({ user: userId }).toArray();
  }

  async getOrderUser(userId: string) {
    return this.collection?.findOne({ "orderItems._id": userId });
  }

  async deleteOrder(userId: string) {
    return this.collection?.findOneAndDelete({ _id: new ObjectId(userId) });
  }
  async checkEmail(email: string) {
    return this.collection?.findOne({
      email: email,
    });
  }
}
