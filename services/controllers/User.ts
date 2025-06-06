import { router } from "../../router";
import { handleError } from "../../utilits/apiHandler";

import auth from "../api/auth";
import user from "../api/user";

export interface IUser {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password?: string
  [key: string]: unknown
}

export interface IUserPass {
  oldPassword: string,
  newPassword: string
}

class UserController {
  public updatePassword(userPass: IUserPass) {
    return auth.updatePass(userPass)
      .then(() => {
        auth.signOut()
        router.go('/');
      })
      .catch(handleError)
  }

  public updateAvatar(avatar: FormData) {
    return user.updateProfileAvatar(avatar)
      .then(() => {
        router.go('/profile');
      })
      .catch(handleError)
  }

  public updateInfo(userData: {[key:string]:string}) {
    return user.updateProfile(userData)
      .then(() => {
        const inputFile = document.querySelector('input[type="file"]');

        if (inputFile && inputFile instanceof HTMLInputElement && inputFile.files && inputFile.files[0]) {

          const data = new FormData()
          data.append('avatar', inputFile.files[0])

          this.updateAvatar(data).then(r => r)
        }

        router.go('/profile');
      })
      .catch(handleError)
  }
}

export default new UserController();
