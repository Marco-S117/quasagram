<template>
  <q-banner
    inline-actions
    dense
    class="bg-primary text-white"
  >
    <div class="text-bold">
      <span class="q-ml-sm">Install the site as App?</span>
    </div>
    <template v-slot:action>
      <q-btn
        @click="$root.$emit('TriggerAppInstallerBanner', 'yes')"
        flat
        dense
        color="white"
        icon="eva-checkmark-circle-2-outline"
      />
      <q-btn
        @click="$root.$emit('TriggerAppInstallerBanner', 'later')"
        flat
        dense
        color="white"
        icon="eva-clock-outline"
      />
      <q-btn
        @click="$root.$emit('TriggerAppInstallerBanner', 'never')"
        flat
        dense
        color="white"
        icon="eva-close-circle-outline"
      />
    </template>
  </q-banner>
</template>

<script>
export default {
  name: 'app-banner'
}
</script>

<style>

</style>
