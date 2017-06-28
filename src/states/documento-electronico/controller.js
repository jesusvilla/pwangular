import angular from 'angular'
/* @ngInject */
export default function app ($http, $state, $mdDialog) {
  const $sie = this
  $sie.documento = {}
  $sie.consultar = function () {
    $http({
      method: 'GET',
      url: '/api/documento-electronico/validar-captcha',
      params: {
        privatekey: '6LdkhQITAAAAACvLD7mBQPZew-m6FKJzFBgZYegZ',
        challenge: $sie.documento.captcha.challenge,
        response: $sie.documento.captcha.response
      }
    }).then(function () {
      $http({
        method: 'GET',
        url: '/api/documento-electronico/obtener-data-documento',
        params: {
          tipo_documento: $sie.documento.codigo.substring(0, 2),
          prefijo_documento: $sie.documento.numero.substring(0, 4),
          numero_documento: $sie.documento.numero.substring(5, 13),
          fecha_emision: $sie.documento.fecha_emision.getFullYear() +
                        ('0' + ($sie.documento.fecha_emision.getMonth() + 1)).substring(('0' + ($sie.documento.fecha_emision.getMonth() + 1)).length - 2) +
                        ('0' + $sie.documento.fecha_emision.getDate()).substring(('0' + $sie.documento.fecha_emision.getDate()).length - 2),
          monto_total: $sie.documento.monto
        }
      }).then(function (response) {
        $state.go('delectronico.consulta', {
          correlativo: response.data.obtenerDataDocumento.correlativo,
          pdf: response.data.obtenerDataDocumento.pdf,
          xml_envio: response.data.obtenerDataDocumento.xml_envio,
          xml_respuesta: response.data.obtenerDataDocumento.xml_respuesta
        })
        $state.transitionTo('delectronico.consulta', {
          correlativo: response.data.obtenerDataDocumento.correlativo,
          pdf: response.data.obtenerDataDocumento.pdf,
          xml_envio: response.data.obtenerDataDocumento.xml_envio,
          xml_respuesta: response.data.obtenerDataDocumento.xml_respuesta
        })
      }, function (response) {
        /* Recaptcha.reload()
        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Alerta')
              .textContent(response.data.error.message)
              .ariaLabel('Alerta')
              .ok('Cerrar')
          ) */
      })
    }).catch(function (status) {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Alerta')
        .textContent('El captcha ingresado es incorrecto')
        .ariaLabel('Alerta')
        .ok('Cerrar')
    )
    })
  }
}