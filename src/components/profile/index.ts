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
      this.setFormValues(state.currentUser as IUser);
    });

  }

  setFormValues(formData: IUser) {
    const formElement = this.getContent().querySelectorAll('[data-name]');
    const avatarElement = this.getContent().querySelectorAll('img');

    if (!formElement) {
      return;
    }

    if (formElement.length) {
      formElement.forEach((element:Element) => {
        const key = element.getAttribute('data-name') as string;
        const value = formData[key] as string

        if (formData && key && formData[key]) {
          if ( key === 'avatar') {
            avatarElement[0].src = 'https://ya-praktikum.tech/api/v2/resources/'+ value
          } else {
            element.textContent = value;
          }
        }
      });
    }
  }
}
