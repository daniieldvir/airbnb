<template>
  <section class="reviews-ratings-container">
    <div class="review-header">
      <font-awesome-icon icon="star" />
      <p class="avg-rating">{{ avgRate }}</p>
      <span class="avg-rating">
        <span>&#183;</span> {{ formattedReviewsCount }}
      </span>
    </div>

    <div class="review-ratings">
      <p>Cleanliness</p>
      <el-progress
        class="progress-bar"
        :percentage="96"
        :format="formatRate"
      ></el-progress>
      <p>Communication</p>
      <el-progress
        class="progress-bar"
        :percentage="98"
        :format="formatRate"
      ></el-progress>
      <p>Check-in</p>
      <el-progress
        class="progress-bar"
        :percentage="100"
        :format="formatRate"
      ></el-progress>
      <p>Accuracy</p>
      <el-progress
        class="progress-bar"
        :percentage="90"
        :format="formatRate"
      ></el-progress>
      <p>Location</p>
      <el-progress
        class="progress-bar"
        :percentage="85"
        :format="formatRate"
      ></el-progress>
      <p>Value</p>
      <el-progress
        class="progress-bar"
        :percentage="89"
        :format="formatRate"
      ></el-progress>
    </div>
  </section>
</template>

<script>
// import { utilService } from '@/services/util.service.js'
export default {
  props: { reviews: Array },
  data() {
    return {
      //check later?
      // ratings: [
      // 	utilService.getRandomInt(85, 100),
      // ],
    };
  },
  computed: {
    //think later maybe passing stay and the property avgRate?
    avgRate() {
      if (!this.reviews.length) return 0;
      const sum = this.reviews.reduce((acc, review) => {
        return acc + review.rate;
      }, 0);
      return (sum / this.reviews.length).toFixed(1);
    },
    formattedReviewsCount() {
      // if (this.reviews.length === 1) return '1 review'
      // return this.reviews.length + ' reviews'
      if (this.reviews.length === 1) return `(${this.reviews.length} review)`;
      else if (this.reviews.length > 1)
        return `(${this.reviews.length} reviews)`;
    },
  },
  methods: {
    formatRate(percentage) {
      if (percentage > 99) return '5.0';
      return (percentage / 20).toFixed(1);
    },
    // formatRate(percentage) {
    // 	return percentage === 100 ? '5.0' : `${percentage}%`;
    // }
  },
};
</script>
