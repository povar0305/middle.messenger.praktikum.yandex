
import { router } from "../../router";
import { handleError } from "../../utilits/apiHandler";
import user from "../api/user";


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
    return user.updatePass(userPass)
      .then(() => {
        router.go('/');
      })
      .catch(handleError)
  }

}

export default new UserController();
