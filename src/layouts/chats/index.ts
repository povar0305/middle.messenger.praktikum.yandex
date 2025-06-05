import { store } from "../../../store.ts";
import { IUser } from "../../../services/controllers/User.ts";
import Handlebars from "handlebars";

import Block from "../../../services/Block.ts";
import tpl from './chats.ts'
import chats from "../../../services/controllers/Chats.ts";
import userChat from "../../components/user-chat/user-chat.ts";
import usersList from "../../components/usersList/users-list.ts";

const renderUsers = (users: IUser[]) => {
  const tpl = Handlebars.compile(usersList)({users})
  if (users.length) {
    const wrapperChats = document.querySelector('.sp-chats__content--select')
    if (wrapperChats) {
      wrapperChats.innerHTML = tpl
    }
  }
}

export default class Base extends Block {
  handleChatClick = async (event: Event) => {
    if (event.target && event.target.closest('.sp-user-chat')) {
      event.preventDefault();
      const element = event.target?.closest('.sp-user-chat')
      document.querySelectorAll('.sp-user-chat').forEach((item) => item.classList.remove('sp-user-chat--selected'))
      element.classList.add('sp-user-chat--selected')

      const users = await chats.getUsersInSelectedChat(element.getAttribute('data-id'))
      renderUsers(users)
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

    store.subscribe((state) => {
      const tpl = Handlebars.compile(userChat)({chats: state.chats})
      if (state.chats.length) {
        const wrapperChats = document.querySelector('.sp-chats__users')
        if (wrapperChats) {
          wrapperChats.innerHTML = tpl
        }
      }
    });
  }
}
