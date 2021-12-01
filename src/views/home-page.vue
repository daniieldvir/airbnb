<template>
  <section class="home-page">
    <h1 class="main-header">Find a place to stay anywhere, anytime.</h1>
    <stayFilter @filtered="setFilter" />
    <section class="topRated">{{ topStays }}</section>
  </section>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue';

export default {
  name: 'home-page',
  data() {
    return {
      topStays: null,
    };
  },
  created() {
    this.$store
      .dispatch({ type: 'loadStays' })
      .then((this.topStays = this.$store.getters.staysToShow));
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: 'setFilter', filterBy });
    },
  },
  computed: {
    // topStays() {
    //   return this.$store.getters.stays;
    // },
  },
  components: {
    stayFilter,
  },
};
</script>
