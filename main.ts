import renderDom from "./services/render";
import Link from "./src/components/link";
import Base from "./src/layouts/base";

import Error from "./src/layouts/error";
import ErrorBlock from './src/components/error'

console.log(window.location.pathname)
const homeLink = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Назад',
    href: '/'
  }
)

switch (window.location.pathname) {
  case '/':
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

    renderDom('#app', baseTpl)
    break;

  case '/404':
    const contentError404 = new ErrorBlock(
      'div',
      {
        error: '404',
        description: 'Упс, что-то пошло не так',
        link: homeLink
      }
    )

    const errorTpl404 = new Error(
      'div',
      {
        content: contentError404
      }
    )

    renderDom('#app', errorTpl404)
    break;

  case '/500':
    const contentError500 = new ErrorBlock(
      'div',
      {
        error: '500',
        description: 'Что-то на сервере',
        link: homeLink
      }
    )

    const errorTpl500 = new Error(
      'div',
      {
        content: contentError500
      }
    )

    renderDom('#app', errorTpl500)
    break;

  default:
    const contentError = new ErrorBlock(
      'div',
      {
        error: '404',
        description: 'Упс, что-то пошло не так',
        link: homeLink
      }
    )

    const errorTpl = new Error(
      'div',
      {
        content: contentError
      }
    )

    renderDom('#app', errorTpl)
    break;
}
