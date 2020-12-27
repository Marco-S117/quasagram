<template>
  <q-header
    bordered
    class="bg-white text-grey-10"
  >
    <q-toolbar>
      <q-toolbar-title class="app-title text-bold text-grey-10">
        Quasagram
      </q-toolbar-title>
      <app-pages-tabs class="display-lg-screen" />
    </q-toolbar>
  </q-header>
</template>

<script>
import AppPagesTabs from 'components/partials/AppPagesTabs'

export default {
  name: 'app-header',
  components: {
    AppPagesTabs
  }
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 28px;
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
</style>
