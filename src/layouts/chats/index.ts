import { store } from "../../../store.ts";
import { message } from "../../../message.ts";
import { IUser } from "../../../services/controllers/User.ts";
import Handlebars from "handlebars";

import Block from "../../../services/Block.ts";
import tpl from './chats.ts'
import chats from "../../../services/controllers/Chats.ts";
import userChat from "../../components/user-chat/user-chat.ts";
import usersList from "../../components/usersList/users-list.ts";


const renderUsers = (users: IUser[] = [], searchUser: IUser[] = []) => {
  const wrapperChats = document.querySelector('.sp-chats__content--select')

  const tpl = Handlebars.compile(usersList)({users, search: searchUser})

  if (wrapperChats) {
    wrapperChats.innerHTML = users?.length ? tpl : `<p>Выберите чат чтобы отправить сообщение</p>`
  }
}

export default class Base extends Block {
  handleInput = async (event: InputEvent) => {
    if (event.target?.closest('.sp-chats__content--select')) {
      const inputNewUser = document.querySelector('input[name="new-user"]')
      const searchResult = await chats.searchUsersByLogin(inputNewUser.value) || []

      const users = await chats.getUsersInSelectedChat() || []
      renderUsers(users, searchResult)

      document.querySelector('input[name="new-user"]').value = inputNewUser.value || ''
      document.querySelector('input[name="new-user"]').focus()
    }
  }

  handleChatClick = async (event: Event) => {
    if (event.target) {
      if (event.target?.closest('.sp-user-chat')) {
        event.preventDefault();

        const element = event.target?.closest('.sp-user-chat')

        if (event.target instanceof SVGElement) {
          await chats.deleteChatById(element.getAttribute('data-id')).then(async () => {
            store.setState({
              chatId: null,
            });
            await chats.getChatsUser()
          })
        } else {
          store.setState({
            chatId: element.getAttribute('data-id'),
          });

          await chats.getToken()

          await message.connect({
            userId: store.state.currentUser.id,
            chatId: element.getAttribute('data-id'),
            token: store.state.token,
          })
        }

        return
      }

      if (event.target.closest('.sp-message--wrapper')) {
        event.preventDefault();

        const isWeNeedAddUser = event.target?.closest('.sp-message--users--searching')
        const idUser = event.target.closest('.sp-message--wrapper').getAttribute('data-id')
        const usersInChat = await chats.getUsersInSelectedChat() || []

        if (idUser) {
          if (isWeNeedAddUser) {
            await chats.addUserByChat(idUser)

            const users = await chats.getUsersInSelectedChat() || []
            renderUsers(users)
          } else {
            if (usersInChat.length === 1 ) {
              await chats.deleteChatById(store.state.chatId).then(async () => {
                store.setState({
                  chatId: null,
                });
              })
            } else {
              chats.deleteUserFromChat(idUser).then(async () => {
                await chats.getChatsUser()

                const users = await chats.getUsersInSelectedChat() || []
                renderUsers(users)
              })
            }
          }



          return
        }
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

    document.addEventListener('input', (event) => {
      this.handleInput(event)
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
          document.querySelector('.sp-chats__content--message').classList.add('show')

          document.querySelectorAll('.sp-user-chat').forEach((item) => {
            item.classList.remove('sp-user-chat--selected')

            if (item.getAttribute('data-id') === state.chatId) {
              item.classList.add('sp-user-chat--selected')
            }
          })
        }
        const users = await chats.getUsersInSelectedChat()
        renderUsers(users)
      } else {
        if (document.querySelector('.sp-chats__users')) {
          document.querySelector('.sp-chats__users').textContent = 'Ни одного чата не найдено'
        }
      }

      if (state.messages.length) {
        console.log(state.messages)
      }
    });
  }
}
