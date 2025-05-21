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

import { validator } from "./utilits/validator";
import { descroptionErrors } from "./utilits/descroptionErrors";
import { router } from './router';

import auth from "./services/controllers/Auth";
import user from "./services/controllers/User";

//404
const errorTpl404 = new Error(
  'div',
  {
    content: new ErrorBlock(
      'div',
      {
        error: '404',
        description: 'Упс, что-то пошло не так',
        link: new Link(
          'div', {
            attrs: {
              class: 'sp-link'
            },
            text: 'Назад',
            href: '/',
            events: {
              click: function(event) {
                event.preventDefault()
                router.back()
              }
            }
          }
        )
      }
    )
  }
)

//500
const errorTpl500 = new Error(
  'div',
  {
    content: new ErrorBlock(
      'div',
      {
        error: '500',
        description: 'Что-то на сервере',
        link: new Link(
          'div', {
            attrs: {
              class: 'sp-link'
            },
            text: 'Назад',
            href: '/',
            events: {
              click: function(event) {
                event.preventDefault()
                router.back()
              }
            }
          }
        )
      }
    )
  }
)

// Профиль пользователя
const updateProfileLink = new Link(
  'div', {
    attrs: {
      class: 'sp-link'
    },
    text: 'Обновить  данные',
    href: '/setting'
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
const profileTpl = new User(
  'div',
  {
    arrow:  new ArrowBack(
      'div',
      {
        events: {
          click: function() {
            router.back()
          }
        }
      }),
    profile: new Profile(
      'div',
      {
        links: [updateProfileLink, updatePassLink, exitLink]
      }
    )
  })

// Обновление данных пользователя
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
})
const updateProfileTpl = new User(
'div',
{
  arrow:  new ArrowBack(
    'div',
    {
      events: {
        click: function() {
          router.back()
        }
      }
    }),
  profile: updateProfileUser
})



//Обновление пароля
const updatePasswordContent = new UpdateProfile(
  'div',
  {
    events: {
      submit: async function (event) {
        event.preventDefault()
        const { elements } = event.target as HTMLFormElement;

        const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
        const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
          acc[field.name] = field.value;
          return acc;
        }, {});

        await user.updatePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        });
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
const updatePasswordTpl = new User(
  'div',
  {
    arrow:  new ArrowBack(
      'div',
      {
        events: {
          click: function() {
            router.back()
          }
        }
      }),
    profile: updatePasswordContent
  })

//Авторизация
const loginTpl = new Login(
  'div',
  {
    events: {
      submit: async function (event) {
        event.preventDefault()
        const { elements } = event.target as HTMLFormElement;

        const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
        const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
          acc[field.name] = field.value;
          return acc;
        }, {});

        await auth.signIn({
          login: formData.login,
          password: formData.password,
        });
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
          href: '/sign-up'
        }
      )
    ],
  },
)


// страница с чатами
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

        auth.signIn({
          login: formData.login,
          password: formData.password,
        });
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

//форма регистрации
const signupTpl = new Login(
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

        auth.signUp({
          first_name: formData.first_name,
          second_name: formData.second_name,
          login: formData.login,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
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
          href: '/'
        }
      )
    ]
  }
)


router
  // .setUnprotectedPaths(['/sign-in', '/sign-up', '/500'])
  .use('/500', errorTpl500)
  .use('/profile', profileTpl)
  .use('/sign-up', signupTpl)
  .use('/', loginTpl)
  .use('/setting', updateProfileTpl)
  .use('/messenger', chatsTpl)
  .use('/update-password', updatePasswordTpl)
  .use('*', errorTpl404)
  .setUnprotectedPaths(['/'])
  .start();

router.onRoute(() => {
  console.log('Маршрут изменился:', router.getLocationPathname());
});
