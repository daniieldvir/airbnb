<template>
  <section>
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
export default {
  components: { stayList },
  name: 'stay-app',
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
