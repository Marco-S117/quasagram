<template>
  <q-card
    flat
    bordered
    class="post-card fixed"
  >
    <q-item :to="{ name: 'Profile' }" clickable>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>marco_polino_dev</q-item-label>
        <q-item-label caption>
          Marco Polino
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'AppMiniProfile'

}
</script>

<style lang="scss">
.post-card {
  width: 296px;
}
</style>
