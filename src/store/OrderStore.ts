import { Collection, Db, ObjectId } from "mongodb";

export class OrderStore {
  public collection?: Collection<Document>;
  constructor(db: Db) {
    this.collection = db.collection("order");
  }

  async buy(data: any) {
    const now = new Date();
    const test = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    };

    const formatter = new Intl.DateTimeFormat("vi-VN", test as any);
    const formattedDate = formatter.format(now);

    data.createdAt = formattedDate;
    data.updatedAt = formattedDate;
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
