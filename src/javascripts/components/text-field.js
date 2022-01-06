import components from '../state/components'

class TextField extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.container = document.createElement('div')
    this.container.innerHTML = `
      <textarea type="text">
    `
    this.shadowRoot.append('', this.container)
  }

  get bind () {
    return this.getAttribute('bind')
  }

  set bind (value) {
    this.setAttribute('bind', value)
  }

  get hasBindAttribute () {
    return this.bind && this.bind !== 'null'
  }

  connectedCallback () {
    this.state = this.bindState()

    // Initial state from attributes
    this.state.update({
      value: this.getAttribute('value')
    }, { target: 'BOTH' })
  }

  bindState () {
    if (!this.hasBindAttribute) throw new Error('Must specify a bind attribute')

    const state = components.add(this.bind)
    const input = this.container.querySelector('textarea')

    // state -> DOM
    state.onChanged((state) => {
      console.log('state changed', state)
      input.value = state.value
    })

    // DOM -> state
    input.addEventListener('keyup', (e) => {
      state.update((state) => ({
        value: input.value
      }), { target: 'DATASOURCE' })
    })

    return state
  }

  setState (newState) {
    this.state.update(newState, { target: 'DOM' })
    return this
  }
}

customElements.define('text-field', TextField)
