<template>
  <section class="stay-app main-container">
    <!-- <secondary-filters /> -->
    <!-- <guests-filter /> -->
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
import guestsFilter from '../cmps/guest-filter.vue';

export default {
  components: { stayList, secondaryFilters, guestsFilter },
  name: 'stay-app',
  created() {
    this.$store.commit('onExplorePage', true);
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
    destroyed() {
      console.log('destroyed explore');
      this.$store.commit('onExplorePage', false);
    },
  },
};
</script>
