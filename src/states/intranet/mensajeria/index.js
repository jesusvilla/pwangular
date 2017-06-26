/* @ngInject */
export default function app ($scope, $state, $timeout) {
  const $sie = this
  $sie.info = ''

  $timeout(() => {
    $scope.$parent.$sie.intranet = 'Cambio Mens'
  }, 4000)
  console.log('Entraste a mensajeria', $sie)
}