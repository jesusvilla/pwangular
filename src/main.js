const dependencies = []
import angular from 'angular'
import 'angular-animate'

import 'angular-aria'
import 'angular-material'
dependencies.push('ngMaterial')

import App from './App.html'
import './App.scss'
import 'angular-ui-router'
dependencies.push('ui.router')

import 'immutable'
import 'angular-immutable'
dependencies.push('immutable')

// import configEditor from './components/tinymce'
// import 'angular-ui-tinymce'
// dependencies.push('ui.tinymce')
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import 'angular-velocity'
dependencies.push('angular-velocity')

import 'moment'
import 'chart.js'
import swal from 'sweetalert2'
swal.setDefaults({
  buttonsStyling: false,
  confirmButtonClass: 'md-button md-accent md-raised',
  cancelButtonClass: 'md-button md-primary',
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar'
})

import 'angular-strap/dist/modules/compiler.js'
import 'angular-strap/dist/modules/dimensions.js'
import 'angular-strap/dist/modules/tooltip.js'
import 'angular-strap/dist/modules/tooltip.tpl.js'
import 'angular-strap/dist/modules/date-formatter.js'
import 'angular-strap/dist/modules/date-parser.js'
import 'angular-strap/dist/modules/timepicker.js'
import 'angular-strap/dist/modules/timepicker.tpl.js'
import 'angular-strap/dist/modules/datepicker.js'
import 'angular-strap/dist/modules/datepicker.tpl.js'
// dependencies.push('mgcrea.ngStrap.tooltip')
dependencies.push('mgcrea.ngStrap.timepicker')
dependencies.push('mgcrea.ngStrap.datepicker')

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

/* import $mdSidenav from './services/mdSideNav'
sieweb.factory('$mdSidenav', $mdSidenav) */
angular.bootstrap($app, ['sieweb'], {strictDi: true})
export default sieweb