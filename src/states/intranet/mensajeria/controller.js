import {List} from 'immutable'
/* function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
} */
/* @ngInject */
export default class Ctrl {
  // $scope.$parent.$sie
  constructor ($scope, $state, $timeout) {
    const $sie = this
    $sie.$scope = $scope
    $sie.$state = $state
    $sie.$timeout = $timeout
    $sie.data = List([
      {id: 0, value: 'Cero'},
      {id: 1, value: 'Uno'},
      {id: 2, value: 'Dos'}
    ])
  }

  generarArreglo () {
    const $sie = this
    const numRandom = 50000// randomIntFromInterval(40000, 50000)
    const isImmutable = true

    console.log(`Generando ${numRandom} filas`)
    console.time('render')
    if (isImmutable) {
      // Con Immutable 50000 -> 36841.129ms, 36028.189ms, 1298.940ms, 1291.541ms
      // Con Inmutable y sin animate: 50000 -> 3471.479ms, 1278.810ms
      $sie.data = $sie.data.clear()
      // let newData = List([])
      for (let i = 0; i < numRandom; i++) {
        $sie.data = $sie.data.push({id: i, value: `Item ${i}`, prop1: `Prop1 ${i}`, prop2: `Prop2 ${i}`})
      }
    } else {
      // Sin Immutable: 50000 -> 36398.104ms, 36690.804ms, 1266.544ms, 1267.450ms
      // Sin Inmutable y sin animate: 50000 -> 3550.035ms, 1277.340ms
      $sie.data = []
      let newData = []
      for (let i = 0; i < numRandom; i++) {
        newData.push({id: i, value: `Item ${i}`, prop1: `Prop1 ${i}`, prop2: `Prop2 ${i}`})
      }
      $sie.data = newData
    }
    $sie.$timeout(() => {
      console.timeEnd('render')
    })
  }
}