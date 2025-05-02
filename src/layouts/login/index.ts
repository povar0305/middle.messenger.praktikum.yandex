import Block from "../../../services/Block.ts";
import tpl from './login.ts'

export default class Base extends Block {
  render() {
    return this.compile(tpl)
  }
}
