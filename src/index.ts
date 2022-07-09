interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

class Book implements IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  constructor(
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

class BookRepository {
  books: Book[];

  constructor() {
    this.books = [];
  }
  // - создание книги
  createBook(book: Book) {
    this.books.push(book);
  }

  // - получение книги по id
  getBook(id: string) {
    return this.books.find((book) => book.id === id);
  }

  // - получение всех книг
  getBooks() {
    return this.books;
  }

  // - обновление книги
  updateBook(id: string, book: Book) {
    const index: number = this.books.findIndex((book) => book.id === id);
    this.books[index] = book;
  }

  // - удаление книги
  deleteBook(id: string) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
