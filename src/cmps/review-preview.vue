<template>
  <section class="review-preview-container">
    <div class="review-user-info">
      <img :src="review.by.imgUrl" />
      <div>
        <p class="review-user-name">{{ review.by.fullname }}</p>
        <p>{{ review.createdAt }}</p>
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
}
</script>