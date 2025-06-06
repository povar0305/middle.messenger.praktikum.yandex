import { IUser } from "../../../services/controllers/User.ts";
import { TState } from "../../../services/Store.ts";

import Block from "../../../services/Block.ts";
import { store } from "../../../store.ts";

import tpl from './profile.ts'

export default class Link extends Block {

  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      const currentUser = state as TState;
      this.setFormValues(currentUser.currentUser);
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

        if (formData && key && value) {
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
