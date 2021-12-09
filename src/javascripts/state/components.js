import State from './state'
import FileMakerDataSource from './filemaker-data-source'

// The internal state for all the active components in the page.
class Components {
  constructor (dataSource) {
    this.dataSource = dataSource
    this.components = new Map()
  }

  push (data) {
    this.dataSource.push(data)
  }

  pull () {
    this.dataSource.pull((data) => {
      data.forEach((record) => {
        const { id, state } = record
        const oldState = this.components.get(id)
        if (oldState) {
          oldState.update(state, { source: 'FILEMAKER' })
        } else {
          console.warn(`FileMaker result included state for a component with id ${id}, but no component with that id was found in the Web Viewer.`)
        }
      })
    })
  }

  add (id) {
    if (this.components.has(id)) throw new Error(`Component with id '${id}' has already been defined`)

    const state = new State({ components: this, id })
    this.components.set(id, state)
    return state
  }
}

const dataSource = new FileMakerDataSource()
const components = new Components(dataSource)
window.requestComponentStateUpdate = () => components.pull()

export default components
