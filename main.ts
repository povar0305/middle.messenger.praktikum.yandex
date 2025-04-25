import renderDom from "./services/render";
import Link from "./src/components/link";
import Base from "./src/layouts/base";
// index: 'index.html',
//   login: 'login.html',
//   signin: 'signin.html',
//   404: '404.html',
//   500: '500.html',
//   profile: 'profile.html',
//   'update-profile': 'update-profile.html',
//   chats: 'chats.html',


const linkLogin = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Авторизация',
    href: 'login'
  }
)

const linkSignin = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Регистрация',
    href: 'signin'
  }
)

const link404 = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: '404',
    href: '404'
  }
)

const link500 = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: '500',
    href: '500'
  }
)

const linkProfile = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Профиль',
    href: 'profile'
  }
)

const linkUpdateProfile = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Изменение профиля',
    href: 'update-profile'
  }
)

const linkChats = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Чаты',
    href: 'chats'
  }
)

const baseTpl = new Base(
  'div',
  {
    attrs: {
      class: 'sp-link'
    },
    inner: [linkLogin, linkSignin, link404, link500, linkProfile, linkUpdateProfile, linkChats]
  }
)
// console.log('baseTpl',baseTpl)

renderDom('#app', baseTpl)
