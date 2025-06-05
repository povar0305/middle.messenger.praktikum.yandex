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
  public getUsersInSelectedChat(selectedChatId: string|number) {
    return chats.getUsers(selectedChatId)
      .then((resp) => {
        return resp
      })
      .catch(handleError)
  }
}

export default new ChatsController();
