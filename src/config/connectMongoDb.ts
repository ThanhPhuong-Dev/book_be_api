import { Db, MongoClient } from "mongodb";
import { EnvConfig } from "./envConfig";
import { UserStore } from "../store/UserStore";
import { BookStore } from "../store/BookStore";

interface Store {
  user: UserStore;
  book: BookStore;
}

class MongoConnection {
  private static instance: MongoConnection;
  private client?: MongoClient;
  private db?: Db;
  private store?: Store;

  constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect() {
    if (!this.client) {
      this.client = new MongoClient(EnvConfig.mongoSettings.mongoUrl);

      try {
        await this.client.connect();
        console.log("Kết nối thành công");
        this.db = this.client.db(EnvConfig.mongoSettings.mongoDatabase);
        this.store = {
          user: new UserStore(this.db),
          book: new BookStore(this.db),
        };
      } catch (error) {
        console.log("Lỗi Kết Nối", error);
      }
    }
  }

  user() {
    if (!this.store?.user) {
      throw Error("User store not defind");
    }
    return this.store?.user;
  }

  book() {
    if (!this.store?.book) {
      throw Error("Book store not defind");
    }
    return this.store?.book;
  }
}

export const store = MongoConnection.getInstance();