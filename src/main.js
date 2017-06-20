import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'
import App from './App.html'
import './App.scss'
import configTinymce from './components/tinymce.js'
import 'angular-ui-tinymce'
// import '~node_modules/angular-material/angular-material.scss'

let sieweb = angular.module('sieweb', ['ngMaterial', 'ui.tinymce'])
let $app = document.getElementById('app')
console.log('Hola Walter', configTinymce)
$app.innerHTML = '<sie-app></sie-app>'
// console.log('Prueba', sieweb)
sieweb.component('sieApp', {
  template: App,
  controllerAs: '$sie',
  controller () {
    let $sie = this
    $sie.saludo = 'Jaja'
    $sie.tinymceOptions = configTinymce
  }
})
angular.bootstrap($app, ['sieweb'])
export default sieweb