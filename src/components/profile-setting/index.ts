import Block from "../../../services/Block.ts";
import tpl from './setting.ts'
import { store } from "../../../store.ts";
import {IUser} from "../../../services/controllers/User.ts";

export default class Link extends Block {

  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      const currentUser = state.curentUser  as IUser
      this.setFormValues(currentUser);
    });
  }

  setFormValues(formData: IUser) {
    const formElementInputs = this.getContent().querySelectorAll('input');

    if (!formElementInputs) {
      return;
    }

    if (formElementInputs.length) {
      formElementInputs.forEach((element) => {
        const key = element.getAttribute('name') || 'name'

        if (formData && key && formData[key]) {
          element.value = formData[key];
        }
      });
    }
  }
}
