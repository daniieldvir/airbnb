<template>
  <div class="images-display-container">
    <template v-if="!isLoading">
      <!-- UPLOAD IMG -->

      <label
        v-for="(img, idx) in imgUrls"
        :key="idx"
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="dragOver"
        @dragleave="isDragOver = false"
        :class="{ drag: isDragOver, 'not-drag': !isDragOver }"
      >
        <transition name="fade" mode="out-in">
          <img
            alt="Drop images here"
            :key="idx"
            :src="isDragOver ? imgUrl : img"
          />
        </transition>
        <!-- <transition name="fade" mode="out-in">
          <img
            alt="Drop images here"
            v-bind:key="isDragOver"
            :src="isDragOver ? require() : require('../assets/upload.png')"
          />
        </transition> -->
      </label>

      <!-- HIDDEN INPUT -->
      <input
        class="upload-input"
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />
    </template>
    <!-- LOADER -->
    <img class="loader" v-else :src="require('../assets/grid.svg')" alt="" />
  </div>
</template>

<script>
import { uploadImg } from '../services/img-upload.js';
export default {
  name: 'img-upload',
  props: { imgUrls: Array },
  data() {
    return {
      isLoading: false,
      isDragOver: false,
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev, imgUrl) {
      let file;
      if (ev.type === 'change') file = ev.target.files[0];
      else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
      this.onUploadImg(file);

      // const currImg = this.imgUrls.find(
      //   (imgUrl) => imgUrl.imgUrls === currImg.imgUrls
      // );
      // console.log('currImg', currImg);

      // const idx = imgUrls.findIndex((imgUrl) => imgUrl[idx] === imgUrl);
      // console.log('idx', idx);

      // var index = imgUrls.indexOf(imgUrl);
      // console.log('index', index);

      this.imgUrls.find((imgUrl) => {
        console.log('imgUrl', imgUrl);
        // var index = imgUrls.indexOf(imgUrl);
        // console.log(index);
      });

      console.log(file);
      console.log(this.imgUrls);

      this.file = imgUrl;
    },
    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.$emit('save', res.url);
      this.isLoading = false;
    },
  },
};
</script>
