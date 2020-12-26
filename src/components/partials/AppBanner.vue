<template>
  <q-banner
    inline-actions
    dense
    class="text-white bg-red"
  >
    {{ message }}
    <template v-slot:action>
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
  props: ['message']
}
</script>

<style>

</style>
