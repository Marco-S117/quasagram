<template>
  <q-page-container class="bg-grey-1">
    <transition name="banner" mode="out-in">
      <app-banner
        v-if="showBanner"
        :content="bannerData"
        class="banner absolute full-width"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class="q-pa-md "/>
    </transition>
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
    bannerData: {}
  }),
  beforeMount () {
    this.$root.$on('TriggerAppBanner', this.toggleBanner)
  },
  methods: {
    toggleBanner (notification) {
      this.bannerData = notification
      this.showBanner = !this.showBanner
    }
  }
}
</script>

<style lang="scss">
.banner-enter-active,
.banner-leave-active {
  transition: all 0.2s;
}
.banner-enter,
.banner-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(-56px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0px;
}

.banner {
  z-index: 100;
  max-height: 56px;
}
</style>
