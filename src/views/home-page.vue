<template>
  <section class="home-page">
    <h1 class="main-header">Find a place to stay anywhere, anytime.</h1>
    <stayFilter @filtered="setFilter" />
    <section class="topRated">ffff{{ topStays }}</section>
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
    // this.$store.dispatch({ type: 'loadStays' }).then(this.loadTopRated());
    this.$store.dispatch({ type: 'loadStays' }).then((stays) => {
      this.topStays = this.$store.getters.staysToShow;
    });
  },
  methods: {
    // loadTopRated() {
    //   console.log('loadTopRated');
    //   this.topStays = this.$store.getters.staysToShow;
    // },
    setFilter(filterBy) {
      console.log('setting filter from homepage', filterBy);
      this.$store.dispatch({ type: 'setFilter', filterBy });
      // .then(this.loadTopRated());
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
