<template>
  <section class="review-preview-container">
    <div class="review-user-info flex align-center">
      <img :src="review.by.imgUrl" />
      <div>
        <h4 class="review-user-name">{{ review.by.fullname }}</h4>
        <h4 class="review-user-data">{{ review.createdAt }}</h4>
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
