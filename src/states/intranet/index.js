/* @ngInject */
export default function app ($timeout) {
  const $sie = this
  $sie.intranet = 'Nueva Intranet'
  $timeout(() => {
    $sie.intranet = 'cAMBIO LA INTRANET'
  }, 2000)
}