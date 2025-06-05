import { handleError } from "../../utilits/apiHandler";
import { store } from "../../store.ts";
import chats from "../api/chats";

class ChatsController {
  public getChatsUser() {
    return chats.getChats()
      .then((res) => {
        store.setState({
          chats: res,
        });
      })
      .catch(handleError)
  }

  public searchChats (query:string) {
    return chats.searchChats(query)
      .then((res) => {
        store.setState({
          chats: res,
        });
      })
      .catch(handleError)
  }

  public createChat(title:string) {
    return chats.createChat(title)
      .then(() => {
        this.getChatsUser()
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
    return chats.getUsers(store.state.chatId)
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
}

export default new ChatsController();
