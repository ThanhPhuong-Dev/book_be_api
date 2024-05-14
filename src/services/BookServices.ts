import { Request, Response } from "express";
import { store } from "../config/connectMongoDb";
import { BookModel } from "../model/BookModel";

export class BookServices {
  async getAllBook(limit: number, page: number) {
    try {
      const text = await store.book().get(limit, page);
      const totalBook = await store.book().totalCount();
      return {
        status: "OK",
        data: text,
        totalBook: totalBook,
        pageCurrent: Number(page),
        totalPage: Math.ceil(Number(totalBook) / Number(limit)),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(filter: string) {
    try {
      const text = await store.book().search(filter);

      return {
        status: "OK",
        data: text,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async itemBased(limit: number, page: number, data: string[]) {
    try {
      const text = await store.book().itemBased(limit, page, data);
      const totalBook = await store.book().totalCount();
      return {
        status: "OK",
        data: text,
        totalBook: totalBook,
        pageCurrent: Number(page),
        totalPage: Math.ceil(Number(totalBook) / Number(limit)),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getCommend(limit: number, page: number, dataId: string[]) {
    try {
      const totalBook = await store.book().totalCountRcm(dataId);
      const dataBook = await store.book().getRecomment(limit, page, dataId);
      return {
        status: "OK",
        message: "Recommend Thành công",
        data: dataBook,
        totalBook: totalBook,
        pageCurrent: Number(page),
        totalPage: Math.ceil(Number(totalBook) / Number(limit)),
      };
    } catch (error) {
      console.log("ERR", error);
    }
  }

  async createBook(data: BookModel) {
    const { ISBN, Publisher, bookAuthor, bookTitle, image, yearPublication } =
      data;

    const isISBN = await store.book().IsISBN(ISBN);
    if (isISBN !== null) {
      return {
        status: "ERR",
        message: "Đã có sách có mã ISBN này",
      };
    }

    const newBook = await store.book().create({
      ISBN,
      "Book-Title": bookTitle,
      "Book-Author": bookAuthor,
      "Year-Of-Publication": yearPublication,
      Publisher,
      "Image-URL-L": image,
    });
    return {
      status: "OK",
      message: "Thành công",
      data: newBook,
    };
  }

  async getDetail(bookId: string) {
    try {
      const infoBook = await store.book().getDetail(bookId);
      if (infoBook === null) {
        return {
          status: "ERR",
          message: "Sách này không tồn tại",
        };
      }
      return {
        status: "OK",
        message: "Thành công",
        data: infoBook,
      };
    } catch (error) {
      throw error;
    }
  }

  async publication() {
    try {
      const typeDistinct = await store.book().publication();
      return {
        status: "OK",
        message: "Thành công",
        data: typeDistinct,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateBook(bookId: string, data: BookModel) {
    try {
      const { ISBN, Publisher, bookAuthor, bookTitle, image, yearPublication } =
        data;
      const isBook = await store.book().IsBook(bookId);
      if (isBook === null) {
        return {
          status: "ERR",
          message: "Sách này không có",
        };
      }

      const newBook = await store.book().update(bookId, {
        ISBN,
        "Book-Title": bookTitle,
        "Book-Author": bookAuthor,
        "Year-Of-Publication": yearPublication,
        Publisher,
        "Image-URL-L": image,
      });
      return {
        status: "OK",
        message: "Cập nhật thành công",
        data: newBook,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(bookId: string) {
    try {
      const isBook = await store.book().IsBook(bookId);
      if (isBook === null) {
        return {
          status: "ERR",
          message: "Sách này không có",
        };
      }
      const bookRmv = await store.book().delete(bookId);
      return {
        status: "OK",
        message: "Xóa Thành công",
        data: bookRmv,
      };
    } catch (error) {
      throw error;
    }
  }
}
