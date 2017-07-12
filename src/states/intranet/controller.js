import 'moment'
import swal from 'sweetalert2'
// import generarInputF from './generarInput'

/* @ngInject */
export default function ctrl () {
  var $this = this
  console.log($this)
  swal('Oops...', 'Something went wrong!', 'error')
}