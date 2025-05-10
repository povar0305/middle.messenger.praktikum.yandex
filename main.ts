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
import {validator} from "./services/validator";
import {descroptionErrors} from "./services/descroptionErrors";

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
        href: '/update-password'
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
        events: {
          submit: function (event) {
            event.preventDefault()
            const { elements } = event.target as HTMLFormElement;

            const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
            const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            console.log('Отправлена форма изменения данных.', formData);
          },
        },
        content: [ new Input(
          'div',
          {
            attrs: {
              class: 'sp-wrapper--input-avatar',
            },
            type: 'file',
            name: 'avatar',
            accept: 'image/*'
          }
        ),
          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input'
                  },
                  type: 'text',
                  name: 'email',
                  placeholder: 'Почта',
                  validator: 'email',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута email: ', el.target.value)

                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            }),
          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'text',
                  name: 'login',
                  placeholder: 'Логин',
                  validator: 'login',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута login: ', el.target.value)
                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            }),

          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'text',
                  name: 'first_name',
                  placeholder: 'Имя',
                  validator: 'name',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута first_name: ', el.target.value)
                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            }),

          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'text',
                  name: 'second_name',
                  placeholder: 'Фамилия',
                  validator: 'name',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута second_name: ', el.target.value)
                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            }),

          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'text',
                  name: 'display_name',
                  placeholder: 'Никнейм',
                  validator: 'message',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута search: ', el.target.value)
                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            })
        ],
        action : new Btn(
          'div',
          {
            text: 'Сохранить',
            type: 'submit'
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

  case '/update-password': {
    const updateProfileUser = new UpdateProfile(
      'div',
      {
        events: {
          submit: function (event) {
            event.preventDefault()
            const { elements } = event.target as HTMLFormElement;

            const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
            const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            console.log('Отправлена форма изменения пароля.', formData);
          },
        },
        content: [
          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'password',
                  name: 'oldPassword',
                  placeholder: 'Старый пароль',
                  validator: 'password',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута oldPassword: ', el.target.value)

                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            }),
          new Setting('div',
            {
              component: new Input(
                'div',
                {
                  attrs: {
                    class: 'sp-wrapper--input',
                  },
                  type: 'password',
                  name: 'newPassword',
                  placeholder: 'Новый пароль',
                  validator: 'password',
                  events: {
                    blur: (el) => {
                      el.preventDefault()
                      console.log('Значение инпута newPassword: ', el.target.value)

                      const typeInput = el.target.getAttribute('data-validator')
                      const isValid = validator({type: typeInput, value: el.target.value})

                      if (!isValid) {
                        el.target.classList.add('sp-input_input--error')
                        el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                      } else {
                        el.target.classList.remove('sp-input_input--error')
                        el.target.nextElementSibling.textContent = null
                      }
                    }
                  }
                }
              )
            })
        ],
        action : new Btn(
          'div',
          {
            text: 'Сохранить',
            type: 'submit'
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
        events: {
          submit: function (event) {
            event.preventDefault()
            const { elements } = event.target as HTMLFormElement;

            const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
            const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            console.log('Отправлена форма авторизации.', formData);
          },
        },
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
              placeholder: 'Логин',
              validator: 'login',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута login: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }


                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'password',
              name: 'password',
              placeholder: 'Пароль',
              validator: 'password',
              events: {
                  blur: (el) => {
                    el.preventDefault()
                    console.log('Значение инпута password: ', el.target.value)
                    const typeInput = el.target.getAttribute('data-validator')
                    const isValid = validator({type: typeInput, value: el.target.value})

                    if (!isValid) {
                      el.target.classList.add('sp-input_input--error')
                      el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                    } else {
                      el.target.classList.remove('sp-input_input--error')
                      el.target.nextElementSibling.textContent = null

                    }


                  }
              }
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
      },
    )
    renderDom('#app', loginTpl)
  }
  break;

  case '/signin': {
    const loginTpl = new Login(
      'div',
      {
        events: {
          submit: function (event) {
            event.preventDefault()
            const {elements} = event.target as HTMLFormElement;

            const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
            const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            console.log('Отправлена форма регистрации.', formData);
          },
        },
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
              placeholder: 'Имя',
              validator: 'name',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута first_name: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'second_name',
              placeholder: 'Фамилия',
              validator: 'name',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута second_name: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'login',
              placeholder: 'Логин',
              validator: 'login',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута login: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'email',
              placeholder: 'Почта',
              validator: 'email',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута email: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'password',
              name: 'password',
              placeholder: 'Пароль',
              validator: 'password',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута password: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
            }
          ),
          new Input(
            'div',
            {
              type: 'text',
              name: 'phone',
              placeholder: 'Номер телефона',
              validator: 'phone',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута phone: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
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
        events: {
          submit: function (event) {
            event.preventDefault()
            const { elements } = event.target as HTMLFormElement;

            const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
            const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            console.log('Отправлено сообщение.', formData);
          },
        },
        message: [new Input(
          'div',
          {
            type: 'text',
            name: 'message',
            placeholder: 'Поиск',
            validator: 'message',
            attrs: {
              class: 'sp-input--full'
            },
            events: {
              blur: (el) => {
                el.preventDefault()
                console.log('Значение инпута message: ', el.target.value)
                const typeInput = el.target.getAttribute('data-validator')
                const isValid = validator({type: typeInput, value: el.target.value})

                if (!isValid) {
                  el.target.classList.add('sp-input_input--error')
                  el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                } else {
                  el.target.classList.remove('sp-input_input--error')
                  el.target.nextElementSibling.textContent = null
                }
              }
            }
          }
        ),
          new Btn(
            'div',
            {
              attrs: {
                class: 'sp-wrapper--button'
              },
              text: 'Отправить',
              type: 'submit'
            }
          )],
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
              placeholder: 'Поиск',
              validator: 'message',
              events: {
                blur: (el) => {
                  el.preventDefault()
                  console.log('Значение инпута search: ', el.target.value)
                  const typeInput = el.target.getAttribute('data-validator')
                  const isValid = validator({type: typeInput, value: el.target.value})

                  if (!isValid) {
                    el.target.classList.add('sp-input_input--error')
                    el.target.nextElementSibling.textContent = descroptionErrors[typeInput]
                  } else {
                    el.target.classList.remove('sp-input_input--error')
                    el.target.nextElementSibling.textContent = null
                  }
                }
              }
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
