<template>
  <section class="review-list">
    <section class="reviews">
      <review-preview
        v-for="review in reviews"
        :key="review.id"
        :review="review"
      />
    </section>
  </section>
</template>

<script>
import reviewPreview from '../details/review-preview.vue';
export default {
  name: 'review-list',
  props: { reviews: Array },
  data() {
    return {};
  },
  methods: {},
  components: { reviewPreview },
};
</script>
