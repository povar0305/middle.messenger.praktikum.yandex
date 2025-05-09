import Block from "../../../services/Block.ts";
import tpl from './input.ts'

export default class Input extends Block {
  render():Node {
    return this.compile(tpl)
  }

  addEvents() {
    // console.log('this.props?.events', this.props?.events)
    if (this.props?.events) {
      Object.keys(this.props.events).forEach((eventName) => {

     if (this.element?.querySelector('input')) {
       const eventHandler = this.props.events as { [key: string]: (event: Event) => void };
       this.element?.querySelector('input')?.addEventListener(eventName, eventHandler[eventName]);
        }
      })
    }
  }
}
