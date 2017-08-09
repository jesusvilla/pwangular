// import swal from 'sweetalert2'
import {List} from 'immutable'
// import generarInputF from './generarInput'

/* @ngInject */
export default class ctrl {
  constructor (
    $mdSidenav,
    $timeout,
    $http
  ) {
    this.$mdSidenav = $mdSidenav
    this.$timeout = $timeout
    this.$http = $http
    this.menu = List([])
  }

  $onInit () {
    const $sie = this
    // swal('Titulo', 'Descripcion', 'warning')
    $sie.sidenavMini = false
    $sie.iconMenu = 'arrow_back'
    $sie.$timeout(() => {
      $sie.toggleMenu()
    })

    let newMenu = this.menu.clear()
    newMenu = newMenu.push({
      uisref: 'intranet.mensajeria',
      icon: 'envelope',
      desc: 'Mensajeria'
    })
    this.menu = newMenu
    this.$http.get('http://colegioingenieria.proyectpg.hyo/lms/api/HyoEscudo/obtEscudo')
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
}