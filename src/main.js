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

console.log('NO inject')
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

  // https://ui-router.github.io/ng1/docs/latest/interfaces/ng1.ng1statedeclaration.html#lazyload

  // Mira: https://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs
  // https://michalzalecki.com/lazy-load-angularjs-with-webpack/
  $stateProvider.state({
    name: 'intranet',
    url: '/intranet',
    // templateUrl: require('./states/intranet.index.html'),
    templateProvider: () => {
      console.log('templateProvider')
      return import('./states/intranet/index.html')
    },
    controllerProvider: (sieController) => {
      return sieController
    },
    resolve: {
      sieController: () => {
        console.log('resolve: sieController')
        return import('./states/intranet/index.js')
      }
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
angular.bootstrap($app, ['sieweb'], {strictDi: true})
export default sieweb