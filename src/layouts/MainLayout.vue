<template>
  <q-layout view="lHh Lpr lFf">
    <app-header class="app-main-container" />
    <app-main class="app-main-container" />
    <app-footer />
  </q-layout>
</template>

<script>
import AppHeader from 'components/layout/Header'
import AppMain from 'components/layout/Main'
import AppFooter from 'components/layout/Footer'

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
}
</script>
