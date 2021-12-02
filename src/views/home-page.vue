<template>
  <section class="home-page main-container">
    <section class="top-fold">
      <h1 class="main-header">Find a place to stay anywhere, anytime.</h1>
      <stayFilter @filtered="setFilter" />
    </section>
    <section class="top-rated">
      <stay-list :stays="topStays" />
    </section>
  </section>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue';
import stayList from '../cmps/stay-list.vue';

export default {
  name: 'home-page',
  data() {
    return {
      topStays: null,
    };
  },
  created() {
    // this.$store.dispatch({ type: 'loadStays' }).then(this.loadTopRated());
    this.$store.dispatch({ type: 'loadStays' }).then(() => {
      this.topStays = this.$store.getters.staysToShow;
    });
  },
  methods: {
    // loadTopRated() {
    //   this.topStays = this.$store.getters.staysToShow;
    // },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy });
      this.$store.dispatch({ type: 'loadStays' });
      this.$router.push('/explore');

      // .then((this.topStays = this.$store.getters.staysToShow));
    },
  },
  // computed: {
  //   topStays() {
  //     return this.$store.getters.stays;
  //   },
  // },
  components: {
    stayFilter,
    stayList,
  },
};
</script>
