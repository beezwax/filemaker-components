import '../stylesheets/index.sass'
import componentState from './component-state'

class TextFieldComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.id = this.getAttribute('id')

    this.container = document.createElement('div')
    this.container.innerHTML = `
      <input type="text">
    `
    this.shadowRoot.append('', this.container)
  }

  connectedCallback () {
    const state = componentState.add(this)
    const input = this.container.querySelector('input')

    state.onChanged((state) => {
      console.log('state is', state)
      input.value = state.value
    })

    input.addEventListener('keyup', (e) => {
      state.update((state) => {
        state.value = input.value
      }, { source: 'DOM' })
    })
  }
}

customElements.define('text-field', TextFieldComponent)
