<template>
  <q-banner
    inline-actions
    dense
    :class="`bg-${content.color}`"
    class="text-white"
  >
    <div class="flex items-center">
      <q-icon :name="content.icon" />
      <span class="q-ml-sm">{{ content.msg }}</span>
    </div>
    <template v-slot:action>
      <q-btn
        v-show="content.isInstaller"
        @click="$root.$emit('TriggerAppInstaller')"
        flat
        dense
        color="white"
        icon="eva-checkmark-circle-2-outline"
      />
      <q-btn
        @click="$root.$emit('TriggerAppBanner')"
        flat
        dense
        color="white"
        icon="eva-close"
      />
    </template>
  </q-banner>
</template>

<script>
export default {
  name: 'app-banner',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
