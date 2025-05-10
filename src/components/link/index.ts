import Block from "../../../services/Block.ts";
import tpl from './link.ts'

export default class Link extends Block {
  render() {
    return this.compile(tpl)
  }
}
