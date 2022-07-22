import { Container, decorate, injectable } from "inversify";
import { BooksService } from "./book/books.service";
import { UserService } from "./user/user.service";
export const container = new Container();

decorate(injectable(), BooksService);
container.bind("BOOKS_SERVICE").to(BooksService).inSingletonScope();

decorate(injectable(), UserService);
container.bind("USERS_SERVICE").to(UserService).inSingletonScope();
