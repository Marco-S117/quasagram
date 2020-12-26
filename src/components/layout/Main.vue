<template>
  <q-page-container class="bg-grey-1">
    <transition name="banner" mode="out-in">
      <app-banner
        v-if="showBanner"
        :message="bannerMessage"
        class="banner absolute full-width"
      />
    </transition>
    <router-view class="q-pa-md "/>
  </q-page-container>
</template>

<script>
import AppBanner from 'components/partials/AppBanner'

export default {
  name: 'app-main',
  components: {
    AppBanner
  },
  data: () => ({
    showBanner: false,
    bannerMessage: ''
  }),
  beforeMount () {
    this.$root.$on('TriggerAppBanner', this.toggleBanner)
  },
  methods: {
    toggleBanner (message) {
      this.bannerMessage = message
      this.showBanner = !this.showBanner
    }
  }
}
</script>

<style lang="scss">
.banner-enter-active,
.banner-leave-active {
  transition: all 0.5s;
}
.banner-enter,
.banner-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(-56px);
}

.banner {
  z-index: 100;
  max-height: 56px;
}
</style>
