var fs = require('fs')
function getFiles (dir, states = [], parent) {
  var files = fs.readdirSync(dir)
  for (var i in files) {
    var name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      var nameCurrent = files[i]
      var parentCurrent = ''
      if(parent){
        parentCurrent = parent + '.'
      }
      states.push({
        name: parentCurrent + nameCurrent
      })
      getFiles(name, states, nameCurrent)
    } else {
      //files_.push(name)
    }
  }
  return states
}
var jsonRes = {json: getFiles('./src/states')}
fs.writeFileSync('./src/states.json', JSON.stringify(jsonRes))
console.log('Resultado:',jsonRes)