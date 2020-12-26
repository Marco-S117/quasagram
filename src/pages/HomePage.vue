<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-sm-8">
        <posts-skeleton-loading v-if="isLoadingPosts" />
        <template v-else-if="posts.length">
          <post-card
            v-for="post in posts"
            :key="post.id"
            :data="post"
            class="q-mb-md"
          />
        </template>
        <div v-else class="text-center text-warning">
          <q-icon name="eva-alert-triangle-outline" size="40px" />
          <span class="block text-h5">No posts yet</span>
          <span class="block">please, upload one</span>
        </div>
      </div>
      <div class="display-lg-screen col-sm-4">
        <mini-profile />
      </div>
    </div>
  </q-page>
</template>

<script>
import PostsSkeletonLoading from 'components/loadings/AppPostsSkeletonLoading'
import PostCard from 'components/partials/AppPostCard'
import MiniProfile from 'components/partials/AppMiniProfile'

export default {
  name: 'HomePage',
  components: {
    PostsSkeletonLoading,
    PostCard,
    MiniProfile
  },
  mounted () {
    this.getPostFromDB()
  },
  data: () => ({
    isLoadingPosts: false,
    posts: []
  }),
  methods: {
    getPostFromDB () {
      this.isLoadingPosts = true
      this.$axios.get(`${process.env.API}/posts`)
        .then(res => {
          this.posts = res.data
        })
        .catch(err => {
          console.log(err)
          this.$root.$emit('TriggerAppBanner', err)
        })
        .finally(() => {
          this.isLoadingPosts = false
        })
    }
  }
}
</script>
