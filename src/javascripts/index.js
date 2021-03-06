import '../stylesheets/index.sass'
import './components/text-field'
import './components/slider'
import componentsState from './state/components'

window.onload = function () {
  // Create component
  const component = document.createElement('text-field')
  component.bind = 'demo-text-field'
  document.body.appendChild(component)

  // Load up global state from data source
  componentsState.pull()

  // Manually set the state for a component
  // setTimeout(() => {
  //   const tf = document.body.querySelector('text-field')
  //   tf.setState({ value: 'demo' })
  // }, 1000)
}
