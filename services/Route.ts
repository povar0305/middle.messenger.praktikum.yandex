// Route.ts
import Block from './Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): Element | false {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = ''; // очищаем перед вставкой
    root.appendChild(block.getContent());
    return root;
  }
  return false;
}

class Route {
  private _pathname: string;
  private _BlockClass: Block;
  private _blockInstance: Block | null;

  constructor(
    pathname: string,
    BlockClass: Block,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._BlockClass = BlockClass;
    this._blockInstance = null;
    this._props = props;
  }

  private _props: { rootQuery: string };

  get pathname() {
    return this._pathname;
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render() {
    render(this._props.rootQuery, this._BlockClass);
  }

  public leave() {
    if (this._blockInstance) {
      this._blockInstance.destroy();
      this._blockInstance = null;
    }
  }
}

export default Route;
