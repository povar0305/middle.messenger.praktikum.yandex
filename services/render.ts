import Block from "./Block";

export default function renderDom(query:string, component: Block) {
  const root = document.querySelector(query)
  console.log('component',component)
  if (root) {
    root.appendChild(component.getContent())
  }

  component.dispatchComponentDidMount()
console.log('root',root)
  return root
}
