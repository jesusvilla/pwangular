import template from './template.html'
import controller from './controller.js'

export default {
  template,
  controller,
  controllerAs: '$this',
  bindings: {
    tabla: '=config'
  }
}