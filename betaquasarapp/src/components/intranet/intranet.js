import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QBtn,
  QIcon,
  QScrollArea,
  QItemSeparator,
  QCarousel,
  QSelect
} from 'quasar'

import { VueEditor } from 'vue2-editor'
const apiAno = {
  obtAnos: {method: 'GET', url: 'HyoAnos/obtAnos{?id,otro}'}
}
const apiEscudo = {
  obtEscudo: {method: 'GET', url: 'HyoEscudo/obtEscudo{?tipo}'}
}

export default {
  components: {
    VueEditor,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QBtn,
    QIcon,
    QScrollArea,
    QItemSeparator,
    QCarousel,
    QSelect
  },
  data () {
    return {
      saludo: 'Nueva Intranet',
      view: 'lHh Lpr lFf',
      reveal: false,
      leftScroll: true,
      rightScroll: true,
      leftBreakpoint: 996,
      rightBreakpoint: 1200,
      hideTabs: false,
      menu: [],
      ano: null,
      jsonAnos: []
    }
  },
  computed: {
    arrAnos () {
      return this.jsonAnos.map(v => {
        return {value: v['ANO'], label: v['ANO']}
      })
    }
  },
  methods: {
    getMenu () {
      this.menu = [{url: ''}, {url: ''}]
      console.log('getMenu')
    },
    getAnos () {
      const Ano = this.$resource('', {}, apiAno)
      const Escudo = this.$resource('', {}, apiEscudo)
      Ano.obtAnos({id: 'ide', otro: 'Mira'}).then(res => {
        this.jsonAnos = res.data.json
        this.ano = '2015'
      })
      Escudo.obtEscudo().then(res => {
        console.log(res.data)
      })
    }
  },
  created () {
    this.getAnos()
  }
}
