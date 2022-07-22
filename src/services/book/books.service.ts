//import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Book } from "../../mongo/Book";
import { IBook } from "./IBook";
//import TYPES from "./types";

class BooksService {
  // books: Book[];

  public constructor() {
    console.log("makeBook");
  }
  // - создание книги
  public createBook(data: IBook) {
    const book = new Book(data);
    book.save();
    return book;
  }

  //* - получение книги по id
  public getBook(id: string) {
    return Book.findById(id);
  }

  //* - получение всех книг
  public getBooks() {
    return Book.find();
  }

  // - обновление книги
  public updateBook(id: string, book: object) {
    return Book.findByIdAndUpdate(id, book);
  }

  // - удаление книги
  public deleteBook(id: string) {
    return Book.findByIdAndDelete(id);
  }
}

export { BooksService, Book };
