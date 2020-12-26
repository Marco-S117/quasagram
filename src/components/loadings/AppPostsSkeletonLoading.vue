<template>
  <div>
    <transition-group
      appear
      name="projects"
      tag="div"
      :style="{
        '--total': 2
      }"
    >
      <q-card
        v-for="(card, index) in 2"
        :key="`key-${index}`"
        :style="{'--i': index}"
        flat
        bordered
        class="fullwidth q-mb-md"
      >
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" animation="fade" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-skeleton height="200px" square animation="fade" />
        <q-item>
          <q-item-section>
            <q-item-label caption>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </transition-group>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.projects-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  transition-delay: calc( 0.2s * (var(--total) - var(--i)) );
}

.projects-enter-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  transition-delay: calc( 0.2s * var(--i) );
}

.projects-enter,
.projects-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
