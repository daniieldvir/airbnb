<template>
  <section class="home-page main-container">
    <div class="pic full">
      <section class="main-header">
        <h1 class="main-txt">Find a place to stay anywhere, anytime.</h1>
        <section class="top-fold">
          <stayFilter @filtered="setFilter" />
        </section>
      </section>
    </div>
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
    this.$store.dispatch({ type: 'loadStays' }).then(() => {
      this.topStays = this.$store.getters.staysToShow;

      this.topStays = this.topStays.slice(0, 4);
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
