export default function ({nombre, label, compara, regexAlpha, msjAlpha, msjCompara, longitudMaxima}) {
  var resultado = '<md-input-container class="md-block">' +
        '<label>{{"' + label + '"| translate}}</label>' +
        '<input class="ng-success" type="password" ng-model="formulario.' + nombre + '" name="' + nombre + '" maxlength="' + longitudMaxima + '" md-maxlength="' + longitudMaxima + '" ' +
        'ng-pattern="/' + regexAlpha + '/" '
  if (compara) {
    resultado += 'ng-match="formulario.' + compara + '" '
  }
  resultado += 'required>'
  resultado +=
        '<div ng-messages="formCambiar.' + nombre + '.$error">' +
        '<div ng-message="required">{{"validaciones.requerido" | translate}}</div>' +
        '<div ng-message="maxlength">{{"validaciones.maxlength" | translate}}</div>' +
        '<div ng-message="pattern">{{"' + msjAlpha + '" | translate}}</div>' +
        '<div ng-message="match">{{"' + msjCompara + '" | translate}}</div>'
  resultado +=
        '</div>' +
        '</md-input-container>'
  return resultado
}