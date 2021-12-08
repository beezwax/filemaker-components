import { debounce } from '../utils'

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

// `ComponentState` depends on a data source to push and pull data from/to.
// For now, this will always be FileMaker, but it could be anything, like a
// database or an HTTP API.
export default class FileMakerDataSource {
  constructor () {
    this.push = debounce(this.push, 250)
  }

  push (data) {
    console.log('push', data)
    return this
  }

  pull (callback) {
    callback(FM_RESULT)
    return this
  }
}
