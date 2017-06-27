import 'moment'
/* @ngInject */
export default function ctrl ($timeout) {
  const $sie = this
  $sie.intranet = 'Nueva Intranet'
  $timeout(() => {
    $sie.intranet = 'cAMBIO LA INTRANET'
  }, 2000)
}