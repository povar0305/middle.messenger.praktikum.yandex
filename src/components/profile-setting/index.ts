import Block from "../../../services/Block.ts";
import tpl from './setting.ts'
import { store } from "../../../store.ts";

export default class Link extends Block {
  render() {
    return this.compile(tpl);
  }

  componentDidMount() {
    store.subscribe((state) => {
      const currentUser = state.currentUser as { [key: string]: unknown } | undefined;
      if (currentUser) {
        this.setFormValues(currentUser);
      }
    });

  }

  setFormValues(formData: { [key:string]: unknown }) {
    const formElementInputs = this.getContent().querySelectorAll('input');

    if (!formElementInputs) {
      return;
    }

    if (formElementInputs.length) {
      formElementInputs.forEach((element) => {
        const key = element.getAttribute('name') as string
        const value = formData[key] as string

        if (formData && key && value) {
          element.value = value;
        }
      });
    }
  }
}
