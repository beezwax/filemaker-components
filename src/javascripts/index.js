import '../stylesheets/index.sass'
import './components/text-field'
import componentsState from './state/components'

window.onload = function () {
  componentsState.pull()
}
