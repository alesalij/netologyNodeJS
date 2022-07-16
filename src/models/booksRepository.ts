import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Book } from "./Book.js";
//import TYPES from "./types";

// class Book {
//   id: string;
//   title: string;
//   description: string;
//   authors: string;
//   favorite: string;
//   fileCover: string;
//   fileName: string;
//   constructor(
//     id: string,
//     title: string,
//     description: string,
//     authors: string,
//     favorite: string,
//     fileCover: string,
//     fileName: string
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.authors = authors;
//     this.favorite = favorite;
//     this.fileCover = fileCover;
//     this.fileName = fileName;
//   }
// }

class BooksRepository {
  // books: Book[];

  public constructor() {}
  // - создание книги
  public createBook(book: Book) {
    return book.save();
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

export { BooksRepository, Book };
