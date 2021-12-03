<template>
  <section class="stay-app main-container">
    <secondary-filters />
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';

export default {
  components: { stayList, secondaryFilters },
  name: 'stay-app',
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
