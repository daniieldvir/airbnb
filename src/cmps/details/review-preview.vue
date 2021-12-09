<template>
  <section class="review-preview-container">
    <div class="review-user-info flex align-center">
      <img :src="review.by.imgUrl" />
      <div class="review-user">
        <h3>{{ review.by.fullname }}</h3>
        <h4 class="data">{{ review.createdAt }}</h4>
      </div>
    </div>
    <div>
      <long-text v-bind:summary="review.txt"></long-text>
    </div>
  </section>
</template>

<script>
import longText from './long-text.vue';
export default {
  props: {
    review: Object,
  },

  components: { longText },
};
</script>
