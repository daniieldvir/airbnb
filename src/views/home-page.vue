<template>
  <section class="home-page">
    <h1 class="main-header">Find a place to stay anywhere, anytime.</h1>
    <stayFilter @filtered="setFilter" />
    {{ topStays }}
  </section>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue';
// TODO REMOVE SERV
import stayService from '../services/stay.service.js';
import userService from '../services/user.service.js';

export default {
  name: 'home-page',
  data() {
    return {
      stays: null,
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' });
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: 'loadStays', filterBy });
    },
  },
  computed: {
    topStays() {
      return this.$store.getters.stays;
    },
  },
  components: {
    stayFilter,
  },
};
</script>
