export default function ($mdThemingProvider) {
  var regla = 'md-THEME_NAME-theme'
  var generacionClases = ' '
  var generarClase = function (css, objeto) {
    var clase = css.replace(/sietema/gi, regla)
    if (objeto) {
      var regexClase = /(\[)|(\])/g
      for (var key in objeto) {
        if (!(regexClase.test(objeto[key]))) { // Si no tiene []
          objeto[key] = "'{{" + objeto[key] + "}}'"
        } else {
          objeto[key] = objeto[key].replace(regexClase, '')
        }
        objeto[key] += ' !important'
      }
      clase += JSON.stringify(objeto).replace(/"/g, '').replace(/,/g, ';')
                // clase += JSON.stringify(objeto).replace(/"/g, '').replace(/:(?!\[)/g, ":'{{").replace(/(?!\])}/g, "}}' !important$&").replace(/(?!\]),/g, "}}' !important$&").replace(',', ';', 'g').replace(/(\[)|(\])/g, '');
                // return JSON.stringify(objeto).replace(/"/g, '').replace(/\[/g, "'{{").replace(/\]/g, "}}'").replace(/,/g, ';')//var objeto = {color: '[accent-500]'}
                // Ejm: var objeto = {'background-color': 'accent-500', 'color': '[white]'}
                // return: "{background-color:'{{accent-500}}' !important, color: white !important}"
    }
    clase += ' '
    generacionClases += clase// Palabra clave: SIETEMA o sietema
    return clase
  };

  ['primary', 'accent', 'warn', 'background'].forEach(function (v) {
    generarClase('.bg-' + v + '.sietema', {'background-color': v + '-500'})
    generarClase('.bg-' + v + '-700.sietema', {'background-color': v + '-700'})
    generarClase('.c-' + v + '.sietema', {'color': v + '-500'})
    generarClase('.c-' + v + '-700.sietema', {'color': v + '-700'})
    generarClase('.b-' + v + '.sietema', {'border-color': v + '-500'})
    generarClase('.b-t-' + v + '.sietema', {'border-top-color': v + '-500'})
    generarClase('.b-r-' + v + '.sietema', {'border-right-color': v + '-500'})
    generarClase('.b-b-' + v + '.sietema', {'border-bottom-color': v + '-500'})
    generarClase('.b-l-' + v + '.sietema', {'border-left-color': v + '-500'})
  })
  generarClase('md-list-item.active.sietema', {'border-left-color': 'accent-500'})
  generarClase('.md-step.md-active.sietema md-step-label-wrapper:before, .md-step.md-success md-step-label-wrapper:before', {'background-color': 'accent-500'})
  generarClase('md-toast.sietema .md-toast-content', {'background-color': 'primary-500', 'color': 'background-50'})

        // Adaptando tema a material-datetimepicker
  generarClase('.dtp .dtp-content > .dtp-date-view > header.dtp-header', {'background-color': 'accent-400'})
  generarClase('.dtp div.dtp-date, .dtp div.dtp-time', {'background-color': 'accent-500'})
  generarClase('.dtp table.dtp-picker-days tr > td > a.selected', {'background-color': 'accent-500'})
  generarClase('.dtp .dtp-actual-meridien a.selected', {'background-color': 'accent-500'})
  generarClase('.dtp .dtp-picker-time > a.dtp-select-hour.selected', {background: 'accent-500'})
  generarClase('.dtp .dtp-hand.on', {background: 'accent-400'})

  generarClase('.md-button-loading.sietema:after', {'border-color': 'accent-500'})
  generarClase('.md-stepper-indicator.sietema.md-active .md-stepper-number', {'background-color': 'accent-500'})
  generarClase('.md-stepper-indicator.sietema.md-completed .md-stepper-number', {'background-color': 'accent-500'})

  generarClase('.sietema .md-calendar-day-header', {'background-color': 'accent-500', color: '[white]'})

  generarClase('.sietema .md-calendar-date.md-calendar-selected-date .md-calendar-date-selection-indicator', {'background-color': 'accent-500'})
  generarClase('.sietema .md-calendar-date.md-focus.md-calendar-selected-date .md-calendar-date-selection-indicator', {'background-color': 'accent-500'})
  generarClase('.sietema .md-calendar-date.md-calendar-date-today .md-calendar-date-selection-indicator', {'border-color': 'accent-500'})
  generarClase('.md-checkbox-enabled.sietema[selected] .md-icon, .md-checkbox-enabled[selected] .md-icon', {'background-color': 'accent-500'})

  // Swal
  // generarClase('.swal2-confirm', {'background-color': 'primary-500'})

  $mdThemingProvider.registerStyles(generacionClases)

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
    'A200': '26a69a',
    'A400': '229e92',
    'A700': '178b7e',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      '400',
      'A100'
    ],
    'contrastLightColors': [
      '500',
      '600',
      '700',
      '800',
      '900',
      'A200',
      'A400',
      'A700'
    ]
  })

  $mdThemingProvider.theme('default')
    .primaryPalette('bluedark')
    .accentPalette('tealjs')// 26a69a
}