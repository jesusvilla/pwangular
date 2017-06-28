var fs = require('fs')
var arreglo = []
var dir = './node_modules/angular-material-sass-files/themes'
var files = fs.readdirSync(dir)
let importAll = ''
for(let file of files){
  let name = dir + '/' + file
  let archivo = fs.readFileSync(name, 'utf8')
  let respuesta = archivo.replace(/'{{(.*?)}}'/g, function(v,i){
    let variable = '$'+i.replace(/\./g,'').trim()
    if(arreglo.indexOf(variable) === -1){
      arreglo.push(variable)
    }
    return variable
  }).replace(/\.md-THEME_NAME-theme/g,'')
  importAll += `@import "./${file}"; \n`
  fs.writeFileSync(`./src/themes/${file}`, respuesta)
}
let importVariables = ''
for(let variable of arreglo.sort()){
  importVariables += `${variable}: #1C5792 !default; \n`
}
fs.writeFileSync(`./src/themes/variables.scss`, importVariables)

//Reparar _calendar-theme
//Reparar _datePicker-theme

fs.writeFileSync(`./src/themes/index.scss`, importAll)
console.log('Lista de variables', arreglo)