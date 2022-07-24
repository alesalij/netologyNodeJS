import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  books: object[] = [];
  getBooks(): object[] {
    return this.books;
  }
  addBook(book: object) {
    this.books.push(book);
    console.log(this.books);
  }
}
