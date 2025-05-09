import Block from "../../../services/Block.ts";
import tpl from './navigate-arrow.ts'

export default class ArrowBack extends Block {
  render() {
    return this.compile(tpl)
  }
}
