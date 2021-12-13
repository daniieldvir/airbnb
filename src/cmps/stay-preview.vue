<template>
  <section v-if="stay" class="stay-preview">
    <div class="block-content">
      <span
        class="liked-stay-content"
        v-if="!likedStay"
        @click.stop="toggleLikedStay(stay._id)"
      >
        <font-awesome-icon :icon="['fas', 'heart']"
      /></span>
      <span
        class="liked-full-heart"
        v-else
        @click.stop="toggleLikedStay(stay._id)"
        ><font-awesome-icon :icon="['fas', 'heart']"
      /></span>
      <!-- <el-alert title="Added to wishlist" type="success"></el-alert> -->
      <el-carousel
        trigger="click"
        arrow="always"
        :autoplay="false"
        height="250px"
      >
        <el-carousel-item v-for="(img, idx) in stay.imgUrls" :key="idx">
          <router-link class="router-link" :to="'/stay/' + stay._id">
            <img class="preview_img" :src="stay.imgUrls[idx]" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <router-link class="router-link" :to="'/stay/' + stay._id">
      <p>
        <font-awesome-icon icon="star" />
        <span class="avg-rate">{{ avgRate }} </span>
        <span class="review-rate"> {{ reviewCount }} </span>
      </p>
      <p class="stay-type">{{ stay.type }} · {{ stay.loc.city }}</p>
      <p class="stay-name">{{ sortTxt }}</p>
      <p class="stay-price">
        <span>${{ stay.price }}</span> / night
      </p>
    </router-link>
  </section>
</template>
<script>
import priceRangeFilter from './price-range-filter.vue';
import priceRange from './price-range-filter.vue';
import { showMsg} from '../services/event-bus.service.js';
// import { faHeart } from '@fortawesome/free-regular-svg-icons'
export default {
  components: { priceRangeFilter },
  name: 'stay-preview',
  props: ['stay'],
  data() {
    return {
      // likedStay: false,
    
    };
  },
  computed: {
    reviewCount() {
      const reviews = this.stay.reviews;
      if (!reviews.length) return 'New';
      if (reviews.length === 1) return `(${reviews.length} review)`;
      else if (reviews.length > 1) return `(${reviews.length} reviews)`;
    },
    sortTxt() {
      const txt = this.stay.name;
      const txtWithCapitalFirstLetter =
        txt.charAt(0).toUpperCase() + txt.slice(1);
      // if (txt.length > 25 < 50) return txt.slice(0, 22) + '...';
      return txtWithCapitalFirstLetter;
    },
    avgRate() {
      if (!this.stay.reviews.length) return 0;
      const sum = this.stay.reviews.reduce((acc, review) => {
        return acc + review.rate;
      }, 0);
      return (sum / this.stay.reviews.length).toFixed(1);
    },
    userId(){
      const user = this.$store.getters.loggedInUser;
      if(user) return this.$store.getters.loggedInUser._id;
    },
    likedStay(){
      if(!this.userId) return false;
      const idxLikedBy = this.stay.likedByUsers.findIndex((id) =>
          id === this.userId)
      if(idxLikedBy < 0) return false;
      else return true;
    }
  },
  methods: {
    toggleLikedStay(stayId) {
      // this.likedStay = !this.likedStay;
      if(!this.userId) return;
        // showMsg('You must login first')
      this.$store.dispatch({ type: 'toggleLikedStay', stayId })
      if (this.likedStay) {
        showMsg('Added to wishlist')
      } else {
        showMsg('Removed from wishlist')
      }
    },
  },
  components: {
    priceRange,
  },
};
</script>
