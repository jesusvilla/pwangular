/* function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
} */
/* @ngInject */
export default function app ($timeout) {
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
}