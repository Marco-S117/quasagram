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
    </div>
    <div class="camera-input-row row justify-center text-center q-my-md">
      <div class="col-12 col-sm-6">
        <q-btn
          v-if="hasCameraSupport"
          @click="captureDeleteCameraStramFrame"
          :icon="isImageCaptured ? 'eva-trash' : 'eva-camera'"
          :size="$q.screen.xs ? '18px' : '24px'"
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
          :size="$q.screen.xs ? '18px' : '24px'"
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
require('md-gum-polyfill')

export default {
  name: 'AppCreatePostPanel',
  beforeMount () {
    this.initCamera()
  },
  data: () => ({
    hasCameraSupport: true,
    isImageCaptured: false,
    localStorageImage: [],
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
      console.log(!!(this.post.photo && this.post.location && this.post.caption));
      return !!(this.post.photo && this.post.location && this.post.caption)
    }
  },
  methods: {
    initCamera () {
      console.log('Init camera')
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
    createPost () {
    },
    getUserLocation () {
    },
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

.capture-enter-active, .capture-leave-active {
  transition: opacity .5s;
}
.capture-enter, .capture-leave-to {
  opacity: 0;
}
</style>