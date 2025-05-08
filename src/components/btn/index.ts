import Block from "../../../services/Block.ts";
import tpl from './btn.ts'

export default class Btn extends Block {
  render() {
    return this.compile(tpl)
  }
}
