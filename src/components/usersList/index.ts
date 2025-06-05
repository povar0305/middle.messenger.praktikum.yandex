import Block from "../../../services/Block.ts";
import tpl from './users-list.ts'

export default class UsersList extends Block {
  render():Node {
    return this.compile(tpl)
  }
}
