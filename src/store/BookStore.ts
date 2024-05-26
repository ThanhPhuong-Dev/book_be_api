import { Collection, Db, ObjectId } from "mongodb";
import { BookModel } from "../model/BookModel";

export class BookStore {
  private collection?: Collection<Document>;

  constructor(db: Db) {
    this.collection = db.collection("book");
  }

  async get(limit: number, page: number) {
    return this.collection
      ?.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .toArray();
  }

  async search(data: string) {
    return this.collection
      ?.find({
        "Book-Title": { $regex: data },
      })
      .toArray();
  }
  async totalCount() {
    return this.collection?.countDocuments();
  }

  async totalCountRcm(dataId: string[]) {
    return this.collection?.countDocuments({
      ISBN: {
        $in: dataId,
      },
    });
  }

  async getRecomment(limit: number, page: number, dataId: string[]) {
    return this.collection
      ?.find({
        ISBN: {
          $in: dataId,
        },
      })
      .limit(limit)
      .skip(page * limit)
      .toArray();
  }

  async itemBased(limit: number, page: number, dataId: string[]) {
    return this.collection
      ?.find({
        ISBN: {
          $in: dataId,
        },
      })
      .limit(limit)
      .skip(page * limit)
      .toArray();
  }
  async getDetail(bookId: string) {
    return await this.collection?.findOne({
      _id: new ObjectId(bookId),
    });
  }

  async publication() {
    return await this.collection?.distinct("Year-Of-Publication");
  }

  async IsISBN(isbn: string) {
    return await this.collection?.findOne({
      ISBN: isbn,
    });
  }

  async IsBook(bookId: string) {
    return await this.collection?.findOne({
      _id: new ObjectId(bookId),
    });
  }

  async create(data: any) {
    return await this.collection?.insertOne(data as any);
  }

  async update(bookId: string, data: any) {
    return await this.collection?.updateOne(
      {
        _id: new ObjectId(bookId),
      },
      {
        $set: data,
      }
    );
  }

  async delete(bookId: string) {
    return await this.collection?.deleteOne({ _id: new ObjectId(bookId) });
  }
}
