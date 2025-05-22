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
    });
  }
  public updatePass(data: IUserPass) {
    return this.post('/password', {
      data,
    });
  }

  public signUp(data: IAuthApiSignUp) {
    return this.post('/signup', {
      data,
    });
  }

  public checkAuth() {
    return this.get('/user', {
      withCredentials: true
    });
  }

  public signOut() {
    return this.post('/logout', {});
  }
}

export default new AuthApi();
