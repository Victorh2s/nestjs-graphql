import { User } from "../../user/user.entity";

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();

    user.id = "1";
    user.email = "user@email.com";
    user.name = "Jhon doe";
    user.password = "Senha@123";
    return user;
  }
}
