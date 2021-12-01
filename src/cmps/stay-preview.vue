<template>
  <section v-if="stay" class="stay-preview">
    <div class="block">
      <el-carousel trigger="click" arrow="always" height="200px" :autoplay="false">
        <el-carousel-item v-for="(img, idx) in stay.imgUrls" :key="idx">
          <router-link class="router-link" :to="'/stay/' + stay._id">
            <img class="preview_img" :src="stay.imgUrls[idx]" alt="" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>

    <router-link class="router-link" :to="'/stay/' + stay._id">
      <p>{{ stay.type }}</p>
      <p>{{ stay.name }} · {{ stay.loc.country }}</p>

      <p>
        <span>${{ stay.price }}</span> / night
      </p>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'stay-preview',
  props: ['stay'],
  data() {
    return {};
  },
  computed: {
    rate() {},
  },
};
</script>
