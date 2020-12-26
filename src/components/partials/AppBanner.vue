<template>
  <q-banner
    dense
    class="text-white bg-red text-center"
  >
    {{ message }}
  </q-banner>
</template>

<script>
export default {
  name: 'app-banner',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
