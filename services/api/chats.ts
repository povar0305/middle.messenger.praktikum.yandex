import Base from "./base";
// import { IAuthApiSignIn, IAuthApiSignUp } from "../controllers/Auth";
// import { IUserPass } from "../controllers/User";

class ChatsApi extends Base {
  constructor() {
    super({ path: '' });
  }

  public getChats() {
    return this.get('/chats', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }

  public searchUsers(query:string) {
    return this.post('/user/search', {
      data: {
        login: query
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public createChat(title:string) {
    return this.post('/chats', {
      data: {
        title
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public searchChats(title:string) {
    return this.post('/chats', {
      data: {
        title
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public getUsers(id:string|number) {
    return this.get(`/chats/${id}/users`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
}

export default new ChatsApi();
