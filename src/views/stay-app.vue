<template>
  <section class="stay-app main-container">
    <app-header />
    <secondary-filters />
    <!-- <guests-filter /> -->
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import appHeader from '../cmps/app-header.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
import guestsFilter from '../cmps/guest-filter.vue';

export default {
  components: { stayList, appHeader, secondaryFilters, guestsFilter },
  name: 'stay-app',
  computed: {
    stays() {
      console.log('from saty app', this.$store.getters.staysToShow);
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
