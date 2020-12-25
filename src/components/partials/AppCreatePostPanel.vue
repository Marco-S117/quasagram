<template>
  <div>
    <div class="camera-frame">
      <img
        src="https://placeimg.com/500/500/nature"
        class="fit rounded-borders shadow-4 q-pa-sm"
      >
    </div>
    <div class="camera-input-row row justify-center text-center q-my-md">
      <div class="col-12 col-sm-6">
        <q-btn
          @click="captureCameraFrame"
          :class="{ 'ready': isPostReadyToSend }"
          color="primary"
          icon="eva-camera"
          size="24px"
          round
        />
        <q-btn
          v-show="isPostReadyToSend"
          @click="createPost"
          :class="{ 'ready': isPostReadyToSend }"
          color="primary"
          icon="eva-cloud-upload-outline"
          size="24px"
          round
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-sm-6">
        <q-input
          v-model="post.location"
          label="Location"
          type="text"
          dense
          class="col-12 q-my-sm"
        >
          <template v-slot:append>
            <q-btn
              @click="getUserLocation"
              color="primary"
              icon="eva-navigation-2-outline"
              flat
              round
            />
          </template>
        </q-input>
        <q-input
          v-model="post.caption"
          label="Caption"
          type="text"
          dense
          class="col-12 q-my-sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from 'quasar'

export default {
  name: 'AppCreatePostPanel',
  data: () => ({
    post: {
      id: uid(),
      location: '',
      caption: '',
      photo: null,
      created_at: Date.now()
    }
  }),
  computed: {
    isPostReadyToSend () {
      return !!(this.location && this.caption)
    }
  },
  methods: {
    captureCameraFrame () {
    },
    createPost () {
    },
    getUserLocation () {
    }
  }

}
</script>

<style lang="scss">
.camera-frame {
  border: 1px solid $grey-4;
  min-height: 500px;
  min-width: 500px;
  height: 500px;
  width: 500px;
  margin: 0 auto;
  @media (max-width: $breakpoint-xs-max) {
    min-height: 330px;
    min-width: 330px;
    height: 330px;
    width: 330px;
  }
}
.camera-input-row {
  position: relative;
  button {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s ease-in-out;
    &:first-child.ready {
      left: 35%;
      transform: translateX(-35%);
      @media (max-width: $breakpoint-xs-max) {
        left: 20%;
        transform: translateX(-20%);
      }
    }
    &:last-child.ready {
      left: 65%;
      transform: translateX( -65%);
      @media (max-width: $breakpoint-xs-max) {
        left: 80%;
        transform: translateX( -80%);
      }
    }
  }
}
</style>
