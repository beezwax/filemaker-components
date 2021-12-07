// For local testing, dummy FileMaker result for script that returns the state
// of all defined components/fields.
const FM_RESULT = [
  {
    component: 'demo-text-field',
    state: {
      value: 'hello'
    }
  },
  {
    component: 'demo-text-field2',
    state: {
      value: 'world'
    }
  }
]

// The internal state for a single component.
class State {
  constructor () {
    this.observers = []
    this._state = {}
  }

  // TODO: Debounce this
  update (fn, { source }) {
    if (typeof fn === 'function') {
      fn(this._state)
    } else if (typeof fn === 'object') {
      this._state = fn
    } else {
      throw new Error('Invalid argument to State.update. Expected function or object.')
    }

    if (source === 'FILEMAKER') {
      this.observers.forEach((cb) => cb(this._state))
    }

    if (source === 'DOM') {
      components.pushStateToFileMaker()
    }
  }

  onChanged (cb) {
    this.observers.push(cb)
  }
}

// The internal state for all the active components in the page.
class ComponentState {
  constructor () {
    this.components = new Map()
  }

  pushStateToFileMaker () {
    console.log('push state to fm')
  }

  pullStateFromFileMaker () {
    console.log('pull state from FM')
    // FMBond.performScript('some script').then((result) => {
    //   Object.keys(result).forEach((key) => {
    //     const value = result[key]
    //     const state = this.components.get(key)
    //     state.update(value)
    //   })
    // })
    FM_RESULT.forEach((record) => {
      const { component, state } = record
      const oldState = this.components.get(component)
      if (oldState) {
        oldState.update(state, { source: 'FILEMAKER' })
      } else {
        console.warn(`FileMaker result included state for a component with id ${component}, but no component with that id was found in the Web Viewer.`)
      }
    })
  }

  add (component) {
    const state = new State(this)
    const id = component.getAttribute('id')
    if (!id || id === 'null') throw new Error('Web Component must specify an `id` attribute')

    this.components.set(id, state)
    return state
  }
}

const components = new ComponentState()

window.requestComponentStateUpdate = () => {
  components.pullStateFromFileMaker()
}

export default components
