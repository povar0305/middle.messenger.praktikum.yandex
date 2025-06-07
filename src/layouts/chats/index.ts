import { store } from "../../../store.ts";
import { message } from "../../../message.ts";
import { IUser } from "../../../services/controllers/User.ts";
import Handlebars from "handlebars";

import Block from "../../../services/Block.ts";
import tpl from './chats.ts'
import chats from "../../../services/controllers/Chats.ts";
import userChat from "../../components/user-chat/user-chat.ts";
import usersList from "../../components/usersList/users-list.ts";
import messages from "../../components/messages/messages.ts"


const renderUsers = (users: IUser[] = [], searchUser: IUser[] = []) => {
  const wrapperChats = document.querySelector('.sp-chats__content--select p')

  const tpl = Handlebars.compile(usersList)({users, search: searchUser})

  if (wrapperChats) {
    wrapperChats.innerHTML = users?.length ? tpl : `Выберите чат чтобы отправить сообщение`
  }
}

export default class Base extends Block {
  handleInput = async (event: Event) => {
    const target = event.target as Element

    if (target.closest('.sp-chats__content--select')) {
      const inputNewUser = document.querySelector('input[name="new-user"]') as HTMLInputElement
      const searchResult = await chats.searchUsersByLogin(inputNewUser.value) || []

      const users = await chats.getUsersInSelectedChat() || []
      renderUsers(users, searchResult)

      const newUserInput = document.querySelector('input[name="new-user"]') as HTMLInputElement
      newUserInput.value = inputNewUser.value || ''
      newUserInput.focus()
    }
  }

  handleChatClick = async (event: Event) => {
    const target = event.target as Element

    if (target) {
      if (target?.closest('.sp-user-chat')) {
        event.preventDefault();

        const element = target?.closest('.sp-user-chat') as Element

        if (target instanceof SVGElement) {
          const selectedId = element.getAttribute('data-id') as string
          await chats.deleteChatById(selectedId).then(async () => {
            store.setState({
              chatId: null,
            });
            store.setState({
              messages: []
            });

            await chats.getChatsUser()
          })
        } else {
          store.setState({
            chatId: element.getAttribute('data-id'),
          });

          store.setState({
            messages: []
          });

          await chats.getToken().then(async () => {
            await message.connect({
              userId: store.state.currentUser.id,
              chatId: element.getAttribute('data-id'),
              token: store.state.token,
            })
          })
        }

        return
      }

      if (target.closest('.sp-message--wrapper')) {
        event.preventDefault();

        const isWeNeedAddUser = target?.closest('.sp-message--users--searching')
        const idUser = target.closest('.sp-message--wrapper').getAttribute('data-id')
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
      this.handleInput(event as Event)
    })

    chats.getChatsUser()

    store.subscribe(async (state:{[key:string]:unknown}) => {
      const chatsList = state.chats.map((item) => {
        item.isCanDelete = item.created_by === state?.currentUser.id
        return item
      })

      const tpl = Handlebars.compile(userChat)({chats: chatsList})
      if (chatsList.length) {
        const wrapperChats = document.querySelector('.sp-chats__users')
        if (wrapperChats) {
          wrapperChats.innerHTML = tpl
        }

        if (state.chatId) {
          const wrapperChats = document.querySelector('.sp-chats__content--message')

          if (wrapperChats) {
            wrapperChats.classList.add('show')
          }

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
        const wrapperUsers = document.querySelector('.sp-chats__users')
        if (wrapperUsers) {
          wrapperUsers.textContent = 'Ни одного чата не найдено'
        }
      }

      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth() + 1; // Месяцы с 0 по 11, поэтому добавляем 1
      const todayDate = today.getDate();

      const messagesData = state.messages.map((item) => {
        const msgDate = new Date(item.time);
        const hours = msgDate.getHours();
        const minutes = msgDate.getMinutes();

        const day = msgDate.getDate();
        const month = msgDate.getMonth() + 1; // Месяцы с 0 по 11, поэтому добавляем 1
        const year = msgDate.getFullYear();

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        item.isMyMessage = (item.user_id == state?.currentUser.id) || false
        item.isShowDate = !(year === todayYear && month === todayMonth && day === todayDate);
        item.formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        item.formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

        return item
      }).sort((a:{time:string}, b:{time:string}) => new Date(a.time).getTime() - new Date(b.time).getTime());

      const tplMessages = Handlebars.compile(messages)({messages: messagesData})
      const wrapperChats = document.querySelector('.sp-chats__content--messages')
      if (wrapperChats) {
        wrapperChats.innerHTML = tplMessages
      }
    });
  }
}
