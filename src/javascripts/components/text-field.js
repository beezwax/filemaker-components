import components from '../state/components'

class TextField extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.container = document.createElement('div')
    this.container.innerHTML = `
      <input type="text">
    `
    this.shadowRoot.append('', this.container)
  }

  get bind () {
    return this.getAttribute('bind')
  }

  set bind (value) {
    this.setAttribute('bind', value)
  }

  get isBound () {
    return this.bind && this.bind !== 'null'
  }

  connectedCallback () {
    if (this.isBound) this.bindState()
  }

  bindState () {
    const state = components.add(this.bind)
    const input = this.container.querySelector('input')

    // state -> DOM
    state.onChanged((state) => {
      console.log('state is', state)
      input.value = state.value
    })

    // DOM -> state
    input.addEventListener('keyup', (e) => {
      state.update((state) => ({
        value: input.value
      }), { source: 'DOM' })
    })
  }
}

customElements.define('text-field', TextField)
