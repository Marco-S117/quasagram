<template>
  <q-page-container class="bg-grey-1">
    <transition name="banner" mode="out-in">
      <app-banner
        v-if="showBanner"
        class="banner fixed"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class="q-pa-md "/>
    </transition>
  </q-page-container>
</template>

<script>
import AppBanner from 'components/partials/AppBanner'

let deferredPrompt

export default {
  name: 'app-main',
  components: {
    AppBanner
  },
  data: () => ({
    showBanner: false
  }),
  beforeMount () {
    this.$root.$on('TriggerAppInstallerBanner', this.appInstaller)
  },
  mounted () {
    let neverShowInstallBanner = this.$q.localStorage.getItem('neverShowInstallBanner')

    if (!neverShowInstallBanner) {
      this.addInstallEventListener()
    }
  },
  methods: {
    addInstallEventListener () {
      window.addEventListener('beforeinstallprompt', (e) => {
        this.showBanner = true
        e.preventDefault()
        deferredPrompt = e
      })
    },
    appInstaller (choice) {
      this.showBanner = false
      if (choice === 'yes') this.installAppNow()
      else if (choice === 'later') this.installAppLater()
      else this.installAppNever()
    },
    installAppNow () {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') this.installAppNever()
        else this.installAppLater()
      })
    },
    installAppLater () {
      this.$q.localStorage.set('neverShowInstallBanner', false)
    },
    installAppNever () {
      this.$q.localStorage.set('neverShowInstallBanner', true)
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
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.banner {
  z-index: 100;
  width: 100%;
  max-width: 975px;
}
</style>
