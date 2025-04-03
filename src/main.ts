import { setupCounter } from './counter.ts'
import './style/main.sass'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button class="sp-button">
      text
    </button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
