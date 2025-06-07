import Block from "../../../services/Block.ts";
import tpl from './profile.ts'
import { store } from "../../../store.ts";
import { IUser } from "../../../services/controllers/User.ts";

export default class Link extends Block {

  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setFormValues(state.currentUser);
    });

  }

  setFormValues(formData: IUser) {
    const formElement = this.getContent().querySelectorAll('[data-name]');
    const avatarElement = this.getContent().querySelectorAll('img');

    if (!formElement) {
      return;
    }

    if (formElement.length) {
      formElement.forEach((element) => {
        const key = element.getAttribute('data-name');

        if (formData && key && formData[key]) {
          if ( key === 'avatar') {
            avatarElement[0].src = 'https://ya-praktikum.tech/api/v2/resources/'+formData[key]
          } else {
            element.textContent = formData[key];
          }
        }
      });
    }
  }
}
