import { handleError } from "../../utilits/apiHandler";
import { store } from "../../store.ts";
import chats from "../api/chats";
import { TChats } from "../Store.ts";

class ChatsController {
  public getChatsUser() {
    return chats.getChats()
      .then((res:TChats) => {
        store.setState({
          chats: res || [],
        });
      })
      .catch(handleError)
  }

  public createChat(title:string) {
    return chats.createChat(title)
      .then(() => {
        this.getChatsUser().then(r => r)
      })
      .catch(handleError)
  }

  public deleteUserFromChat(userId:string) {
    return chats.deleteUserFromChat(userId)
      .catch(handleError)
  }
  public deleteChatById(chatId:string) {
    return chats.deleteChat(chatId)
      .catch(handleError)
  }

  public getUsersInSelectedChat() {
    if (!store.state.chatId) {
      return []
    }
    return chats.getUsers(store.state.chatId as string)
      .catch(handleError)
  }
  public searchUsersByLogin(login:string) {
    if (!login) {
      return []
    }
    return chats.searchUsers(login)
      .catch(handleError)
  }
  public addUserByChat(id:string) {
    return chats.addUserByChat(id)
      .catch(handleError)
  }

  public getToken() {
    return chats.getToken().then(({token})=> {
      store.setState({
        token,
      });
    })
      .catch(handleError)
  }
}

export default new ChatsController();
