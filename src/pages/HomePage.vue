<template>
  <q-page>
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <post-card
          v-for="post in posts"
          :key="post.id"
          :data="post"
          class="q-mb-md"
        />
      </div>
      <div class="display-lg-screen col-4">
        <mini-profile />
      </div>
    </div>
  </q-page>
</template>

<script>
import PostCard from 'components/partials/AppPostCard'
import MiniProfile from 'components/partials/AppMiniProfile'

export default {
  name: 'HomePage',
  components: {
    PostCard,
    MiniProfile
  },
  data: () => ({
    posts: [
      {
        id: 1,
        imageUrl: 'https://placeimg.com/500/300/nature',
        location: 'Sicily, Italy',
        created_at: 1608913238460,
        caption: 'Lorem ipsum dolorem...'
      },
      {
        id: 2,
        imageUrl: 'https://placeimg.com/500/300/cat',
        location: 'Sicily, Italy',
        created_at: 1608913821493,
        caption: 'Lorem ipsum dolorem...'
      },
      {
        id: 3,
        imageUrl: 'https://placeimg.com/500/300/dog',
        location: 'Sicily, Italy',
        created_at: 1608913859398,
        caption: 'Lorem ipsum dolorem...'
      }
    ]
  })
}
</script>
