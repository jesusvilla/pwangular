import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'
import App from './App.html'
import './App.scss'

let dependencies = ['ngMaterial']
const editor = 'tinymce'
let configEditor = {
  skin_url: window.location.origin + '/skins/lightgray',
  plugins: ['paste', 'link'],
  branding: false
}
if (editor === 'tinymce') {
  /* import configTinymce from './components/tinymce'
  import 'angular-ui-tinymce'
  configEditor = configTinymce
  dependencies.push('ui.tinymce') */
} else {

}

import 'textangular/dist/textAngular-sanitize.min'
import 'textAngular'

dependencies.push('textAngular')

let sieweb = angular.module('sieweb', dependencies)

let $app = document.getElementById('app')
$app.innerHTML = '<sie-app></sie-app>'

sieweb.component('sieApp', {
  template: App,
  controllerAs: '$sie',
  controller () {
    let $sie = this
    $sie.saludo = 'Jaja'
    $sie.tinymceOptions = configEditor
  }
})
angular.bootstrap($app, ['sieweb'])
export default sieweb