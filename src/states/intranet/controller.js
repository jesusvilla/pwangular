import 'moment'
import swal from 'sweetalert2'
// import generarInputF from './generarInput'

/* @ngInject */
export default class ctrl {
  constructor (
    $mdSidenav,
    $timeout) {
    this.$mdSidenav = $mdSidenav
    this.$timeout = $timeout
  }

  toggleMenu () {
    console.log('Toggle menu')
    const $sie = this
    const $menu = this.$mdSidenav('menu')
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

  $onInit () {
    const $sie = this
    swal('Titulo', 'Descripcion', 'warning')
    $sie.sidenavMini = false
    $sie.iconMenu = 'arrow_back'
    $sie.$timeout(() => {
      $sie.toggleMenu()
    })
  }
}