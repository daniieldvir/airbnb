<template>
  <section class="stay-app main-container">
    <side-filters />
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import sideFilters from '../cmps/filters/side-filters.vue';
export default {
  components: { stayList, sideFilters },
  name: 'stay-app',
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
