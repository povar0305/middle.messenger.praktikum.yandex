import { router } from "../../router";
import { handleError } from "../../utilits/apiHandler";
import { store } from "../../store";
import { IUser } from "./User";
import auth from "../api/auth";

export interface IAuthApiSignIn {
  login: string
  password: string
}

export interface IAuthApiSignUp {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

class AuthSingInController {
  public signIn(user: IAuthApiSignIn) {
    return auth.signIn(user)
      .then(() => {
        router.go('/messenger');
      })
      .catch(handleError)
  }

  public signUp(user: IAuthApiSignUp) {
    auth.signUp(user)
      .then(() => {
        router.go('/');
      })
      .catch(handleError)
  }

  public signOut() {
    return auth.signOut()
      .then(() => {
        localStorage.removeItem('last-select-chat-id');
        router.go('/');
      });
  }

  public checkAuth() {
    return auth.checkAuth()
        .then((user:IUser) => {
          store.setState({
            currentUser: user,
          });
        })
        .catch((error) => {
          handleError(error);
          auth.signOut()
          router.go('/');
        });
    }
}

export default new AuthSingInController();
