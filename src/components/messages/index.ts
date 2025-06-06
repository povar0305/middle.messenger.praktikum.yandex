import Block from "../../../services/Block.ts";
import tpl from './messages.ts'

export default class Link extends Block {
  render() {
    return this.compile(tpl)
  }
}
