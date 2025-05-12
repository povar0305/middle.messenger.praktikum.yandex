import Block from "../../../services/Block.ts";
import tpl from './chats.ts'

export default class Base extends Block {
  render() {
    return this.compile(tpl)
  }
}
