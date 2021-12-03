<template>
  <section class="stay-app main-container">
    <app-header />
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import appHeader from '../cmps/app-header.vue';

export default {
  components: { stayList, appHeader },
  name: 'stay-app',
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
