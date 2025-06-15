import Base from "./base";

class UserApi extends Base {
  constructor() {
    super({ path: '/user' });
  }

  public updateProfile(data: { [key:string]:string} ) {
    return this.put('/profile', {
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public updateProfileAvatar(data: FormData ) {
    return this.put('/profile/avatar', {
      data
    });
  }
}

export default new UserApi();
