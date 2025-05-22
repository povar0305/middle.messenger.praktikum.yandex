
import { router } from "../../router";
import { handleError } from "../../utilits/apiHandler";
import auth from "../api/auth";


export interface IUser {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}
export interface IUserPass {
  oldPassword: string,
  newPassword: string
}

class UserController {
  public updatePassword(userPass: IUserPass) {
    return auth.updatePass(userPass)
      .then(() => {
        router.go('/');
      })
      .catch(handleError)
  }
}

export default new UserController();
