import Block from "./Block";

export default function renderDom(query:string, component: Block) {
  const root = document.querySelector(query)
  if (root) {
    root.appendChild(component.getContent())
  }

  component.dispatchComponentDidMount()

  return root
}
