import componentState from '../state/components'

class TextField extends HTMLElement {
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
    if (!this.id || this.id === 'null') throw new Error('Web Component must specify an `id` attribute')

    const state = componentState.add(this.id)
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

customElements.define('text-field', TextField)
