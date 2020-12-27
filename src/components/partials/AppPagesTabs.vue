<template>
  <q-tabs
    active-color="primary"
    indicator-color="transparent"
    class="bg-white"
  >
    <q-route-tab
      v-for="(page, index) in AppPages"
      :key="index"
      :to="{ name: page.name}"
      :icon="page.icon"
      :name="page.name"
      exact
      content-class="icon"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'app-pages-tabs',
  computed: {
    AppPages () {
      if (this.$q.screen.sm || this.$q.screen.xs) {
        return this.$router.options.routes[0].children
      } else {
        return this.$router.options.routes[0].children.filter(route => route.name !== 'Profile')
      }
    }
  }
}
</script>

<style lang="scss">
.icon i {
  font-size: 28px;
}
</style>
