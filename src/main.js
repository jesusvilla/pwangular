import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'

import loadState from './loadState.js'
import App from './App.html'
import './App.scss'
import 'angular-ui-router'
let dependencies = ['ngMaterial', 'ui.router']

import configEditor from './components/tinymce'
import 'angular-ui-tinymce'
dependencies.push('ui.tinymce')

import 'moment'

const sieweb = angular.module('sieweb', dependencies)

import statesJSON from './states.json'

console.log(statesJSON)
// config.$inject = ['$stateProvider', '$urlServiceProvider', '$locationProvider', '$compileProvider']

/* @ngInject */
function config ($stateProvider, $urlServiceProvider, $locationProvider, $compileProvider) {
  $locationProvider.html5Mode(false).hashPrefix('')
  if (process.env['NODE_ENV'] === 'production') {
    // Ver más en: https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false)
    // Para habilitar info, escribir en consola: angular.reloadWithDebugInfo()
    $compileProvider.commentDirectivesEnabled(false)
    $compileProvider.cssClassDirectivesEnabled(false)
  }

  $stateProvider.state(loadState('intranet'))
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
angular.bootstrap($app, ['sieweb'], {strictDi: true})
export default sieweb