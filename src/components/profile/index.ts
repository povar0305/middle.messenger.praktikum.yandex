import Block from "../../../services/Block.ts";
import tpl from './profile.ts'
import { store } from "../../../store.ts";

export default class Link extends Block {

  render() {
    const resultHTML = this.compile(tpl)

    resultHTML.querySelectorAll('[data-name]').forEach((element) =>{
      console.log(element.attributes[0].value)
      console.log(store)
      // element.textContent = store.currentUser[element.attributes[0].value]
    })
    return resultHTML
  }
}
