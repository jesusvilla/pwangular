import Chart from 'chart.js'
import angular from 'angular'

/* @ngInject */
export default function controller ($timeout) {
  const $this = this
  $this.abierto = true
  $this.siechart = undefined
  $this.tipos = [
          {label: 'Torta', tipo: 'pie'},
          {label: 'Linea', tipo: 'line'}
  ]
  // http://materialuicolors.co/
  const colores = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b']
  Chart.defaults.global.legend.position = 'bottom'
  // Agregar etiquetas con el valor en cada categoria
  Chart.plugins.register({
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx

      var fontSize = 16 // Chart.defaults.global.defaultFontFamily
      var fontStyle = 'normal'
      var fontFamily = 'Arial' // Chart.defaults.global.defaultFontFamily
      var fontColor = 'rgb(60, 60, 60)'
      var padding = 5

      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = fontColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      chart.data.datasets.forEach(function (dataset, i) {
        var meta = chart.getDatasetMeta(i)
        if (!meta.hidden) {
          meta.data.forEach(function (element, index) {
            var dataString = dataset.data[index].toString()
            var position = element.tooltipPosition()
            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
          })
        }
      })
    }
  })

      // Agregar sombra
  let draw = Chart.controllers.line.prototype.draw
  Chart.controllers.line.prototype.draw = function () {
    draw.apply(this, arguments)
    var ctx = this.chart.chart.ctx
    var _stroke = ctx.stroke
    ctx.stroke = function () {
      ctx.save()
      ctx.shadowColor = '#676767'
      ctx.shadowBlur = 2
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2
      _stroke.apply(this, arguments)
      ctx.restore()
    }
  }
  var configDefault = {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'Serie1',
          data: [300, 50, 100]
                        // borderColor: "#3F51B5",
                        // backgroundColor: "#3F51B5"
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Titulo'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'index',
        intersect: false
      }
    }
  }

  var crearChart = function (config) {
    console.log('Creando Chart')
    return $timeout(function () {
      var siechart = document.getElementById('siechart').getContext('2d')
      var conf = angular.extend({}, configDefault, config)
      $this.siechart = new Chart(siechart, conf)
    })
  }

  var setDatos = function (datos, series, categorias) {
    var tipo = $this.siechart.config.type
    var isArrayColors = ['pie'].indexOf(tipo) + 1
    var isLine = tipo === 'line'
    $this.siechart.data.labels = categorias
    $this.siechart.data.datasets = series.map(function (v, i) {
      var color = colores[i % colores.length]
      if (isArrayColors) {
        color = categorias.map(function (vc, ic) {
          return colores[ic % colores.length]
        })
      }
      return {
        label: v,
        data: datos[i],
        borderColor: isLine ? color : '#ffffff',
        backgroundColor: color,
        fill: !isLine,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHitRadius: 10,
        borderWidth: 4// Ancho de la linea
      }
    })
    $this.siechart.update()
  }

  $this.cambiarTipo = function (tipo) {
    console.log('Cambiando tipo...')
    $this.siechart.config.type = tipo || 'line'
    $this.siechart.update()
  }

  $this.cambiarDatos = function () {
    setDatos([[0, 10, 20], [40, 50, 60]], ['Serie1', 'Serie2'], ['Cat1', 'Cat2', 'Cat3'])
  }

  $this.exportar = function () {
    var link = document.createElement('a')
    link.download = 'Canvas' + new Date().getTime()
    link.href = $this.siechart.toBase64Image()
    var clickEvent = document.createEvent('MouseEvent')
    clickEvent.initEvent('click', true, true)
    link.dispatchEvent(clickEvent)
    console.log($this.siechart)
  }

  $this.$onInit = function () {
    console.log('Se inicia todo')
    crearChart({type: 'bar'})
  }
}