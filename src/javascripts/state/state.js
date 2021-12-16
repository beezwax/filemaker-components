// The internal state for a single component. To modify the state, the `update`
// function must be used.
//
export default class State {
  constructor ({ components, id }) {
    this.components = components
    this.observers = []
    this.id = id
    this._state = {}
  }

  // Updates the current state. The first parameter can be an object or a
  // function. When it's an object, the state will be merged with the given
  // object. When it's a function, the current state will be passed to the
  // function, and the state will be merged with whatever the function returns.
  //
  // IMPORTANT: Changing the state without using this method WILL break things,
  // so this must be the only way to change the state.
  //
  update (fn, { target }) {
    if (typeof fn === 'function') {
      this._state = Object.assign({}, this._state, fn(this._state))
    } else if (typeof fn === 'object') {
      this._state = Object.assign({}, this._state, fn)
    } else {
      throw new Error('Invalid argument: Expected function or object.')
    }

    if (target === 'DOM' || target === 'BOTH') this.triggerOnChange(this._state)
    if (target === 'DATASOURCE' || target === 'BOTH') this.push()
  }

  push () {
    this.components.push({ id: this.id, state: this._state })
  }

  onChanged (cb) {
    this.observers.push(cb)
  }

  triggerOnChange (param) {
    this.observers.forEach((cb) => cb(param))
  }
}
