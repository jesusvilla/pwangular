import 'moment'
// import swal from 'sweetalert2'
// import generarInputF from './generarInput'

/* @ngInject */
export default function ctrl ($mdSidenav, $timeout) {
  var $sie = this

  $sie.toggleMenu = () => {
    console.log('Toggle menu')
    const $menu = $mdSidenav('menu')
    const isOpenMenu = $menu.isOpen()
    const isLOpenMenu = $menu.isLockedOpen()

    if (isLOpenMenu) { // Si esta bloqueado => puede estar en 60px o no
      if ($sie.sidenavMini) {
        $sie.sidenavMini = ''
        $sie.iconMenu = 'arrow_back'
      } else {
        $sie.sidenavMini = 'sidenav-mini'
        $sie.iconMenu = 'arrow_forward'
      }
    } else {
      $sie.iconMenu = 'menu'
      if (isOpenMenu) {
        $menu.close()
      } else {
        $menu.open()
      }
    }
  }

  $sie.$onInit = () => {
    $sie.sidenavMini = false
    $sie.iconMenu = 'arrow_back'
    $timeout(() => {
      $sie.toggleMenu()
    })
  }
}