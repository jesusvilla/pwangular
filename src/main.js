import angular from 'angular'
import 'angular-aria'
import 'angular-animate'
import 'angular-material'

import App from './App.html'
import './App.scss'
import 'angular-ui-router'
let dependencies = ['ngMaterial', 'ui.router']

// import configEditor from './components/tinymce'
// import 'angular-ui-tinymce'
// dependencies.push('ui.tinymce')
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import 'angular-velocity'
dependencies.push('angular-velocity')

import 'moment'
import 'sweetalert2'

import 'angular-translate'
dependencies.push('pascalprecht.translate')

const sieweb = angular.module('sieweb', dependencies)

import config from './config.js'
sieweb.config(config)

let $app = document.getElementById('app')
$app.innerHTML = '<sie-app></sie-app>'

sieweb.component('sieApp', {
  template: App,
  controllerAs: '$sie',
  controller () {
    // const $sie = this
    // $sie.tinymceOptions = configEditor
  }
})
angular.bootstrap($app, ['sieweb'], {strictDi: true})
export default sieweb