<template>
  <q-layout ref="layout">
    <!-- HEADER -->
    <q-toolbar slot="header">
    <q-btn flat @click="$refs.layout.toggleLeft()">
      <q-icon name="menu" />
    </q-btn>
    <q-toolbar-title>
      Layout Header
      <span slot="subtitle">Optional subtitle</span>
    </q-toolbar-title>
    <q-btn flat @click="$refs.layout.toggleRight()">
      <q-icon name="menu" />
    </q-btn>
  </q-toolbar>
  <!-- HEADER -->

    <div slot="left">
      <!-- navigating to "/twitter" route -->
      <q-item @click="navigate">
        <!-- using it as QItem in this particular example -->
        <q-item-side icon="rss feed" />
        <q-item-main label="Twitter" sublabel="@quasarframework" />
      </q-item>
      <!--
        Works on any DOM element / component.
        In this example we have an icon.
        Make sure you understand the difference between @click and @click.native
      -->
      <q-icon name="rss feed" @click="navigate" />
    </div>
  </q-layout>
</template>
<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QItem,
  QItemSide,
  QItemMain,
  QIcon,
  QBtn
} from 'quasar'
export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QItem,
    QItemSide,
    QItemMain,
    QIcon,
    QBtn
  },
  methods: {
    navigate () {
      this.$refs.layout.hideCurrentSide(() => {
        this.$router.push('/twitter')
      })
    }
  }
}
</script>
