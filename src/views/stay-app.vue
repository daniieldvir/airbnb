<template>
  <section class="stay-app main-container">
    <!-- <secondary-filters /> -->
    <!-- <guests-filter /> -->
    <div class="sub-header">
      <p>
        {{ numOfResults }} stays {{ city }}
        <br />
        Review COVID-19 travel restrictions before you book.
      </p>
    </div>
    <hr />
    <!-- <div class="loader" v-if="isLoading"><img src="../assets/grid.svg"></div> -->
    <!-- <img v-if="isLoading" src="grid.svg" alt=""> -->
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
import guestsFilter from '../cmps/guest-filter.vue';

export default {
  components: { stayList, secondaryFilters, guestsFilter },
  name: 'stay-app',
  data() {
    return {
      // isLoading:true
      // stays: null,
      // city: null,
    };
  },
  created() {
        // this.isLoading = false
    // this.stays = this.$store.getters.staysToShow;
    // this.city = this.$store.getters.filterBy.city;
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
    numOfResults() {
      return this.$store.getters.staysToShow.length;
    },
    city() {
      const filter = this.$store.getters.filterBy;
      return filter.city ? 'in ' + filter.city : 'to explore';
    },
  
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
