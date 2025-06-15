import Base from "./base";
import { IAuthApiSignIn, IAuthApiSignUp } from "../controllers/Auth";
import { IUserPass } from "../controllers/User";

class AuthApi extends Base {
  constructor() {
    super({ path: '/auth' });
  }

  public signIn(data: IAuthApiSignIn) {
    return this.post('/signin', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public updatePass(data: IUserPass) {
    return this.post('/password', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }

  public signUp(data: IAuthApiSignUp) {
    return this.post('/signup', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }

  public checkAuth() {
    return this.get('/user', {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }

  public signOut() {
    return this.post('/logout', {
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
}

export default new AuthApi();
