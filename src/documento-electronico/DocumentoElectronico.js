var app = angular.module('DocumentoElectronico',
['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages',
'reCAPTCHA', 'ui.router', 'ngMaterial'])

.controller('ConsultaCtrl', function ($scope, $http, $mdDialog, $state, $http) {
    $scope.consultar = function () {
   $http({
      method: 'GET',
      url: '/api/documento-electronico/validar-captcha',
      params: {
       privatekey: '6LdkhQITAAAAACvLD7mBQPZew-m6FKJzFBgZYegZ',
       challenge: $scope.documento.captcha.challenge,
       response: $scope.documento.captcha.response
      }
  }).
  success(function(status) {
      $http({
          method: 'GET',
          url: '/api/documento-electronico/obtener-data-documento',
          params: {
              tipo_documento: $scope.documento.codigo.substring(0, 2),
              prefijo_documento: $scope.documento.numero.substring(0, 4),
              numero_documento: $scope.documento.numero.substring(5, 13),
              fecha_emision: $scope.documento.fecha_emision.getFullYear() +
                        ('0' + ($scope.documento.fecha_emision.getMonth() + 1)).substring(('0' + ($scope.documento.fecha_emision.getMonth() + 1)).length - 2) +
                        ('0' + $scope.documento.fecha_emision.getDate()).substring(('0' + $scope.documento.fecha_emision.getDate()).length - 2),
              monto_total: $scope.documento.monto
          }
      }).then(function successCallback(response) {
          $state.go('delectronico.consulta', {
              correlativo : response.data.obtenerDataDocumento.correlativo,
              pdf: response.data.obtenerDataDocumento.pdf,
              xml_envio : response.data.obtenerDataDocumento.xml_envio,
              xml_respuesta : response.data.obtenerDataDocumento.xml_respuesta
          });
          $state.transitionTo('delectronico.consulta', {
              correlativo : response.data.obtenerDataDocumento.correlativo,
              pdf: response.data.obtenerDataDocumento.pdf,
              xml_envio : response.data.obtenerDataDocumento.xml_envio,
              xml_respuesta : response.data.obtenerDataDocumento.xml_respuesta
          });
      }, function errorCallback(response) {
          Recaptcha.reload();
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Alerta')
              .textContent(response.data.error.message)
              .ariaLabel('Alerta')
              .ok('Cerrar')
          );
      });
  }).
  error(function(status) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Alerta')
        .textContent('El captcha ingresado es incorrecto')
        .ariaLabel('Alerta')
        .ok('Cerrar')
    );
  });

    }
})
.controller('DocumentoCtrl', function ($scope, $stateParams, $sce) {
    $scope._base64ToArrayBuffer = function(base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    var file = new Blob([$scope._base64ToArrayBuffer($stateParams.pdf)], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);

    $scope.obtenerXml = function () {
        var blob = new Blob([$stateParams.xml_envio], { type:'text/xml;charset=utf-8;' });
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', window.URL.createObjectURL(blob));
        downloadLink.attr('download', $stateParams.correlativo + '.xml');
        downloadLink[0].click();
    }
})
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  var states = [
    {
        name: 'delectronico',
        url: '/',
        templateUrl: '/documento-electronico/paginas/_formulario.html',
        controller: 'ConsultaCtrl'
    },
    {
        name: 'delectronico.consulta',
        url: '/consulta',
        params: {
            correlativo : {
              value: null
            },
            pdf: {
              value: null
            },
            xml_envio : {
              value: null
            },
            xml_respuesta : {
              value: null
            },
            hiddenParam: 'YES'
        },
        templateUrl: '/documento-electronico/paginas/_documento.html',
        controller: 'DocumentoCtrl'
    }
  ];

  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });

  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})
.config(function (reCAPTCHAProvider) {
     reCAPTCHAProvider.setPublicKey('6LdkhQITAAAAACvLD7mBQPZew-m6FKJzFBgZYegZ');
     reCAPTCHAProvider.setOptions({
         theme: 'clean'
     });
 })
.config(function ($mdDateLocaleProvider) {
    var formatoFecha = 'DD/MM/YYYY';
    $mdDateLocaleProvider.formatDate = function (date) {
        var m = moment(date);
        return (date && m.isValid())? m.format(formatoFecha): '';
        //return dateFilter(date, 'dd/MM/yyyy');
    };
    $mdDateLocaleProvider.parseDate = function (format) {
        var m = moment(format, formatoFecha, true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});
