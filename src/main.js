import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'
import App from './App.html'
import './App.scss'
// import '~node_modules/angular-material/angular-material.scss'

let sieweb = angular.module('sieweb', ['ngMaterial'])
let $app = document.getElementById('app')
$app.innerHTML = '<sie-app></sie-app>'
// console.log('Prueba', sieweb)
sieweb.component('sieApp', {
  template: App,
  controllerAs: '$sie',
  controller () {
    this.saludo = 'Jaja'
  }
})
angular.bootstrap($app, ['sieweb'])
export default sieweb