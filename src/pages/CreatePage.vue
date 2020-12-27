<template>
  <q-page>
    <create-post-panel />
  </q-page>
</template>

<script>
import CreatePostPanel from 'components/partials/AppCreatePostPanel'

export default {
  name: 'CreatePage',
  components: {
    CreatePostPanel
  }
}
</script>
