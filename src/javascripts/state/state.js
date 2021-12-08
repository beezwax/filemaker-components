// The internal state for a single component.
export default class State {
  constructor (components) {
    this.components = components
    this.observers = []
    this._state = {}
  }

  update (fn, { source }) {
    if (typeof fn === 'function') {
      fn(this._state)
    } else if (typeof fn === 'object') {
      this._state = fn
    } else {
      throw new Error('Invalid argument: Expected function or object.')
    }

    if (source === 'FILEMAKER') this.triggerOnChange(this._state)
    if (source === 'DOM') this.components.push()
  }

  onChanged (cb) {
    this.observers.push(cb)
  }

  triggerOnChange (param) {
    this.observers.forEach((cb) => cb(param))
  }
}
