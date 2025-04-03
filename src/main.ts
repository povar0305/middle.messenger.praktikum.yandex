import './style/main.sass'

import Handlebars from 'handlebars';

import templateBtn from './templates/btn.hbs';
// Данные для рендеринга
const data = {
  text: 'Войти'
};

const template = Handlebars.compile(templateBtn);

const html = template(data);

document.body.innerHTML = html;

