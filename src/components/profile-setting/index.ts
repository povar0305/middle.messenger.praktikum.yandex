import Block from "../../../services/Block.ts";

import { store } from "../../../store.ts";
import { IUser } from "../../../services/controllers/User.ts";

import tpl from './setting.ts'

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
    const formElementInputs = this.getContent().querySelectorAll('input');

    if (!formElementInputs) {
      return;
    }

    if (formElementInputs.length) {
      formElementInputs.forEach((element: HTMLInputElement) => {
        const key = element.getAttribute('name') as string;

        if (formData && key && formData[key] != null) { // проверка на null и undefined
          element.value = <string>formData[key];
        }
      });
    }
  }
}
