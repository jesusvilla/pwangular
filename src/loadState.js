function getUrl (s) {
  return s.replace(/\.?([A-Z])/g, function (x, y) { return '-' + y.toLowerCase() }).replace(/\./g, '/')
}
// https://ui-router.github.io/ng1/docs/latest/interfaces/ng1.ng1statedeclaration.html#lazyload

// Mira: https://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs
// https://michalzalecki.com/lazy-load-angularjs-with-webpack/
export default function state (nameState) {
  let parent
  const name = nameState.replace(/(.*)(\.)(.*)$/, '$3')
  if (nameState.indexOf('.') + 1) {
    parent = nameState.replace(/(.*)(\.)(.*)$/, '$1')
  }
  const url = `/${getUrl(nameState)}`
  const templateUrl = `${nameState}.html`
  console.log(name, parent, url)

  return {
    url: `/${name}`,
    name: nameState,
    // parent,
    templateUrl,
    controllerProvider (sieState) {
      return sieState
    },
    resolve: {
      sieState ($q, $templateCache) {
        let deferCtrl = $q.defer()
        const $root = `./states${url}`
        require.ensure([], require => {
          const template = require(`${$root}/index.html`)// import
          const ctrl = require(`${$root}/index.js`)// import
          // $q.when(object or Promise) es equivalente a Promise.resolve(object or Promise)
          /* Promise.resolve(ctrl.default).then(resCtrl => {
            console.log('tipo', resCtrl)
            $templateCache.put(templateUrl, template || '')
            deferCtrl.resolve(resCtrl)
          }) */

          Promise.all([template, ctrl]).then(function ([template, ctrl]) {
            $templateCache.put(templateUrl, template || '')
            deferCtrl.resolve(ctrl.default)
          })

          /* ctrl.then((resCtrl) => {
            $templateCache.put('intranet.html', template)
            deferCtrl.resolve(resCtrl.default)
          }) */
        }, e => {
          console.error('Estado incompleto:', e)
        }, 'estados')
        return deferCtrl.promise
      }
    },
    controllerAs: '$sie'
    /* templateProvider(){
      console.log('templateProvider')
      return import('./states/intranet/index.html')
    },
    /* controllerProvider: ($q) => {
      console.log('controllerProvider')
      let deferCtrl = $q.defer()
      import('./states/intranet').then(ctrl => {
        deferCtrl.resolve(ctrl.default)
      })
      return deferCtrl.promise
    }, */
  }
}