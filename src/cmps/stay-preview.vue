<template>
  <section v-if="stay" class="stay-preview">
 
    <div class="block">
      <span class="liked-stay-content" v-if="!likedStay" @click.stop="toggleLikedStay(stay._id)">
        <font-awesome-icon :icon="['far', 'heart']" /></span>
      <span class="liked-stay-content" v-else @click.stop="toggleLikedStay(stay._id)"><font-awesome-icon :icon="['fas', 'heart']" /></span>
      <!-- <el-alert title="Added to wishlist" type="success"></el-alert> -->
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
        <span class="avgRate">{{ stay.avgRate }} </span>
        <span class="review-rate"> ( {{ reviewCount }} ) </span>
      </p>

      <p class="stay-type">{{ stay.type }} · {{ stay.loc.city }}</p>
      <p class="stay-name">{{ sortTxt }}</p>

      <p>
        <span>${{ stay.price }}</span> / night
      </p>
    </router-link>
  </section>
</template>

<script>
import priceRangeFilter from './price-range-filter.vue';
import priceRange from './price-range-filter.vue';
// import { faHeart } from '@fortawesome/free-regular-svg-icons'
export default {
  components: { priceRangeFilter },
  name: 'stay-preview',
  props: ['stay'],
  data() {
    return {
      likedStay: false
    };
  },
  computed: {
    reviewCount() {
      const reviews = this.stay.reviews;
      if (!reviews.length) return 'new';
      if (reviews.length === 1) return `${reviews.length} review`;
      else if (reviews.length > 1) return `${reviews.length} reviews`;
    },
    // if (stay.length) return stay.length + ' reviews';
    // if (!stay.length) return 'New';

    sortTxt() {
      const txt = this.stay.name;
      const txtWithCapitalFirstLetter =
        txt.charAt(0).toUpperCase() + txt.slice(1);
      // if (txt.length > 25 < 50) return txt.slice(0, 22) + '...';
      return txtWithCapitalFirstLetter;
    },
  },
  methods:{
    toggleLikedStay(){
      this.likedStay = !this.likedStay;
      // if (this.likedStay) {
      //   showMsg('Added to wishlist')
      // } else {
      //   showMsg('Removed from wishlist')
      // }
    }
  },
  components: {
    priceRange,
  },
};
</script>
