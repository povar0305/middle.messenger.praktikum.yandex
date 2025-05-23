import Block from "../../../services/Block.ts";
import tpl from './setting.ts'
import { store } from "../../../store.ts";

export default class Link extends Block {

  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setFormValues(state.currentUser);
    });

  }

  setFormValues(formData: Record<string, string>) {
    const formElementInputs = this.getContent().querySelectorAll('input');

    if (!formElementInputs) {
      return;
    }

    if (formElementInputs.length) {
      formElementInputs.forEach((element) => {
        const key = element.getAttribute('name');

        if (key && formData[key]) {
          element.value = formData[key];
        }
      });
    }
  }
}
