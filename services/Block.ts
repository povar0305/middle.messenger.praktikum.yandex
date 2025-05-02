import EventBus from "./EventBus";
import Handlebars from 'handlebars';
import {v4 as uuidv4} from 'uuid';

type EventBusType = {
  on: (event: string, callback: () => void) => void;
  emit: (event: string, ...args: unknown[]) => void;
};

export type BlockProps = Record<string | symbol, undefined>;

// Определяем интерфейсы для возвращаемого объекта
interface ParsedProps {
  children: { [key: string]: Block };
  props: { [key: string]: any }; // Здесь можно уточнить типы, если известны
}
// Определяем интерфейс для anyProps
interface AnyProps {
  [key: string]: any; // Здесь можно уточнить типы, если известны
}

class Block {
  private children: any;
  private attrs: never;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    EVENT_FLOW_CDU: 'flow:component-did-update'
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: BlockProps } | null = null;
  private eventBus: EventBusType;
  protected props: BlockProps;
  private _oldProps: BlockProps | undefined;

  private _id: any;
  private lists: BlockProps;

  constructor(tagName = "div", propsAndChild?: { content: Link[] }) {
    this.eventBus = new EventBus();
    this._id = uuidv4()

    const { children, props, lists} = this.getChildren(propsAndChild)
    console.log('children',children)
    this.attrs = propsAndChild?.attrs || {}

    this._meta = {
      tagName,
      propsAndChild
    };

    this.props = this._makePropsProxy({...props, _id: this._id});
    this.children =  this._makePropsProxy({...children})
    this.lists =  this._makePropsProxy({...lists})

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(anyProps: AnyProps): ParsedProps {
    const lists: { [key: string]: Block } = {};
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: object } = {};

    if (anyProps) {
      Object.keys(anyProps).forEach((key) => {
        if (anyProps[key] instanceof Block) {
          children[key] = anyProps[key]
        } else if (Array.isArray(anyProps[key])) {
          lists[key] = anyProps[key]
        } else {
          props[key] = anyProps[key]
        }
      })
    }
    return {children, props, lists }
  }
  private _registerEvents(eventBus: EventBusType): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  compile(template: string, context?: any) {
    if (typeof(context) == 'undefined') {
      context = this.props
    }

    const contextAndStubs = {...context}

    const fragment = document.createElement('template')

    // console.log('this',this)
    Object.keys(this.children).forEach((key) => {
      console.log('this.children[key]._id',this.children[key]._id)
      contextAndStubs[key] = `<div data-id="${this.children[key]._id}"></div>`
    })

    Object.keys(this.lists).forEach((key) => {
      console.log('this.lists ,key',this.lists, key)
      contextAndStubs[key] = `<div data-id="list__${key}"></div>`
    })

    fragment.innerHTML = Handlebars.compile(template)(contextAndStubs)

    // console.log('contextAndStubs',contextAndStubs)
    // console.log('fragment.innerHTML',fragment.innerHTML)
    // console.log(fragment)

    Object.values(this.children).forEach((child:any) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      if(stub) {
        stub.replaceWith(child.getContent())
      }
    })

    Object.entries(this.lists).forEach(([key, child=[]]) => {
      console.log('key, child',key, child)
      const stub = fragment.content.querySelector(`[data-id="list__${key}"]`)

      if(!stub) {
        return
      }
      const listContent = document.createElement('template')

      child.forEach((element) => {
        if (element instanceof Block) {
          listContent.content.append(element.getContent())
        } else {
          listContent.content.append(`${element}`)
        }
      })

      stub.replaceWith(listContent.content)
    })

    return fragment.innerHTML
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: BlockProps): void {
    this._oldProps = oldProps;}

  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps?: BlockProps, newProps?: BlockProps): boolean {
    return oldProps !== newProps;
  }

  componentDidUpdate(oldProps?: BlockProps, newProps?: BlockProps): boolean {
    return true; // Реализуйте логику обновления
  }

  setProps(nextProps?: { text: string }): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    if (this._element) { // Проверка на наличие элемента
      this._element.innerHTML = block;
    }
  }

  protected  render(): string {
    return ''; // Переопределяется пользователем. Необходимо вернуть разметку.
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps): BlockProps {

    return new Proxy(props, {
      get(target, props) {
        const value = target[props]
        return typeof value == 'function' ? value.bind(target) : value
      },
      set: (target,prop, value) => {
        const oldValue = {...target}
        target[prop] = value
        this.eventBus.emit(Block.EVENTS.EVENT_FLOW_CDU, oldValue, target)
        return true
    }
    })
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName)

    // if (this.attrs) {
    //   Object.keys(this.attrs).forEach((key) => {
    //     element.setAttribute(key,this.attrs[key])
    //   })
    // }

    return element;
  }

  show(): void {
    if (this.getContent()) {
      this.getContent()!.style.display = "block";
    }
  }

  hide(): void {
    if (this.getContent()) {
      this.getContent()!.style.display = "none";
    }
  }
}

export default Block;
