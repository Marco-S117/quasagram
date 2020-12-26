<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>marco_polino_dev</q-item-label>
        <q-item-label caption>
          {{ data.location }}
        </q-item-label>
      </q-item-section>
      <q-item-section class="text-right">
        <q-item-label caption>
          {{ data.created_at | postCreatedTime }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-img
      :src="data.imgUrl"
      :placeholder-src="data.imgUrl"
      transition="fade-transition"
      :ratio="16/9"
      spinner-color="grey-10"
      spinner-size="42px"
    />
    <q-separator />
    <q-card-section horizontal>
      <q-card-section class="q-py-sm">
        <q-icon name="eva-heart-outline" size="30px" />
      </q-card-section>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section class="q-py-sm">
        {{ data.caption }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'AppPostCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  filters: {
    postCreatedTime (timeStamp) {
      // TO DO:
      //  - Time difference by now, ex: 17 mins ago | 2 days ago ext...
      return date.formatDate(timeStamp, 'HH:mm:ss')
    }
  }
}
</script>

<style>
</style>
