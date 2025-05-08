import Block from "../../../services/Block.ts";
import tpl from './input.ts'

export default class Input extends Block {
  render() {
    return this.compile(tpl)
  }

  addEvents() {
    // console.log('this.props?.events', this.props?.events)
    if (this.props?.events) {
      Object.keys(this.props.events).forEach((eventName) => {

     if (this.element?.querySelector('input')) {
          this.element?.querySelector('input').addEventListener(eventName, this.props.events[eventName])
        }
      })
    }
  }
}
