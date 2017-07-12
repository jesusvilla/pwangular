import statesJSON from './states.json'
import loadState from './loadState.js'
/* @ngInject */
export default function config (
  $stateProvider,
  $urlServiceProvider,
  $locationProvider,
  $compileProvider,
  $mdThemingProvider,
  $animateProvider,
  $translateProvider
) {
  $locationProvider.html5Mode(false).hashPrefix('')
  // $mdThemingProvider.disableTheming()
  $animateProvider.classNameFilter(/angular-animate/)
  if (process.env['NODE_ENV'] === 'production') {
    // Ver más en: https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false)
    // Para habilitar info, escribir en consola: angular.reloadWithDebugInfo()
    $compileProvider.commentDirectivesEnabled(false)
    $compileProvider.cssClassDirectivesEnabled(false)
  }
  statesJSON.json.forEach(state => {
    $stateProvider.state(loadState(state))
  })
  $translateProvider.useSanitizeValueStrategy('escape')
}