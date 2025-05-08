import Block from "../../../services/Block.ts";
import tpl from './input.ts'

export default class Input extends Block {
  render() {
    return this.compile(tpl)
  }

  addEvents() {
    console.log('функция addEvents переписанная в компоненте. Смотрим, есть ли события', this.props?.events)
    // console.log('this.props?.events', this.props?.events)
    if (this.props?.events) {
      console.log('события есть')
      Object.keys(this.props.events).forEach((eventName) => {

        console.log('Проходимся по событиям, добавляя их на ', this.element, this.element?.querySelector('input'))
        console.log('Событие ', eventName, 'в виде функции', this.props.events[eventName])

        if (this.element?.querySelector('input')) {
          this.element?.querySelector('input').addEventListener(eventName, this.props.events[eventName])
        }
      })
    }
  }
}
