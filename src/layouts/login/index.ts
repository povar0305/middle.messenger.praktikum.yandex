import Block from "../../../services/Block.ts";
import tpl from './login.ts'
import {router} from "../../../router.ts";
import {store} from "../../../store.ts";

export default class Base extends Block {
  render() {
    return this.compile(tpl)
  }

  componentDidMount() {
    if (store.state.currentUser.id) {
      router.go('/messenger');
    }
  }
}
