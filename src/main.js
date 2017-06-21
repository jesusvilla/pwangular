import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'
import App from './App.html'
import './App.scss'
import 'angular-ui-router'
let dependencies = ['ngMaterial', 'ui.router']

import configEditor from './components/tinymce'
import 'angular-ui-tinymce'
dependencies.push('ui.tinymce')

import('moment').then((moment) => {
  console.log('mira Moment', moment)
})
/*
import 'textangular/dist/textAngular-rangy.min'
import 'textangular/dist/textAngular-sanitize.min'
import 'textangular'
dependencies.push('textAngular')
*/

let sieweb = angular.module('sieweb', dependencies)
config.$inject = ['$stateProvider', '$urlServiceProvider', '$locationProvider']
function config ($stateProvider, $urlServiceProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('sieweb')

  // https://ui-router.github.io/ng1/docs/latest/interfaces/ng1.ng1statedeclaration.html#lazyload
  $stateProvider.state({
    name: 'intranet',
    url: '/intranet',
    lazyload: (transition, state) => {
      console.log(transition, state)
      import(`./states/intranet`)
    }
  })
}
sieweb.config(config)

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