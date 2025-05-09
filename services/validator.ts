interface ValidatorParams {
  type: 'password'; // Ограничиваем типы
  value: string;
}

export const validator = ({type, value}:ValidatorParams) => {
  const regexs = {
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    login: /^(?=.*[a-zA-Z])(?=.{3,20}$)[a-zA-Z0-9-_]+$/,
    name: /^[A-ZА-Я][a-zа-яA-ZА-ЯёЁ-]*$/,
    email: /^[a-zA-Z0-9-_]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/,
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/
  }

  return regexs[type].test(value)
}
