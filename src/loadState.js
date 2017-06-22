function getUrl (s) {
  return s.replace(/\.?([A-Z])/g, function (x, y) { return '-' + y.toLowerCase() }).replace(/\./g, '/')
}
// https://ui-router.github.io/ng1/docs/latest/interfaces/ng1.ng1statedeclaration.html#lazyload

// Mira: https://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs
// https://michalzalecki.com/lazy-load-angularjs-with-webpack/
export default function state (name) {
  const url = `/${getUrl(name)}`
  return {
    url: url,
    name: name,
    templateUrl: `${name}.html`,
    controllerProvider (sieState) {
      return sieState
    },
    resolve: {
      sieState ($q, $templateCache) {
        let deferCtrl = $q.defer()
        require.ensure([], (r) => {
          const template = require('./states/intranet/index.html')
          const ctrl = require('./states/intranet')
          $templateCache.put('intranet.html', template)
          deferCtrl.resolve(ctrl.default)
        })
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