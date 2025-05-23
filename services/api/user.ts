import Base from "./base";

class UserApi extends Base {
  constructor() {
    super({ path: '/user' });
  }

  public updareProfile(data: { [key:string]:string} ) {
    return this.put('/profile', {
      data,
    });
  }
  public updareProfileAvatar(data: FormData ) {
    return this.put('/profile/avatar', {
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default new UserApi();
