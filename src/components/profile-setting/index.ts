import Block from "../../../services/Block.ts";
import tpl from './setting.ts'
import { store } from "../../../store.ts";

export default class Link extends Block {
  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      const currentUser = state.curentUser  as { [key: string]: string }
      this.setFormValues(currentUser);
    });
  }

  setFormValues(formData: { [key: string]: string }) {
    const formElementInputs = this.getContent().querySelectorAll('input');

    if (!formElementInputs) {
      return;
    }

    if (formElementInputs.length) {
      formElementInputs.forEach((element) => {
        const key = element.getAttribute('name') as string
        const data = formData as { [key: string]: string };

        const value = data[key] as string

        if (formData && key) {
          element.value = value;
        }
      });
    }
  }
}
