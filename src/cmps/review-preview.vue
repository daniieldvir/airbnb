<template>
  <section class="review-preview-container">
    <div class="review-user-info flex align-center">
      <img :src="review.by.imgUrl" />
      <div class="review-user">
        <h4 class="data">{{ review.createdAt }}</h4>
      </div>
    </div>
    <p class="txt">{{ review.txt }}</p>
  </section>
</template>

<script>
export default {
  props: {
    review: Object,
  },
};
</script>
