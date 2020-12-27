<template>
  <div>
    <div class="camera-frame rounded-borders shadow-4 q-pa-sm">
      <transition name="capture" mode="out-in" absolute>
        <video
          v-show="!isImageCaptured"
          ref="video"
          autoplay
          crossorigin
        />
      </transition>
      <transition name="capture" mode="out-in" absolute>
        <canvas
          v-show="isImageCaptured"
          ref="canvas"
        />
      </transition>
      <q-btn
        v-if="hasCameraSupport"
        @click="captureDeleteCameraStramFrame"
        :icon="isImageCaptured ? 'eva-trash' : 'eva-camera'"
        size="18px"
        :class="{ 'ready': isPostReadyToSend }"
        color="primary"
        round
      />
      <q-btn
        v-else
        @click="showFilePicker"
        :icon="isImageCaptured ? 'eva-trash' : 'eva-upload-outline'"
        :size="$q.screen.xs ? '18px' : '24px'"
        :class="{ 'ready': isPostReadyToSend }"
        color="primary"
        round
      />
      <q-file
        @input="captureDeleteLocalImageFile"
        v-model="localStorageImage"
        ref="fileInput"
        accept="image/*"
        style="display: none;"
      />
      <q-btn
        v-show="isPostReadyToSend"
        @click="createPost"
        :class="{ 'ready': isPostReadyToSend }"
        color="primary"
        icon="eva-cloud-upload-outline"
        size="18px"
        round
      />
    </div>
    <div class="row justify-center q-mt-xl">
      <div class="col-12 col-sm-6">
        <q-input
          v-show="hasGeolocationSupport"
          v-model="post.location"
          @blur="onGeolocationErrors = false"
          label="Location"
          type="text"
          :disable="!isGeolocationAllowed"
          :error="onGeolocationErrors"
          :error-message="geolocationErrorMessage"
          no-error-icon
          dense
          class="col-12 q-my-sm"
        >
          <template v-slot:append>
            <q-btn
              @click="checkDeviceGelocation"
              :loading="isLoadingGeolocation"
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
import { Notify } from 'quasar'
import { uid } from 'quasar'
require('md-gum-polyfill')

export default {
  name: 'AppCreatePostPanel',
  beforeMount () {
    this.initCamera()
  },
  beforeDestroy () {
    this.disableCamera()
  },
  data: () => ({
    hasCameraSupport: true,
    isGeolocationAllowed: true,
    isImageCaptured: false,
    localStorageImage: [],
    isLoadingGeolocation: false,
    onGeolocationErrors: false,
    geolocationErrorMessage: 'Error on get location, please try again.',
    post: {
      id: uid(),
      location: '',
      caption: '',
      photo: null,
      created_at: Date.now()
    }
  }),
  computed: {
    hasGeolocationSupport () {
      return navigator.geolocation ? true : false
    },
    isPostReadyToSend () {
      return !!(this.post.photo && this.post.location && this.post.caption)
    },
    isBgSyncSupported () {
      if ('serviceWorker' in navigator  && 'SyncManager' in window) return true
      return false
    }
  },
  methods: {
    initCamera () {
      navigator.mediaDevices.getUserMedia({
        video: true
      })
      .then(stream => {
        this.$refs.video.srcObject = stream
      })
      .catch(err => {
        this.hasCameraSupport = false
      })
    },
    disableCamera () {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    showFilePicker () {
      if (!this.isImageCaptured) {
        this.$refs.fileInput.$el.click()
      } else {
        this.localStorageImage = null
        this.post.photo = null
        this.isImageCaptured = false
      }
    },
    captureDeleteCameraStramFrame () {
      this.post.photo = null
      if (!this.isImageCaptured) {
        let video = this.$refs.video
        let canvas = this.$refs.canvas
        let ctx = canvas.getContext('2d')
        canvas.width = video.getBoundingClientRect().width
        canvas.height = video.getBoundingClientRect().height
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        this.post.photo = this.dataURItoBlob(canvas.toDataURL())
        this.disableCamera()
      } else {
        this.initCamera()
      }
      this.isImageCaptured = !this.isImageCaptured
    },
    captureDeleteLocalImageFile (file) {
      console.log('file', file);
      if (!!(!this.isImageCaptured && file)) {
        let canvas = this.$refs.canvas
        let ctx = canvas.getContext('2d')
        this.post.photo = file
        let reader = new FileReader()
        reader.onload = (event) => {
          let img = new Image()
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            this.isImageCaptured = true
          }
          img.src = event.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      let byteString = atob(dataURI.split(',')[1]);
      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      // write the bytes of the string to an ArrayBuffer
      let ab = new ArrayBuffer(byteString.length);
      // create a view into the buffer
      let ia = new Uint8Array(ab);
      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      // write the ArrayBuffer to a blob, and you're done
      let blob = new Blob([ab], {type: mimeString});
      return blob;
    },
    checkDeviceGelocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onAccessAllowed, this.onAccessDenied)
      } else {
        console.log('Geolocation not supported')
      }
    },
    onAccessAllowed (position) {
      this.isLoadingGeolocation = true
      const API_URL = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      this.$axios.get(API_URL)
        .then(res => {
          this.post.location = res.data.city + ',' + res.data.region
        })
        .catch(err => {
          this.onGeolocationErrors = true
        })
        .finally(() => {
          this.isLoadingGeolocation = false
        })
    },
    onAccessDenied (err) {
      this.isGeolocationAllowed = false
      this.onGeolocationErrors = true
      this.geolocationErrorMessage = 'Geolocation not allowed'
    },
    createPost () {
      let formData = new FormData()
      let notifyMessage = ''

      formData.append('id', this.post.id)
      formData.append('location', this.post.location)
      formData.append('created_at', this.post.created_at)
      formData.append('caption', this.post.caption)
      formData.append('file', this.post.photo, this.post.id + '.png')

      this.$axios.post(`${process.env.API}/create-post`, formData)
        .then(res => {
          notifyMessage = 'Post created successfully'
          setTimeout(() => {
            this.$router.push({ name: 'Home' })
          }, 1000)
        })
        .catch(err => {
          if (!navigator.onLine && this.isBgSyncSupported) {
            notifyMessage = 'Post created offline!'
          } else {
            notifyMessage = 'Could not create post now!'
          }
        })
        .finally(() => {
          this.$q.notify({
            message: notifyMessage,
            timeout: 2000
          })
        })
    }
  },

}
</script>

<style lang="scss">
.camera-frame {
  position: relative;
  border: 1px solid $grey-4;
  min-height: 335px;
  min-width: 440px;
  height: 335px;
  width: 440px;
  margin: 0 auto;
  @media (max-width: $breakpoint-xs-max) {
    min-height: 245px;
    min-width: 320px;
    height: 245px;
    width: 320px;
  }

  video, canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    padding: 4px;
  }

  button {
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s ease-in-out;
    &:first-of-type.ready {
      left: 25%;
      transform: translateX(-25%);
    }
    &:last-of-type.ready {
      left: 75%;
      transform: translateX( -75%);
    }
  }
}

.capture-enter-active, .capture-leave-active {
  transition: opacity .5s;
}
.capture-enter, .capture-leave-to {
  opacity: 0;
}
</style>
