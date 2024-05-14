import { Request, Response } from "express";
import { BookServices } from "../services/BookServices";
import { ObjectId } from "mongodb";
import { BookModel } from "../model/BookModel";

const bookServices = new BookServices();

class BookControllers {
  async getAllBook(req: Request, res: Response) {
    try {
      const { limit, page } = req.query;
      if (Number(page) < 1) {
        return res.status(400).json({
          status: "ERR",
          message: "Page nhỏ hơn 0",
        });
      }
      const resv = await bookServices.getAllBook(
        Number(limit) || 10,
        Number(page) || 1
      );

      return res.status(200).json(resv);
    } catch (error) {
      console.log("ERROR", error);
    }
  }
  async itemBased(req: Request, res: Response) {
    try {
      const { limit, page } = req.query;
      const { data } = req.body;

      if (Number(page) < 1) {
        return res.status(400).json({
          status: "ERR",
          message: "Page nhỏ hơn 0",
        });
      }
      const resv = await bookServices.itemBased(
        Number(limit) || 10,
        Number(page) || 1,
        data
      );

      return res.status(200).json(resv);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getRecommend(req: Request, res: Response) {
    try {
      const { data } = req.body;

      const { limit, page } = req.query;

      if (!data) {
        return res.status(400).json({
          status: "ERR",
          message: "Recommend thất bại",
        });
      }

      if (!Array.isArray(data)) {
        return res.status(400).json({
          status: "ERR",
          message: "data không phải array",
        });
      }

      const resv = await bookServices.getCommend(
        Number(limit) || 10,
        Number(page) || 0,
        data
      );
      return res.status(200).json(resv);
    } catch (error) {
      console.log("ERR", error);
    }
  }

  async getDetais(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      if (!bookId) {
        return res.status(400).json({
          status: "ERR",
          message: "Id required",
        });
      }

      if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({
          status: "ERR",
          message: "Id Not ObjectId",
        });
      }
      const resv = await bookServices.getDetail(bookId);
      return res.status(200).json(resv);
    } catch (error) {
      throw error;
    }
  }

  async publication(req: Request, res: Response) {
    try {
      const resv = await bookServices.publication();
      return res.status(200).json(resv);
    } catch (error) {
      throw error;
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const { ISBN, bookTitle, bookAuthor, yearPublication, Publisher, image } =
        req.body;
      if (
        !ISBN ||
        !bookTitle ||
        !bookAuthor ||
        !yearPublication ||
        !Publisher ||
        !image
      ) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }

      const bookMd = new BookModel({
        ISBN,
        bookTitle,
        bookAuthor,
        yearPublication,
        Publisher,
        image,
      });
      const resv = await bookServices.createBook(bookMd);
      return res.status(200).json(resv);
    } catch (error) {
      throw error;
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      const { ISBN, bookTitle, bookAuthor, yearPublication, Publisher, image } =
        req.body;
      if (
        !ISBN ||
        !bookTitle ||
        !bookAuthor ||
        !yearPublication ||
        !Publisher ||
        !image
      ) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }

      const bookMd = new BookModel({
        ISBN,
        bookTitle,
        bookAuthor,
        yearPublication,
        Publisher,
        image,
      });
      const resv = await bookServices.updateBook(bookId as string, bookMd);
      return res.status(200).json(resv);
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;

      if (!bookId) {
        return res.status(400).json({
          status: "ERR",
          message: "Input required",
        });
      }

      if (!ObjectId.isValid(bookId as string)) {
        return res.status(400).json({
          status: "ERR",
          message: "Not Object not book",
        });
      }

      const resv = await bookServices.deleteBook(bookId as string);
      return res.status(200).json(resv);
    } catch (error) {
      throw error;
    }
  }
}

const bookControllers = new BookControllers();
export default bookControllers;
