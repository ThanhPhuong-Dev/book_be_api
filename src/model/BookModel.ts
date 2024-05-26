export class BookModel {
  ISBN: string;
  bookTitle: string;
  bookAuthor: string;
  yearPublication: number;
  Publisher: string;
  image: string;
  constructor(db: BookModel) {
    this.ISBN = db.ISBN;
    this.bookTitle = db.bookTitle;
    this.bookAuthor = db.bookAuthor;
    this.yearPublication = db.yearPublication;
    this.Publisher = db.Publisher;
    this.image = db.image;
  }
}
