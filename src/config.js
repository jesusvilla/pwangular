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
  $translateProvider,
  $mdIconProvider
) {
  $locationProvider.html5Mode(false).hashPrefix('')
  $mdIconProvider.defaultFontSet('sieicons')
  $mdThemingProvider.disableTheming()

  $mdThemingProvider.definePalette('bluedark', {
    '50': 'e7eaef',
    '100': 'c4ccd7',
    '200': '9caabc',
    '300': '7487a1',
    '400': '576e8d',
    '500': '395479',
    '600': '334d71',
    '700': '2c4366',
    '800': '243a5c',
    '900': '172949',
    'A100': '87afff',
    'A200': '548dff',
    'A400': '216bff',
    'A700': '085aff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      'A100',
      'A200'
    ],
    'contrastLightColors': [
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A400',
      'A700'
    ]
  })
  $mdThemingProvider.definePalette('tealjs', {
    '50': 'e5f4f3',
    '100': 'bee4e1',
    '200': '93d3cd',
    '300': '67c1b8',
    '400': '47b3a9',
    '500': '26a69a',
    '600': '229e92',
    '700': '1c9588',
    '800': '178b7e',
    '900': '0d7b6c',
    'A100': 'adfff3',
    'A200': '7affec',
    'A400': '47ffe4',
    'A700': '2dffe0',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      '400',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': [
      '500',
      '600',
      '700',
      '800',
      '900'
    ]
  })

  $mdThemingProvider.theme('default')
    .primaryPalette('bluedark')
    .accentPalette('tealjs')

  const arrAnimaciones = ['angular-animate', 'md-sidenav-backdrop', 'md-sidenav-']
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
  $translateProvider.useSanitizeValueStrategy('escape')
}