<template>
  <section>
    <ul class="stay-list">
      <li class="clear-list stay-list" v-for="stay in stays" :key="stay._id">
        <stay-preview :stay="stay"> </stay-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import stayPreview from './stay-preview.vue';
import secondaryFilters from './filters/secondary-filters.vue';

export default {
  name: 'stay-list',
  props: ['stays'],
  created() {
    this.$store.dispatch({ type: 'loadStays' });
  },
  components: {
    stayPreview,
    secondaryFilters,
  },
};
</script>
<style></style>
