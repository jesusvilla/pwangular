import 'moment'
import swal from 'sweetalert2'
import generarInputF from './generarInput'

/* @ngInject */
export default function ctrl ($scope, $state, sieLogin, $rootScope, sieModal, $translate, sieStorage, $timeout,
    sieAjax, LoopBackAuth, sieMenu, $mdSidenav, sieColor, Sistemasweb,
    $sce, Menuaccesos, sieInfo, Ano, $mdToast, Menu, Usualert, $filter, Msgalert, $q, $interval, $window, Configuracion,
    Familia) {
  var $this = this
  $this.isHouse = false
    /** Notificaciones**/
  Configuracion.obtConfig({parametros: ['G_HOUSE', '']}, function (res) {
    if (res.json.G_HOUSE && $sieInfo.esFamilia) {
      Familia.obtHouseFamilia(function (resu) {
        $this.isHouse = true
        $this.dataHouse = resu.json
      })
    }
  })
  var namespace = 'notificaciones'
  var url = host.webhost
  var dominio = url.substring(url.indexOf('://') + 3, url.indexOf('.'))

  var $info = sieInfo.getInfo()
    /* if ((url.indexOf('sieweb') + 1)) {

      $scope.nsp = io($info.url + "/" + dominio + "/" + namespace);
      $scope.nsp.emit('auth', $info.token);
      $scope.nsp.on('auth', function (res) {
        console.log(res, 'autt');
      });

      $scope.nsp.on('disconnect', function () {
        window.setTimeout(function () {//pongo window por que me llega al pincho
          $scope.nsp.emit('auth', $info.token);
        }, 3000);
      });

      $scope.nsp.on('nuevoMensaje', function (mensaje) {
        $scope.$apply(function () {
          $scope.mostrarMensaje('tieneNuevoMensaje');
        });
      });
    } */

    /** Fin-Notificaciones**/

  var $sieInfo = sieInfo.getInfo()
  var tam
  var tamAct = 0
  var preAccesos
  $this.infoUsuario = {
    usucod: $sieInfo.usucod,
    nombre: $sieInfo.nombre,
    tipnom: $sieInfo.tipnom
  }
  $this.esAdministrador = !!$sieInfo.esAdministrador
  $scope.codigoCol = $sieInfo.colcod
  $this.mensaje = 'Esta es la nueva intranet'
  $scope.estadoMenu = 0
  $scope.verPerfil = false
  $scope.menu = sieMenu
  $rootScope.temaPrincipal = 'default'

  var modal = new sieModal()
  var msjAlpha = 'Sólo debe contener caracteres A-Z 0-9'
  var msjCompara = 'Deben coincidir las contraseñas'
  var msjCambio = 'Debe cambiar la contraseña'
  var regexAlpha = $rootScope.exprRegulares.letrasAlfanumerico
  var longitudMaxima = 12

  Sistemasweb.obtPermisoPerfil(function (res) {
    var permisoDato = res.json.length
    if (permisoDato > 0) {
      $scope.verPerfil = true
    }
  })

  var generarInput = function (nombre, label, compara) {
    return generarInputF({nombre, label, compara, regexAlpha, msjAlpha, msjCompara, longitudMaxima})
  }

  var existeContrasena = !!$state.get('intranet.seguridadContrasena')
  $this.existeContrasena = existeContrasena
  var existeAlerta = !!$state.get('intranet.alertas')
  $this.existeAlerta = existeAlerta
  var existePerfil
  if (sieInfo.getInfo().esFamilia) {
    existePerfil = !!$state.get('intranet.datosFamilia')
  } else if (sieInfo.getInfo().esEstudiante) {
    existePerfil = !!$state.get('intranet.datosEstudiante')
  } else {
    existePerfil = !!$state.get('intranet.perfilUsuario')
  }

  $this.existePerfil = function () {
    return existePerfil
      /* console.log(!!$state.get("intranet.datosFamilia"),"familia");
       console.log(!!$state.get("intranet.datosEstudiante"),"alumno");
       console.log(!!$state.get("intranet.perfilUsuario"),'otros');

       if ($sieInfo.esFamilia) {
       return !!$state.get("intranet.datosFamilia")
       } else if ($sieInfo.esEstudiante) {
       return !!$state.get("intranet.datosEstudiante")
       } else {
       return !!$state.get("intranet.perfilUsuario")
       } */
  }

  var cambiarContrasena = function (prevenirCierre) {
    var html = '<div class="bg-gray-light">' +
          '<div class="p-n-b-10">' +
          generarInput('cactual', 'usuario.contraactual') +
          '</div>' +
          '<div class="flex-100 b-t-gray"></div>' +
          '<div class="p-10">' +
          generarInput('cnueva', 'usuario.nuevacontra', 'crepetida') +
          generarInput('crepetida', 'usuario.repetircontra', 'cnueva') +
          '</div>' +
          '</div>'
    var config = {
      titulo: '{{"usuario.titulopass" | translate}}',
      html: html,
      htmlInicial: '<form name="formCambiar" class="flex layout-column" ng-submit="cambiar(formCambiar)" novalidate>',
      htmlFinal: '</form>',
      htmlBotones: '<div class="flex-100 layout-row layout-wrap layout-align-center-center">' +
            '<md-button type="submit" class="md-accent md-raised" ng-class="carga">{{"botones.guardar" | translate}}</md-button>' +
            '</div>',
      isBtnOk: false,
      isBtnCancelar: false,
      estilo: {'width': '300px'},
      controlador: function (scope) {
        scope.formulario = {}
        scope.carga = null
        scope.cambiar = function (formulario) {
          var trad = 'mensajes.'
          if (formulario.$valid) {
            var regAlpha = new RegExp(regexAlpha)
            var validacionAlpha = true

            var cactual = scope.formulario.cactual
            var cnueva = scope.formulario.cnueva
            var crepetida = scope.formulario.crepetida

            angular.forEach(scope.formulario, function (v) {
              validacionAlpha = regAlpha.test(v) && validacionAlpha
            })
            if (validacionAlpha) {
                // Bien, sólo caracteres A-Z 0-9
              if (cnueva === crepetida) {
                if (prevenirCierre && cnueva === cactual) {
                  $translate('aviso').then(function (t) {
                    swal(t, msjCambio, 'warning')
                  })
                  return false
                }

                  // Bien, los pass coinciden
                if (!scope.carga) { // Para que no se envie por cada vez que de click sobre el botón;
                  scope.carga = 'md-button-loading'
                  sieLogin.cambiarContrasena(cactual, cnueva).then(function (res) {
                    scope.carga = null
                    if (res.bien) {
                      if (prevenirCierre) {
                        sieInfo.setCambiar(false)
                        var infoUsuario = {user: $sieInfo.usucod, pass: cnueva}
                        $rootScope.siemenu = null
                        $rootScope.colegio = null
                        sieLogin.login(infoUsuario).then(function () {
                          location.reload()
                        })
                        return false
                      }
                      var aviso = trad + 'm0001'
                      var titulo = trad + 'm0013'
                      $translate([titulo, aviso]).then(function (t) {
                        swal(t[titulo], t[aviso], 'success')
                        scope.$parent.cerrar()
                      })
                    } else {
                      var aviso = trad + res.mal
                      $translate([aviso, 'aviso']).then(function (t) {
                        swal(t.aviso, t[aviso], 'warning')
                      })
                    }
                  }).catch(function (res) {
                    scope.carga = null
                  })
                }
              } else {
                $translate('aviso').then(function (t) {
                  swal(t, msjCompara, 'warning')
                })
              }
            } else {
              $translate('aviso').then(function (t) {
                swal(t, msjAlpha, 'warning')
              })
            }
          } else {
            var aviso = trad + 'e0007'
            $translate([aviso, 'aviso']).then(function (t) {
              swal(t.aviso, t[aviso], 'warning')
            })
          }
        }
      }
    }
    if (prevenirCierre) {
      config.isCerrar = false
      config.isBackdrop = false
    }
    return modal.abrir(config)
  }

  $this.cambiarContrasena = function () {
    if (!existeContrasena) {
      return false
    }
    cambiarContrasena()
  }

  if ($sieInfo.cambiar) {
    cambiarContrasena(true)
  }

  $this.mostrarMenu = function (modal, event) {
    modal(event)
  }

  $this.cambiarTamano = function (ev) {
    $scope.isMenu = !$scope.isMenu
    ev.stopPropagation()
  }

  $this.verPerfil = function () {
    if (sieInfo.getInfo().esOtros) {
      $state.go('intranet.perfilUsuario')
    } else if (sieInfo.getInfo().esEstudiante) {
      $state.go('intranet.datosEstudiante')
    } else {
      $state.go('intranet.datosFamilia')
    }
  }

  $scope.onClickMenu = function () {
    $mdSidenav('left').toggle()
  }

  $scope.togglemenu = function () {
    $scope.estadoMenu = !$scope.estadoMenu
  }

  $this.salir = function () {
    sieLogin.salir()
  }
  $this.configurarAlertas = function () {
    if (existeAlerta) {
      var modalOptions = {
        isBotones: false,
        titulo: '<h3 class="c-white">{{"botones.configurar"|translate}}<h3>',
        html: 'views/intranet/alertas/index.html',
        estilo: {width: '400px'},
        controlador: function (scope) {
          scope.configuracionIncial = {}
          scope.esFamilia = $sieInfo.esFamilia
          function cargaAlerta (campos) {
            Usualert.obtConfiguracionAlertas({usucod: $sieInfo.usucod, campos: campos}, function (res) {
              res.json.forEach(function (v) {
                for (var k in v) {
                  if (v.hasOwnProperty(k) && ['SISCOD', 'SISCOD', 'TIPCOD', 'USUCOD', 'TIPO', 'UNICO'].indexOf(k) < 0) {
                    if (!scope.configuracionIncial[k]) {
                      scope.configuracionIncial[k] = {}
                      switch (k) {
                        case 'MENSAJES':
                          scope.configuracionIncial[k].TITULO = 'muro.tabs.mensajes'
                          break
                        case 'CIRCULARES':
                          scope.configuracionIncial[k].TITULO = 'muro.tabs.boletin'
                          break
                        case 'TAREAS':
                          scope.configuracionIncial[k].TITULO = 'muro.tabs.contenidos'
                          break
                        case 'ATENCION':
                          scope.configuracionIncial[k].TITULO = 'atencion'
                          break
                      }
                      scope.configuracionIncial[k][v.TIPO] = v[k]
                    } else {
                      scope.configuracionIncial[k][v.TIPO] = v[k]
                    }
                  }
                }
              })
              Object.size = function (obj) {
                var size = 0, key
                for (key in obj) {
                  if (obj.hasOwnProperty(key)) { size++ }
                }
                return size
              }
              scope.size = Object.size(scope.configuracionIncial)
              console.log(scope.size)
            })
          }
          var campos = ['SISCOD', 'TIPCOD', 'USUCOD', 'TIPO']
          var parametros = {usucod: $sieInfo.usucod}
          $q.all([
            Sistemasweb.obtEstadoSistemas({sistemas: ['05']}).$promise,
            Msgalert.obtContenidoMensaje().$promise
          ]).then(function (res) {
            res[1].json.forEach(function (v) {
              if (v.HABILITADO === 1) {
                switch (v.TIPO) {
                  case 'atencion':
                    if (res[0].json[0].EST === '1' && $sieInfo.esFamilia) {
                      campos.push('ATENCION')
                    }
                    break
                  case 'tareas':
                    if ($sieInfo.esEstudiante || $sieInfo.esFamilia) {
                      campos.push(v.TIPO.toUpperCase())
                    }
                    break
                  default:
                    campos.push(v.TIPO.toUpperCase())
                    break

                }
              }
            })
            cargaAlerta(campos)
          })

          if (scope.esFamilia) {
            parametros.campos = campos
          }

          scope.grabaInformacion = function () {
            function preparayGraba (datos) {
              console.log(datos)
              datos.forEach(function (v) {
                if (v.TIPCOD === '004') {
                  switch (v.TIPO) {
                    case 'A':
                      v.MSNAPO = v.MENSAJES
                      v.TAREAAPO = v.TAREAS
                      v.CIRAPO = v.CIRCULARES
                      v.ATENAPO = v.ATENCION
                      v.INCIDENAPO = v.INCIDENCIAS
                      break
                    case 'P':
                      v.MSNPAD = v.MENSAJES
                      v.TAREAPAD = v.TAREAS
                      v.CIRPAD = v.CIRCULARES
                      v.INCIDENPAD = v.INCIDENCIAS
                      break
                    case 'M':
                      v.MSNMAD = v.MENSAJES
                      v.TAREAMAD = v.TAREAS
                      v.CIRMAD = v.CIRCULARES
                      v.ATENMAD = v.ATENCION
                      v.INCIDENMAD = v.INCIDENCIAS
                      break
                  }
                  v.MENSAJES = ''
                  v.CIRCULARES = ''
                  v.TAREAS = ''
                  v.ATENCION = ''
                  v.INCIDENCIAS = ''
                }
                v.USUNOM = ''
                v.USUNOMO = ''
                v.TIPNOM = ''
                v.TIPO = ''
                v.INSTRUCOD = ''
                v.GRADOCOD = ''
                v.SECCIONCOD = ''
                v.UNICO = ''
              })
              Usualert.grabaAlertas({data: datos}, function (res) {
                $scope.mostrarMensaje('mensajes.' + res.json.mensaje)
                modal.cerrar()
              })
            }

            var dataG = []
            var preData = {}
            for (var k in scope.configuracionIncial) {
              for (var k1 in scope.configuracionIncial[k]) {
                if (!preData[k1]) {
                  preData[k1] = {}
                  preData[k1][k] = scope.configuracionIncial[k][k1]
                } else {
                  preData[k1][k] = scope.configuracionIncial[k][k1]
                }
              }
            }
            for (var k in preData) {
              preData[k].USUCOD = $sieInfo.usucod
              preData[k].TIPCOD = $sieInfo.tipcod
              preData[k].SISCOD = $sieInfo.siscod
              preData[k].TIPO = k
              if (k !== 'TITULO') {
                dataG.push(preData[k])
              }
            }
            preparayGraba(dataG)

              // var datos = $filter('copiar')(scope.configuracionIncial);
              /**/
          }
        }
      }
      modal.abrir(modalOptions)
    } else {
      swal('Hey!!!', 'No seas Culebra... eso no se hace', 'warning')
    }

      /* $scope.esFamilia=$sieInfo.esFamilia;
       $scope.esAlumno=$sieInfo.esEstudiante;
       $scope.esPersonal=$sieInfo.esOtros;
       $state.go("intranet.alertas") */
      /* <div class='sietabla'><table><thead>
       <tr class='bg-accent'><th>Nombres</th>
       <th>{{'muro.tabs.mensajes'|translate}}</th>
       <th>{{'muro.tabs.boletin'|translate}}</th>
       <th>{{'muro.tabs.contenidos'|translate}}</th>
       <th>{{'atencion'|translate}}</th>
       </tr></thead><tbody>
       <tr ng-repeat="config in configuracionIncial">
       <td>{{config.USUNOM}}</td>
       <td><md-checkbox ng-model="config.MENSAJES" aria-label="Checkbox Indeterminate" ng-true-value="'S'" ng-false-value="'N'"></md-checkbox></td>
       <td><md-checkbox ng-model="config.CIRCULARES" aria-label="Checkbox Indeterminate" ng-true-value="'S'" ng-false-value="'N'"></md-checkbox></td>
       <td><md-checkbox ng-model="config.TAREAS" aria-label="Checkbox Indeterminate" ng-true-value="'S'" ng-false-value="'N'"></md-checkbox></td>
       <td><md-checkbox ng-model="config.ATENCION" aria-label="Checkbox Indeterminate" ng-true-value="'S'" ng-false-value="'N'"></md-checkbox></td>
       </tr></tbody></table></div>
       <md-button class='md-raised md-accent' ng-click='grabaInformacion()'>{{"botones.guardar"|translate}}</md-button> */
  }
  $this.fullscreen = false

  $this.toggleFullScreen = function () {
    $this.fullscreen = !$this.fullscreen
      /* if (Fullscreen.isEnabled()) {
       Fullscreen.cancel();
       } else {
       Fullscreen.all();
       } */
  }

  $this.carousel = [
      {'titulo': 'inicio_escolar', 'img': 'img/inicio_escolar.jpg'},
      {'titulo': 'matricula', 'img': 'img/matricula.jpg'},
      {'titulo': 'cierre_escolar', 'img': 'img/cierre_escolar.jpg'}
  ]

  Ano.obtAnos(function (res) {
    $this.anios = res.json
    $rootScope.listaAnos = res.json
    $timeout(function () {
      $this.anio = $sieInfo.ano
    })
  })

  $scope.mostrarMensaje = function (palabra, err) {
    $translate(palabra).then(function (traduccion) {
      var color = 'bg-accent'
      if (err && typeof err === 'boolean') {
        color = 'bg-warn'
      }
      $mdToast.show({
        hideDelay: 3000,
        position: 'top right',
        template: '<md-toast>' +
              '<span class="md-toast-content ' + color + '"  flex>' +
              '<p >' + traduccion + '</p>' +
              '</span>' +
              '</md-toast>'
      })
    })
  }

  var resetAll = function (res) {
    var infoColegio = res.infoColegio
    var token = res.token

    angular.forEach(infoColegio, function (v, k) {
      sieStorage.store.colegio[k] = v
      $rootScope.colegio[k] = v
    })
    sieStorage.store.token = token
    $rootScope.token = token

    LoopBackAuth.setUser(token, 1, {})
    LoopBackAuth.rememberMe = window.localStorage.getItem('isStore') === 'false'
    LoopBackAuth.save()
  }

  $this.cambiarAnio = function (valor) {
    sieAjax.post('/HyoAnos/cambiarAno', {'ano': valor}).then(function (res) {
      resetAll(res)
      $rootScope.listaAlumnos = undefined
      $rootScope.listaAulas = undefined
      console.log('Año cambiado')
      $state.go('intranet.sieauxiliar', {destino: $state.current.name})
    })
  }

  var tiempoToken = 1000 * 60 * 10// 10 minutos
  $interval(function () {
    sieAjax.post('/login/refreshToken').then(function (res) {
      resetAll(res)
        // console.log('Token actualizado');
    })
  }, tiempoToken)

  $scope.$watch('color', function (v) {
    if (v) {
      var tema = sieColor.generarTema(v)
      sieColor.setTema(tema)
    }
  })

  var baseURL = location.protocol + '//' + location.hostname
  Sistemasweb.obtListaSistemas({actual: '21'}, function (res) {
    res.json.forEach(function (v) {
      v.url = $sce.trustAsResourceUrl(baseURL + '/' + v.MODULO + '/login')
    })
    $this.listaModulos = res.json
  })

  $this.abrirModuloSieWeb = function (modulo) {
//            localStorage.clear()
    window.name = 'SieVentana'
      // window.open('', 'SieVentana');
    document.getElementById('Formulario' + modulo.SISCOD).submit()
  }
  if ($sieInfo.esAdministrador) {
    Menu.obtListaMenuTodos(function (res) {
      if (res.json[0]) {
        $scope.listaMenusFamilia = res.json[0] // 004
      }
      if (res.json[1]) {
        $scope.listaMenusAlumno = res.json[1] // 005
      }
      if (res.json[2]) {
        $scope.listaMenusOtros = res.json[2] // otros
      }
    })
  }
  function generarAccesos (preAccesos) {
    var listaAccesos = []
    var menusAdicionales = []
    for (var i = 0; i < tam; i++) {
      if (preAccesos && preAccesos[i]) {
        listaAccesos.push(preAccesos[i])
      }
    }
    if (preAccesos && preAccesos.length > tam) {
      for (var i = tam; i < preAccesos.length; i++) {
        menusAdicionales.push(preAccesos[i])
      }
    }
    var menusActuales = JSON.parse(localStorage['ngStorage-siemenu']).intranet
    var menuTop = []

    menusActuales.forEach(function (v1) {
      listaAccesos.forEach(function (v2) {
        if (v1.menucod === v2.MENUCOD || v2.MENUCOD === '000000000') {
          menuTop.push(v2)
        }
      })
    })
    function colorLetra (v) {
      var color = tinycolor(v.COLOR)
      var textColor
      var isLight = color.isLight()
      var isDark = color.isDark()
      if (v.COLOR === null || isLight) {
        textColor = '#484848'
      }
      if (v.COLOR != null && isDark) {
        textColor = '#fff'
      }
        /* if (v.TITULO === "Registro") {
         if ($scope.codigoCol === '0242') {
         menus[j].TITULO = "Actualización de datos"
         } else {
         menus[j].TITULO = "Matrícula"
         }
         } */
      v.TEXTCOLOR = textColor
      j++
    }
    if (listaAccesos) {
      var menus = listaAccesos
      var j = 0
      listaAccesos.forEach(colorLetra)
        // listaAccesos = menus
      $scope.listaMenus = listaAccesos
    }
    if (menusAdicionales) {
      var menus = menusAdicionales
      var j = 0
      menusAdicionales.forEach(colorLetra)
        // menusAdicionales = menus;
      $scope.menusAdicionales = menusAdicionales
    }
  }
  function cargarListaAccesos () {
    Menuaccesos.obtListaAccesos(function (res) {
      $scope.listaAccesosFamilia = res.json['004']
      $scope.listaAccesosAlumno = res.json['005']
      $scope.listaAccesosOtros = res.json['otros']
      var tipcod = $sieInfo.tipcod
      preAccesos = res.json[tipcod] || res.json['otros']
      generarAccesos(preAccesos)
    })
    Menuaccesos.obtMenus(function (res) {
      $scope.listaAcFamilia = res.json['004']
      $scope.listaAcAlumno = res.json['005']
      $scope.listaAcOtros = res.json['otros']
    })
  }
  $this.irEstado = function (menu) {
    if (menu.ICONO && $state.get(menu.URL)) { // va a un estado
      $state.go(menu.URL)
    } else { // sino va a una url
      var link = document.createElement('a')
      if ($state.get(menu.URL)) {
        $state.go(menu.URL)
        return
      }
      if (menu.URL.substring(0, 3) !== ('htt' || 'www' || 'ftp')) {
        menu.URL = 'http://' + menu.URL
      }
      link.href = menu.URL
      link.target = '_blank'
      var clickEvent = document.createEvent('MouseEvent')
      clickEvent.initEvent('click', true, true)
      link.dispatchEvent(clickEvent)
    }
  }
  $this.abrirModalAccesosDirectos = function () {
    var opcionesModal = {
      titulo: '{{"accesodirecto.boton" | translate}}',
      html: 'views/partials/modalIntranet/configurarAccesos.html',
      isBtnOk: false,
      isBtnCancelar: false,
      htmlBotones: '<md-button ng-click="guardarListaAccesos()" class="md-raised md-accent">{{"botones.guardar"|translate}}</md-button>',
      estilo: {'width': '800px'},
      controlador: function (scope) {
        scope.formUrl = {}
        var datosTabla = {}
        var MENUCOD_URL = 1
        var PREFIJO_URL = 'U'
        var ICONO_URL = 'link'
        scope.editable = true
        scope.indicesTabs = [
          'Familia',
          'Alumno',
          'Otros'
        ]
        scope.formularios = {}

        function obtMenuCodUrl () {
          MENUCOD_URL++
          return PREFIJO_URL + MENUCOD_URL
        }
        scope.listaMenus = {}
        scope.listaMenus.Familia = angular.copy($scope.listaMenusFamilia)
        scope.listaMenus.Alumno = angular.copy($scope.listaMenusAlumno)
        scope.listaMenus.Otros = angular.copy($scope.listaMenusOtros)

        scope.listaAccesosFamilia = angular.copy($scope.listaAccesosFamilia)
        scope.listaAccesosAlumno = angular.copy($scope.listaAccesosAlumno)
        scope.listaAccesosOtros = angular.copy($scope.listaAccesosOtros)

        scope.antListaMenus = {}
        if ($scope.listaAcFamilia) {
          scope.antListaMenus.Familia = angular.copy($scope.listaAcFamilia)
        } else {
          scope.antListaMenus.Familia = angular.copy([])
        }
        if ($scope.listaAcAlumno) {
          scope.antListaMenus.Alumno = angular.copy($scope.listaAcAlumno)
        } else {
          scope.antListaMenus.Alumno = angular.copy([])
        }
        if ($scope.listaAcOtros) {
          scope.antListaMenus.Otros = angular.copy($scope.listaAcOtros)
        } else {
          scope.antListaMenus.Otros = angular.copy([])
        }

        scope['arrListaMenus'] = {}

        function pushArrListaMenus (v, key) {
            /* if ($scope.codigoCol === '0242') {
             if (v.TITULO === "Registro") {
             v.TITULO = "Actualización de datos"
             }
             } else {
             if (v.TITULO === "Registro") {
             v.TITULO = "Matrícula"
             }
             } */
          scope['arrListaMenus'][key].push(v)
        }

        function eliminarUrl (obj) {
            // console.log(obj)
          var indiceTab = obj.INDICE_TAB.trim()
          scope.agregarLista(obj, indiceTab)
          scope.tablaConfiguracion[indiceTab].datos.splice(obj.$index, 1)
        }
        scope.nuevaUrl = {}
        scope['tablaConfiguracion'] = {}

        function crearTablasConfiguracion (key) {
          scope['tablaConfiguracion'][key] = {
            titulos: [
                {campo: 'TITULO', translate: 'opciones.n'},
                {campo: 'URL', translate: 'enlace'},
              {
                icono: 'delete',
                translate: 'botones.eliminar',
                clase: 'text-right',
                funcion: eliminarUrl
              }
            ],
            filas: 10,
            busqueda: false
          }
        }

        function crearListaAccesos (key) {
          if (scope['listaAccesos' + key]) {
            scope['listaAccesos' + key].forEach(function (v) {
              if (v.MENUCOD === '000000000') {
                v.esUrl = true
                v.MENUCOD = obtMenuCodUrl()
                v.ICONO = ICONO_URL
                datosTabla[key].push(v)
                pushArrListaMenus(v, key)
                return
              } else {
                pushArrListaMenus(v, key)
              }

              scope.listaMenus[key].forEach(function (v2) {
                if (v.URL === v2.uisref) {
                  v2.checked = true
                }
                if (v2.submenu) {
                  v2.submenu.forEach(function (v3) {
                    if (v3.uisref === v.URL) {
                      v3.checked = true
                      v2.abierto = true
                    }
                  })
                }
              })
            })
          }
        }
        scope.urlForm = {}
        scope.indicesTabs.forEach(function (indiceTab) {
          scope['arrListaMenus'][indiceTab] = []
            // scope['listaAccesos'][key] = [];
          datosTabla[indiceTab] = []
          crearTablasConfiguracion(indiceTab)
          crearListaAccesos(indiceTab)
          scope['tablaConfiguracion'][indiceTab].datos = datosTabla[indiceTab]
        })

        scope.agregarLista = function (menu, indiceTab) {
          var obj = {
            MENUCOD: menu.menucod || menu.MENUCOD,
            TITULO: menu.titulo || menu.TITULO,
            ICONO: menu.icon || menu.ICONO
          }
          var obj2 = {
            MENUCOD: menu.menucod,
            TITULO: menu.titulo,
            ICONO: menu.icon
          }

          var indice = -1

          scope['arrListaMenus'][indiceTab].forEach(function (v, k) {
            if (v.MENUCOD === obj.MENUCOD) {
              indice = k
            }
          })

          if (scope.antListaMenus[indiceTab]) {
            scope.antListaMenus[indiceTab].forEach(function (v, k) {
              if (v.MENUCOD === obj2.MENUCOD) {
                indice = k
              }
            })
          }

          if (indice >= 0) {
            scope['arrListaMenus'][indiceTab].splice(indice, 1)
            scope.antListaMenus[indiceTab].splice(indice, 1)
          } else {
            pushArrListaMenus(obj, indiceTab)
            scope.antListaMenus[indiceTab].push(obj2)
          }
        }

        scope.agregarUrl = function (indiceTab) {
          var obj = {
            MENUCOD: obtMenuCodUrl(),
            URL: scope.formUrl[indiceTab].url,
            esUrl: true,
            ICONO: ICONO_URL,
            TITULO: scope.formUrl[indiceTab].descripcion
          }
          var obj2 = {
            MENUCOD: '000000000',
            URL: scope.formUrl[indiceTab].url,
            esUrl: true,
            ICONO: ICONO_URL,
            TITULO: scope.formUrl[indiceTab].descripcion
          }
          scope.cancelarNuevaUrl(indiceTab)
          pushArrListaMenus(obj, indiceTab)
          scope.antListaMenus[indiceTab].push(obj2)
          scope['tablaConfiguracion'][indiceTab].datos.push(obj)
        }

        scope.cancelarNuevaUrl = function (indiceTab) {
          if (scope.formUrl[indiceTab]) {
            delete scope.formUrl[indiceTab].descripcion
            delete scope.formUrl[indiceTab].url
          }
          scope.nuevaUrl[indiceTab] = false
        }

          /***
           * toDo
           * - Aligerar forEach,teminar el proceso cuando entre a la condicion
           */

        scope.guardarListaAccesos = function () {
          scope.accesosMenus = {
            'Familia': [],
            'Alumno': [],
            'Otros': []
          }
          scope.indicesTabs.forEach(function (indice) {
            scope.arrListaMenus[indice].forEach(function (v) {
              scope.antListaMenus[indice].forEach(function (v2) {
                var obj = {}
                var cTitulo
                if (v.MENUCOD === v2.MENUCOD) {
                  if (v.TITULO != v2.TITULO) {
                    if (v.TITULO === '') {
                      cTitulo = null
                    } else {
                      cTitulo = v.TITULO
                    }
                    obj = {
                      MENUCOD: v.MENUCOD,
                      TITULO: cTitulo,
                      COLOR: v.COLOR,
                      ICONO: v.ICONO,
                      TIPCOD: v.TIPCOD
                    }
                    scope.accesosMenus[indice].push(obj)
                  } else {
                    obj = {
                      MENUCOD: v.MENUCOD,
                      TITULO: null,
                      COLOR: v.COLOR,
                      ICONO: v.ICONO,
                      TIPCOD: v.TIPCOD
                    }
                    scope.accesosMenus[indice].push(obj)
                  }
                } else if (v2.MENUCOD === '000000000') {
                  if (v.TITULO === v2.TITULO) {
                    obj = {
                      MENUCOD: v2.MENUCOD,
                      COLOR: v.COLOR,
                      ICONO: v.ICONO,
                      TIPCOD: v.TIPCOD,
                      TITULO: v.TITULO,
                      URL: v.URL,
                      esUrl: v.esUrl
                    }
                    scope.accesosMenus[indice].push(obj)
                  }
                }
              })
            })
          })
          scope.arrListaMenus = scope.accesosMenus
          Menuaccesos.guardarAccesos({menus: scope.arrListaMenus}, function (res) {
            $scope.mostrarMensaje('mensajes.' + res.json)
            cargarListaAccesos()
            modal.cerrar()
          })
        }
      }
    }
    modal.abrir(opcionesModal)
  }
  var setAncho = function () {
    var posicion = sieInfo.getPosicion('principal')
    var width = posicion.bodyX
    var anc = 'xs'
    tam = 2
    if (width > 1920) {
      anc = 'xl'
      tam = 8
    } else if (width > 1280) {
      anc = 'lg'
      tam = 5
    } else if (width > 960) {
      anc = 'md'
      tam = 4
    } else if (width > 600) {
      anc = 'sm'
      tam = 3
    }
    if (tamAct !== anc) {
      if (preAccesos) {
        generarAccesos(preAccesos)
      } else {
        cargarListaAccesos()
      }

      tamAct = anc
    }
  }
  angular.element($window).bind('resize', function () {
    $scope.$apply(setAncho)
  })
  setAncho()
}