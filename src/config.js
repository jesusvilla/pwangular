import statesJSON from './states.json'
import loadState from './loadState.js'
import generateTheme from './themes/generateTheme.js'
import angular from 'angular'
/* @ngInject */
export default function config (
  $stateProvider,
  $urlRouterProvider,
  $urlServiceProvider,
  $locationProvider,
  $compileProvider,
  $mdThemingProvider,
  $mdIconProvider,
  $animateProvider,
  $translateProvider,
  $httpProvider,
  $datepickerProvider
) {
  $locationProvider.html5Mode(false).hashPrefix('')

  $mdIconProvider.defaultFontSet('sieicons')
  // $mdThemingProvider.disableTheming()
  generateTheme($mdThemingProvider)

  const arrAnimaciones = ['angular-animate', 'md-sidenav-backdrop', 'md-sidenav-', 'md-fab-toolbar', 'md-animations']
  $animateProvider.classNameFilter(new RegExp(arrAnimaciones.map(v => `(${v})`).join('|')))
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
  $urlRouterProvider.otherwise('intranet')
  $translateProvider.useSanitizeValueStrategy('escape')

  $httpProvider.defaults.headers.common['sie-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJTSVNDT0QiOiIyMSIsIlVTVUNPRCI6IlNJRSIsIlVTVU5PTSI6IkFkbWluaXN0cmFkb3IgU2llV2ViIiwiVElQQ09EIjoiMDAxIiwiUFJPRkNPRCI6bnVsbCwiVElQTk9NIjoiQWRtaW5pc3RyYWRvciBkZWwgU2lzdGVtYSIsIkFDQ0VTTyI6bnVsbCwiRkFNQ09EIjpudWxsLCJBTFVDT0QiOm51bGwsIkFDQ0VTT19TQUxPTiI6IlQiLCJBQ0NFU09fQklCTElPIjpudWxsLCJQRVJTT05BTElaQURPIjpudWxsLCJET0NFU1QiOm51bGwsIkFOT0VTVCI6IlAiLCJBTk8iOjIwMTcsIkFOT0RFUyI6IiIsIkNPTEVHSU8iOiJjb2xlZ2lvaW5nZW5pZXJpYSIsIkNPTENPRCI6IjAxOTMiLCJJUCI6Ijo6ZmZmZjoxMjcuMC4wLjEiLCJDT09LSUUiOiJrbzB0bjkxbnFjYm1qZjQ2OWJlY3U2aGVhNSIsImlhdCI6MTUwMjIxNzkzMywiZXhwIjoxNTA0ODA5OTMzfQ.tgBRPfLE_rPmzIGyDWTmccJ-mCcAVNN13YbbEuNl3E0'

  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type'
  $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  $httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true
  // 'Access-Control-Allow-Credentials': true
  $httpProvider.defaults.headers.common['Accept'] = 'application/json'
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'

  $httpProvider.defaults.useXDomain = true
  $httpProvider.defaults.withCredentials = true
  delete $httpProvider.defaults.headers.common['X-Requested-With']

  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    iconLeft: 'sieicons chevron_left',
    iconRight: 'sieicons chevron_right'
    // startWeek: 1
  })
}