import Block from "../../../services/Block.ts";
import tpl from './error.ts'

export default class Link extends Block {
  render() {
    return this.compile(tpl)
  }
}
