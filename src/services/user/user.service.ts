import "reflect-metadata";
import { User } from "../../mongo/User";
import { IUser } from "./IUser";
//import TYPES from "./types";

class UserService {
  // books: Book[];

  public constructor() {
    console.log("makeUser");
  }
  // - создание User
  public async createUser(data: IUser) {
    const user: object[] = await User.find({ user: data.user });

    console.log("tut", user);
    if (user.length == 0) {
      const newUser = new User({
        user: data.user,
        password: data.password,
      });
      newUser.save();
    } else {
      console.log("User already registered");
    }
  }

  public getUser(username: string) {
    const user = User.findOne({ user: username });
    return user;
  }
  //* - получение книги по id

  //   public getBook(id: string) {
  //     return Book.findById(id);
  //   }
}

export { UserService, User };
