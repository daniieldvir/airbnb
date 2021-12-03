<template>
  <section class="stay-app main-container">
    <app-header />
    <secondary-filters />
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import appHeader from '../cmps/app-header.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';

export default {
  components: { stayList, appHeader, secondaryFilters },
  name: 'stay-app',
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
