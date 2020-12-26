<template>
  <q-item
    :to="{ name: 'Profile' }"
    clickable
    class="fixed"
  >
    <q-item-section avatar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="ellipsis">marco_polino_dev</q-item-label>
      <q-item-label caption>
        Marco Polino
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'AppMiniProfile'

}
</script>

<style lang="scss">
</style>
