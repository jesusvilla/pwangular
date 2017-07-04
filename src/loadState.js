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
    controllerProvider: ['sieState', function (sieState) {
      return sieState
    }],
    resolve: {
      sieState: ['$templateCache', function ($templateCache) {
        return new Promise(resolve => {
          import(`./states${url}/index.js`).then(res => {
            const {template, ctrl} = res.default
            $templateCache.put(templateUrl, template)
            resolve(ctrl)
          })
        })
      }]
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