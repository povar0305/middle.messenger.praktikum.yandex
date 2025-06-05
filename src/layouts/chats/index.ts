import { store } from "../../../store.ts";
import { IUser } from "../../../services/controllers/User.ts";
import Handlebars from "handlebars";

import Block from "../../../services/Block.ts";
import tpl from './chats.ts'
import chats from "../../../services/controllers/Chats.ts";
import userChat from "../../components/user-chat/user-chat.ts";
import usersList from "../../components/usersList/users-list.ts";

const renderUsers = (users: IUser[]) => {
  const wrapperChats = document.querySelector('.sp-chats__content--select')

  if (users?.length) {
    const tpl = Handlebars.compile(usersList)({users})

    if (wrapperChats) {
      wrapperChats.innerHTML = tpl
    }
  } else {
    wrapperChats.innerHTML = `<p>
          Выберите чат чтобы отправить сообщение
        </p>`
  }
}

export default class Base extends Block {
  handleChatClick = async (event: Event) => {
    if (event.target && event.target.closest('.sp-user-chat')) {
      event.preventDefault();

      const element = event.target?.closest('.sp-user-chat')

      store.setState({
        chatId: element.getAttribute('data-id'),
      });

    } else if (event.target && event.target.closest('.sp-message--wrapper')) {
      event.preventDefault();
      const deletedIdUser = event.target.closest('.sp-message--wrapper').getAttribute('data-id')
      const usersInChat = await chats.getUsersInSelectedChat() || []

      if (usersInChat.length === 1 ) {
        await chats.deleteChatById(store.state.chatId).then(async () => {
          store.setState({
            chatId: null,
          });
          await chats.getChatsUser()
        })
      } else {
        chats.deleteUserFromChat(deletedIdUser).then(async () => {
          await chats.getChatsUser()

          const users = await chats.getUsersInSelectedChat() || []
          renderUsers(users)
        })
      }
    }
  };

  render() {
    return this.compile(tpl)
  }

  componentDidMount() {
    document.addEventListener('click', (event) => {
      this.handleChatClick(event)
    })

    chats.getChatsUser()

    store.subscribe(async (state) => {
      const tpl = Handlebars.compile(userChat)({chats: state.chats})
      if (state.chats.length) {
        const wrapperChats = document.querySelector('.sp-chats__users')
        if (wrapperChats) {
          wrapperChats.innerHTML = tpl
        }

        if (state.chatId) {
          document.querySelectorAll('.sp-user-chat').forEach((item) => {
            item.classList.remove('sp-user-chat--selected')

            if (item.getAttribute('data-id') === state.chatId) {
              item.classList.add('sp-user-chat--selected')
            }
          })
        }

        const users = await chats.getUsersInSelectedChat()
        renderUsers(users)

      }
    });
  }
}
