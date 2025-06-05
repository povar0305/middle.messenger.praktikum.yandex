import Base from "./base";
import {store} from "../../store.ts";

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

  public deleteUserFromChat(id:string|number) {
    return this.delete(`/chats/users`, {
      data: {
        users: [id],
        chatId: store.state.chatId
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public deleteChat(id:string|number) {
    return this.delete(`/chats`, {
      data: {
        chatId: id
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }

  public addUserByChat(id:string|number) {
    return this.put(`/chats/users`, {
      data: {
        users: [id],
        chatId: store.state.chatId
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
  public getToken() {
    return this.post(`/chats/token/${store.state.chatId}`, {
      data: {
        id: store.state.chatId
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
}

export default new ChatsApi();
