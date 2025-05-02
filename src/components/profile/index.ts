import Block from "../../../services/Block.ts";
import tpl from './profile.ts'

export default class Link extends Block {
  render() {
    return this.compile(tpl)
  }
}
