import {List} from 'immutable'
function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/* @ngInject */
export default function ctrl ($scope, $state, $timeout) {
  // $scope.$parent.$sie
  const $sie = this
  $sie.data = List([
    {id: 0, value: 'Cero'},
    {id: 1, value: 'Uno'},
    {id: 2, value: 'Dos'}
  ])

  $sie.generarArreglo = function () {
    const numRandom = randomIntFromInterval(1000, 5000)
    console.log(`Generando ${numRandom} filas`)
    $sie.data = $sie.data.clear()
    for (let i = 0; i < numRandom; i++) {
      $sie.data = $sie.data.push({id: i, value: `Item ${i}`})
    }
  }
}