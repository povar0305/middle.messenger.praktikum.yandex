import renderDom from "./services/render";

import Base from "./src/layouts/base";
import User from "./src/layouts/user";
import Error from "./src/layouts/error";
import Login from "./src/layouts/login";
import Chats from "./src/layouts/chats";

import Link from "./src/components/link";
import ErrorBlock from './src/components/error'
import ArrowBack from "./src/components/arrow-back";
import Profile from "./src/components/profile";
import UpdateProfile from "./src/components/update-profile";
import Setting from "./src/components/profile-setting";
import Input from './src/components/input'
import Btn from './src/components/btn'
import Header from './src/components/header';
import UserChat from "./src/components/user-chat";

const homeLink = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Назад',
    href: '/'
  }
)

const arrowBack = new ArrowBack()

switch (window.location.pathname) {
  case '/': {
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
  }
    break;

  case '/404': {
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
  }
    break;

  case '/500': {
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
  }
    break;

  case '/profile': {
    const updateProfileLink = new Link(
      'div', {
        attrs: {
          class: 'sp-link'
        },
        text: 'Обновить  данные',
        href: '/update-profile'
      }
    )
    const updatePassLink = new Link(
      'div', {
        attrs: {
          class: 'sp-link'
        },
        text: 'Обновить пароль',
        href: '/'
      }
    )
    const exitLink = new Link(
      'div', {
        attrs: {
          class: 'sp-link-error'
        },
        text: 'Выйти',
        href: '/'
      }
    )

    const profileUser = new Profile(
      'div',
      {
        links: [updateProfileLink, updatePassLink, exitLink]
      }
    )

    const profileTpl = new User(
      'div',
      {
        arrow: arrowBack,
        profile: profileUser
      })

    renderDom('#app', profileTpl)
  }
    break;

  case '/update-profile': {
    const updateProfileUser = new UpdateProfile(
      'div',
      {
        content: [
          new Setting('div',
            {
              label: 'Почта',
              component: new Input(
                'div',
                {
                  type: 'text',
                  name: 'email',
                  placeholder: 'Почта'
                }
              )
            }),

          new Setting('div',
            {
              label: 'Логин',
              component: new Input(
                'div',
                {
                  type: 'text',
                  name: 'login',
                  placeholder: 'Логин'
                }
              )
            }),

          new Setting('div',
            {
              label: 'Имя',
              component: new Input(
                'div',
                {
                  type: 'text',
                  name: 'first_name',
                  placeholder: 'Имя'
                }
              )
            }),

          new Setting('div',
            {
              label: 'Фамилия',
              component: new Input(
                'div',
                {
                  type: 'text',
                  name: 'second_name',
                  placeholder: 'Фамилия'
                }
              )
            }),

          new Setting('div',
            {
              label: 'Никнейм',
              component: new Input(
                'div',
                {
                  type: 'text',
                  name: 'display_name',
                  placeholder: 'Никнейм'
                }
              )
            }),

        ],
        action : new Btn(
          'div',
          {
            text: 'Сохранить',
            type: 'sumbut'
          }
        )
      }
    )

    const profileTpl = new User(
      'div',
      {
        arrow: arrowBack,
        profile: updateProfileUser
      })

    renderDom('#app', profileTpl)
  }
    break;

  case '/login': {
    const loginTpl = new Login(
      'div',
      {
        header: new Header(
          'div',
          {
            text: 'Войти',
            class: 'sp-header--center'
          }
        ),
        form: [
          new Input(
            'div',
            {
              type: 'text',
              name: 'login',
              placeholder: 'Логин'
            }
          ),
          new Input(
            'div',
            {
              type: 'password',
              name: 'password',
              placeholder: 'Пароль'
            }
          )
        ],
        action: [
          new Btn(
          'div',
          {
            text: 'Войти',
            type: 'submit'
          }
          ),
          new Link(
            'div', {
              attrs: {
                class: 'sp-link'
              },
              text: 'Зарегистрироваться',
              href: '/signin'
            }
          )
        ],
      }
    )
    renderDom('#app', loginTpl)
  }
  break;

  case '/signin': {
    const loginTpl = new Login(
      'div',
      {
        header: new Header(
          'div',
          {
            text: 'Регистрация',
            class: 'sp-header--center'
          }
        ),
        form: [
          new Input(
            'div',
            {
              type: 'text',
              name: 'first_name',
              placeholder: 'Имя'
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'second_name',
              placeholder: 'Фамилия'
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'login',
              placeholder: 'Логин'
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'email',
              placeholder: 'Почта'
            }
          ),
          new Input(
            'div',
            {
              type: 'password',
              name: 'password',
              placeholder: 'Пароль'
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'phone',
              placeholder: 'Номер телефона'
            }
          )
        ],
        action: [
          new Btn(
          'div',
          {
            text: 'Зарегистрироваться',
            type: 'submit'
          }),
          new Link(
            'div', {
              attrs: {
                class: 'sp-link'
              },
              text: 'Войти',
              href: '/login'
            }
          )
        ]
      }
    )
    renderDom('#app', loginTpl)
  }
    break;

  case '/chats': {
    const chatsTpl = new Chats(
      'div',
      {
        list: [
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        }),
          new UserChat('div', {
            date: '10:20',
            message: 'wertj',
            name: 'testName'
        })
        ],
        action: [
          new Link(
            'div',{
              attrs: {
                class: 'sp-link'
              },
              text: 'Профиль',
              href: '/profile'
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'search',
              placeholder: 'Поиск'
            }
          )
        ]
      })

    renderDom('#app', chatsTpl)
  }
  break;

  default: {
    const errorTpl = new Error(
      'div',
      {
        content: new ErrorBlock(
          'div',
          {
            error: '404',
            description: 'Упс, что-то пошло не так',
            link: homeLink
          })
      }
    )

    renderDom('#app', errorTpl)
  }
    break;
}
