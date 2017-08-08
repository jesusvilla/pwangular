/* function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
} */
/* export default function app ($timeout) {
  // $scope.$parent.$sie
  const $sie = this
  const size = 50000// 500000 muere
  $sie.generarArreglo = function () {
    console.time('arreglo')
    const arreglo = []
    for (let i = 0; i < size; i++) {
      arreglo.push({id: i, value: `Item${i}`})
    }
    $sie.data = arreglo
    $timeout(() => {
      console.timeEnd('arreglo')
    })
  }

  $sie.$onInit = () => {
    $sie.data = []
    console.log('inicio')
  }
} */
import {List} from 'immutable'

/* @ngInject */
export default class app {
  constructor ($timeout) {
    this.$timeout = $timeout
    this.size = 50000// 500000
    this.data = List([])
  }
  generarArreglo () {
    console.time('arreglo')
    let arreglo = []
    for (let i = 0; i < this.size; i++) {
      arreglo.push({id: i, value: `Item${i}`})
    }
    this.data = List(arreglo)
    this.$timeout(() => {
      console.timeEnd('arreglo')
    })
  }
}