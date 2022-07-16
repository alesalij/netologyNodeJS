const { Container, decorate, injectable } = require("inversify");
const { BooksRepository } = require("./models/booksRepository");
const container = new Container();

decorate(injectable(), BooksRepository);
container.bind("BOOKS_REPOSITORY").to(BooksRepository).inSingletonScope();

module.exports = { container };
