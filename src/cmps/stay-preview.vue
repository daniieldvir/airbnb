<template>
  <section v-if="stay" class="stay-preview">
    <div class="block">
      <el-carousel
        trigger="click"
        arrow="always"
        height="200px"
        :autoplay="false"
      >
        <el-carousel-item v-for="(img, idx) in stay.imgUrls" :key="idx">
          <router-link class="router-link" :to="'/stay/' + stay._id">
            <img class="preview_img" :src="stay.imgUrls[idx]" alt="" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>

    <router-link class="router-link" :to="'/stay/' + stay._id">
      <p>
        <font-awesome-icon icon="star" />
        <span class="review-rate"> ( {{ reviewCount }} ) </span>
      </p>

      <p></p>
      <p class="stay-type">{{ stay.type }}</p>
      <p>{{ sortTxt }} · {{ stay.loc.country }}</p>

      <p></p>
      <p>
        <span>${{ stay.price }}</span> / night
      </p>
    </router-link>
  </section>
</template>

<script>
import priceRangeFilter from './price-range-filter.vue';
import priceRange from './price-range-filter.vue';
export default {
  components: { priceRangeFilter },
  name: 'stay-preview',
  props: ['stay'],
  data() {
    return {};
  },
  computed: {
    reviewCount() {
      var stay = this.stay.reviews;

      if (stay.length) return stay.length + ' Reviews';
      if (!stay.length) return 'New';
    },
    sortTxt() {
      var txt = this.stay.name;
      if (txt.length > 15) return txt.slice(0, 15) + '...';
    },
  },
  components: {
    priceRange,
  },
};
</script>
