<template>
  <q-footer
    bordered
    class="display-sm-screen bg-white text-grey-10"
  >
    <app-pages-tabs class="display-sm-screen" />
  </q-footer>
</template>

<script>
import AppPagesTabs from 'components/partials/AppPagesTabs'

export default {
  name: 'app-footer',
  components: {
    AppPagesTabs
  }
}
</script>

<style>
</style>
