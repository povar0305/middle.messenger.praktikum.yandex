import Block from "../../../services/Block.ts";
import tpl from './login.ts'
import {router} from "../../../router.ts";
import {store} from "../../../store.ts";
import {IUser} from "../../../services/controllers/User.ts";

export default class Base extends Block {
  render() {
    return this.compile(tpl)
  }

  componentDidMount() {
    const user = store.state.currentUser as IUser
    if (user.id) {
      router.go('/messenger');
    }
  }
}
