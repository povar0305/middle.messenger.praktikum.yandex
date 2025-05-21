import Base from "./base";
import { IUserPass } from "../controllers/User";

class UserApi extends Base {
  constructor() {
    super({ path: '/user' });
  }

  public updatePass(data: IUserPass) {
    return this.put('/password ', {
      withCredentials: true,
      data,
    });
  }

}

export default new UserApi();
